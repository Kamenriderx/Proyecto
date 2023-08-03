const pdfkit = require('pdfkit');
const fs = require('fs');

async function generatePDF() {
    const doc = new PDFDocument();
  
    // Establecer el tipo de contenido en la respuesta (PDF)
    res.setHeader('Content-Type', 'application/pdf');
    
    // Establecer el nombre del archivo de descarga
    res.setHeader('Content-Disposition', 'attachment; filename=mi_documento.pdf');
    
    // Crear el flujo de datos para el PDF
    doc.pipe(res);
    
    // Datos para la tabla
    const data = [
      ["Celda 1", "Celda 2", "Celda 3"],
      ["Celda 4", "Celda 5", "Celda 6"],
      ["Celda 7", "Celda 8", "Celda 9"]
    ];
  
    // Crear la tabla y establecer el estilo
    doc.table(data, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
      prepareRow: (row, i) => doc.font('Helvetica').fontSize(10)
    });
    
    // Finalizar el PDF
    doc.end();
}

module.exports = generatePDF;


