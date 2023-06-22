/**
@CreatedBy   : Siva Sugan
@CreatedTime : 20/06/2023
@Description : This fie handles pdf storing related functions
**/

const htmlpdf = require("html-pdf");

const pdfOptions = {
    "height": "11.25in",
    "width": "8.5in",
    "header": {
        "height": "20mm"
    },
    "footer": {
        "height": "20mm",
    },
};

module.exports = class storePdfInServer{

    StorePdfInServer(pdfData, pdfHtmlRenderedData, serevrPath){
        try{
        htmlpdf.create(pdfHtmlRenderedData, pdfOptions).toFile(`${serevrPath}/${pdfData.InvoiceNumber}.pdf`, function (err, pdfData) {
            if (err) {
                console.log(err);
            } else {
                console.log("PDF created successfully");
            }
        });
     }catch(error){
        console.log(error)
     }
    }

}