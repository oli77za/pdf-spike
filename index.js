const createPdf = require("./pdfgen");
const fs = require('fs');

const data = {
    address: `
    12 Long street
    My City
    AB1 CD4
    `
}

createPdf(data)
    .then((pdfDoc) => pdfDoc.save())
    .then((byteArray) => new Promise((resolve) => fs.writeFile('./output.pdf', byteArray, resolve)))
    .then(() => console.log('Bye bye!!'));