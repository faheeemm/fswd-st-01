  const STORAGE_KEY = 'admissions_ledger';
  const form = document.getElementById('admissionForm');
  const ticket = document.getElementById('ticket');

  const validators = {
    fullName: v => v.trim().length >= 2,
    dob: v => !!v,
    gender: v => !!v,
    course: v => !!v,
    prevSchool: v => v.trim().length >= 2,
    percentage: v => v !== '' && Number(v) >= 0 && Number(v) <= 100,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: v => /^\d{10}$/.test(v.replace(/\D/g,'')),
    address: v => v.trim().length >= 5,
    guardianName: v => v.trim().length >= 2,
    guardianPhone: v => /^\d{10}$/.test(v.replace(/\D/g,''))
  };

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;
    const data = {};

    Object.keys(validators).forEach(name => {
      const el = form.elements[name];
      const fieldWrap = form.querySelector('[data-field="' + name + '"]');
      const ok = validators[name](el.value);
      fieldWrap.classList.toggle('invalid', !ok);
      if(!ok) valid = false;
      data[name] = el.value;
    });

    if(!valid){
      form.querySelector('.invalid input, .invalid select, .invalid textarea')?.focus();
      return;
    }

    const id = 'ADM-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random()*89999);
    const submittedDate = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
    const record = { id, submittedDate, ...data };

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    document.getElementById('ticketName').textContent = data.fullName;
    document.getElementById('ticketId').textContent = id;
    document.getElementById('ticketCourse').textContent = data.course;
    document.getElementById('ticketDate').textContent = submittedDate;

    ticket.style.display = '';
    ticket.querySelector('.stamp').style.animation = 'none';
    void ticket.offsetWidth;
    ticket.querySelector('.stamp').style.animation = '';

    form.style.display = 'none';
  });

  function resetForm(){
    form.reset();
    form.style.display = '';
    ticket.style.display = 'none';
    document.querySelectorAll('.field.invalid').forEach(f => f.classList.remove('invalid'));
  }

  function showView(view){
    const formView = document.getElementById('formView');
    const ledgerView = document.getElementById('ledgerView');
    document.getElementById('navForm').classList.toggle('on', view === 'form');
    document.getElementById('navLedger').classList.toggle('on', view === 'ledger');
    formView.style.display = view === 'form' ? '' : 'none';
    ledgerView.style.display = view === 'ledger' ? '' : 'none';
    if(view === 'ledger') renderLedger();
  }

  function renderLedger(){
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const wrap = document.getElementById('ledgerTableWrap');
    if(records.length === 0){
      wrap.innerHTML = '<p class="empty">No applications yet — submitted forms will appear here.</p>';
      return;
    }
    let rows = records.map(r =>
      '<tr><td class="id">' + r.id + '</td><td>' + r.fullName + '</td><td>' + r.course + '</td><td>' + r.submittedDate + '</td></tr>'
    ).join('');
    wrap.innerHTML = '<table><thead><tr><th>Reference ID</th><th>Name</th><th>Course</th><th>Submitted</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }
