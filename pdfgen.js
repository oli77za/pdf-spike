const { PDFDocument, PageSizes, StandardFonts } = require("pdf-lib");

const embedFonts = async ({pdfDoc}) => {
  const fonts = {
    courier:  await pdfDoc.embedFont(StandardFonts.Courier),
    timesRoman: await pdfDoc.embedFont(StandardFonts.TimesRoman),
  }
  return {pdfDoc, fonts};
}

const writeHeader = (params) => {
  params.page.moveTo(110, 310);
  params.page.drawText('Header');
  return params;
};

const writeAddress = (params) => {
  params.page.moveTo(50, 800);
  params.page.drawText(params.data.address, {
    size: 12,
    font: params.fonts.courier,
  });
  return params;
};

const writeFooter = (params) => {
  params.page.moveTo(110, 100);
  params.page.drawText('Footer');
  return params;
};

const writeTable = (params) => {
  params.page.moveTo(110, 200);
  params.page.drawText('Hello Natalia!', {font: params.fonts.timesRoman});
  return params;
};


const createPdf = (data) => {
    return PDFDocument.create()
        .then(pdfDoc => embedFonts({pdfDoc}))
        .then(({pdfDoc, fonts}) => {
          const page = pdfDoc.addPage(PageSizes.A4);
          return {pdfDoc, page, data, fonts};  
        })
        .then(writeHeader)
        .then(writeAddress)
        .then(writeFooter)
        .then(writeTable)
        .then(({pdfDoc}) => pdfDoc)
};

module.exports = createPdf;