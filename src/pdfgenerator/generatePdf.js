/**
@CreatedBy   : Siva Sugan
@CreatedTime : 20/06/2023
@Description : This fie handles pdf generation functions
**/

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const templatePath = path.join(__dirname, 'invoicePdf.ejs');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

module.exports = class generatePdf{
    

    generatePdfasHtml(pdfData){
        try{
            const renderedHtml =  ejs.render(templateContent, pdfData);
            return renderedHtml
        }catch(error){
            console.log(error.message) 
        }
    }

}