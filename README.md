# Online Student Admission Form

A static, dependency-free web app that replaces a paper admission form. Built with plain **HTML, CSS, and JavaScript** — no framework, no backend, no build step.

> Manual admission forms mean paperwork and data-entry errors. This intake form collects applicant information directly, validates it as the applicant types, and keeps every submission in one organized ledger.

---

## Files

| File | What it holds |
|---|---|
| `admission-form.html` | Page structure — sidebar, form, ticket, ledger |
| `styles.css` | All visual styling, layout, and animation |
| `script.js` | Validation, submission handling, ledger rendering |

All three must stay in the same folder — the HTML links to the other two by relative path.

## Running it

No install, no server. Open `admission-form.html` in any modern browser.

---

## What it does

### 1. Applicant intake form
A single structured form replaces the paper one, grouped into four sections:

- **Applicant details** — full name, date of birth, gender, course applying for
- **Academic background** — previous school/college, percentage or grade
- **Contact details** — email, phone, address
- **Guardian details** — guardian name, guardian phone

### 2. Inline validation
Every field is checked before submission — this is the direct fix for "may introduce data-entry errors":

| Field | Rule |
|---|---|
| Name / school / guardian name | At least 2 characters |
| Date of birth, gender, course | Required, non-empty |
| Percentage | Number between 0 and 100 |
| Email | Valid email pattern |
| Phone / guardian phone | Exactly 10 digits |
| Address | At least 5 characters |

Invalid fields get a red outline and an inline error message the moment you submit, and clear as soon as they're fixed — no silent failures, no bad data reaching storage.

### 3. Admission ticket
On a valid submit, the form is replaced by a stamped confirmation ticket:

- A unique reference ID (`ADM-<year>-<5 digits>`)
- Applicant name, course, and submission date
- A "Received" stamp with a short pop-in animation
- **Print ticket** — opens the browser print dialog (styled to print just the ticket)
- **Submit another application** — resets the form for the next applicant

### 4. Applications ledger
A second view, toggled from the sidebar, lists every submission collected so far — reference ID, name, course, date — pulled from the browser's `localStorage`. This is the "organized manner" part: instead of loose paper forms, every entry lands in one browsable table. Empty state reads *"No applications yet — submitted forms will appear here."*

---

## Design notes

- **Palette** — navy ink sidebar, pale stone-blue page background, brick-red stamp accent, brass/gold rule lines. Deliberately avoids the generic "cream + terracotta AI look."
- **Type** — Fraunces (display serif) for headings, IBM Plex Sans for body text, IBM Plex Mono for reference IDs and labels — a registrar's-ledger feel.
- **Numbered steps** in the sidebar reflect the actual four-step flow (fill in → validate → submit → receive ticket), not decoration.
- **Data storage** — everything lives in `localStorage` in the visitor's own browser. There's no server, so this is a front-end demo of the workflow, not a production admissions backend — swap the `localStorage` calls in `script.js` for real API calls when you're ready to persist data centrally.

---

## Extending it

- Wire `script.js`'s save/read logic to a backend (e.g. `fetch()` to a REST API) instead of `localStorage`.
- Add file upload for photos/documents (needs a backend to actually store files).
- Add an admin-only view or export-to-CSV button on the ledger.
