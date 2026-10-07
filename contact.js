function createAppointmentMailto(fields) {
  const dateParts = fields.date ? fields.date.split('-') : [];
  const preferredDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : 'Δεν έχει οριστεί';
  const body = [
    'Καλησπέρα σας,',
    '',
    'Θα ήθελα να επικοινωνήσουμε για ένα ραντεβού.',
    '',
    `Ονοματεπώνυμο: ${fields.name.trim()}`,
    `Email επικοινωνίας: ${fields.email.trim()}`,
    `Τηλέφωνο: ${fields.phone.trim() || 'Δεν έχει δοθεί'}`,
    `Προτιμώμενη ημερομηνία: ${preferredDate}`,
    `Προτιμώμενη ώρα (ώρα Ελλάδας): ${fields.time || 'Δεν έχει οριστεί'}`,
    ...(fields.note.trim() ? ['', `Σημείωση διαθεσιμότητας: ${fields.note.trim()}`] : []),
    '',
    'Η ημέρα και η ώρα είναι προτιμήσεις. Αναμένω επικοινωνία για την επιβεβαίωση του ραντεβού.',
    '',
    'Ευχαριστώ.'
  ].join('\r\n');
  const subject = `Αίτημα για ραντεβού — ${fields.name.trim()}`;
  return `mailto:sflamouridis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
  const nameInput = document.getElementById('request-name');
  nameInput.addEventListener('input', () => {
    nameInput.setCustomValidity(nameInput.value.trim() ? '' : 'Συμπληρώστε το ονοματεπώνυμό σας.');
  });
  const dateInput = document.getElementById('request-date');
  dateInput.min = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Athens', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());

  appointmentForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(appointmentForm);
    const fields = Object.fromEntries(formData.entries());
    document.getElementById('request-status').textContent = 'Ολοκληρώστε την αποστολή στην εφαρμογή email σας. Αν δεν άνοιξε, επικοινωνήστε απευθείας στο sflamouridis@gmail.com.';
    window.location.href = createAppointmentMailto(fields);
  });
}
