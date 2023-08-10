const { PDFDocument, rgb } = require('pdf-lib');


async function generatePDF(req,res) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
  
    const table = page.table({
      widths: [200, 200, 200],
      borderWidth: 1,
    });
  
    const headerRow = table.addRow();
    headerRow.addCell('Encabezado 1', {
      backgroundColor: rgb(0.5, 0.5, 0.5),
      color: rgb(1, 1, 1),
    });
    headerRow.addCell('Encabezado 2', {
      backgroundColor: rgb(0.5, 0.5, 0.5),
      color: rgb(1, 1, 1),
    });
    headerRow.addCell('Encabezado 3', {
      backgroundColor: rgb(0.5, 0.5, 0.5),
      color: rgb(1, 1, 1),
    });
  
    const data = [
      ["Celda 1", "Celda 2", "Celda 3"],
      ["Celda 4", "Celda 5", "Celda 6"],
      ["Celda 7", "Celda 8", "Celda 9"]
    ];
  
    for (const row of data) {
      const tableRow = table.addRow();
      for (const cell of row) {
        tableRow.addCell(cell, { padding: 5 });
      }
    }
  
    const pdfBytes = await pdfDoc.save();
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=mi_documento.pdf');
    res.send(pdfBytes);
}

module.exports = {generatePDF};