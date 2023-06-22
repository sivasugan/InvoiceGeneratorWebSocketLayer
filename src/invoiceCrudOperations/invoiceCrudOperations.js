/**
@CreatedBy   : Siva Sugan
@CreatedTime : 20/06/2023
@Description : This fie handles all CRUD operations for invoice module
**/

const axios = require("axios")

module.exports = class invoiceCrudOperations{

    async createInvoice(invoiceData){
        try {
            invoiceData.CustomerId = parseInt(invoiceData.CustomerId)
            invoiceData.TotalAmount = parseFloat(invoiceData.TotalAmount)
            invoiceData.InvoiceDate = new Date(invoiceData.InvoiceDate)
            invoiceData.DueDate = new Date(invoiceData.DueDate)
            invoiceData.CreatedDate = new Date()
            
            const response = await axios.post('http://localhost:3100/api/rest/invoicegenerator/createinvoice', invoiceData);
            response && console.log("Invoice Created Successfully In DB")
          } catch (error) {
            console.error('Error creating record:', error);
          }      
    }

}