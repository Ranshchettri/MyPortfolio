document.addEventListener('DOMContentLoaded', () => {
  const printBtn = document.querySelector('.btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
