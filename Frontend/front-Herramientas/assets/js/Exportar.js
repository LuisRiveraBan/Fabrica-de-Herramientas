function exportarDatosExcel() {
    window.open('http://localhost:8890/export/Usuario', '_blank');
  }

  function exportarDatosExcelTotal() {
    window.open('http://localhost:8890/export', '_blank');
  }
  
  function exportarDatosPdfUsuario() {
    window.open('http://localhost:8890/export/PDF/Usuario', '_blank');
  }

  function exportarDatosPdfTotal() {
    window.open('http://localhost:8890/export/PDF', '_blank');
  }
  // Manejar la descarga al hacer clic en el botón
  document.querySelector().addEventListener('click', function() {
    exportarDatosExcel();
    exportarDatosExcelTotal();
    exportarDatosPdfUsuario();
  });
  
  