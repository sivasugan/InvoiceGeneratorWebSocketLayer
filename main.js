/**
@CreatedBy   : Siva Sugan
@CreatedTime : 20/06/2023
@Description : This fie is the entry poin of the socket layer application
**/

/****** Importing required modules here ******/
const express = require('express')
const http = require('http');
const generatePdf = require('./src/pdfgenerator/generatePdf')
const storePdfInServer = require('./src/pdfgenerator/storePdfInServer')
const cors = require('cors');
const invoiceCrudOperations = require('./src/invoiceCrudOperations/invoiceCrudOperations');

/****** Initializing required objects here ******/
const InvoiceCrudOperations = new invoiceCrudOperations()
const GeneratePdf = new generatePdf()
const StorePdfInServer = new storePdfInServer()

/****** Adding Configurations to express object ******/
const InvoicePdfGenerator = express()
InvoicePdfGenerator.use(cors());
const server = http.createServer(InvoicePdfGenerator); 
const io = require('socket.io')(server, {
  cors: {
    origin: '*',  
    methods: ['GET', 'POST'], 
  },
});


/***** Initializing the connection ********/
io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle the event when a client requests the PDF
  socket.on('requestPDF', (data) => {
    // Generate the PDF for the given invoiceId
    const pdfAsHtml = GeneratePdf.generatePdfasHtml(data)
    data.IsNewFile && StorePdfInServer.StorePdfInServer(data, pdfAsHtml, `${__dirname}/generatedPdfs/`)
    data.IsNewFile && InvoiceCrudOperations.createInvoice(data)
    socket.emit('pdfGenerated', pdfAsHtml);
  });

  // Handle disconnection event
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

//listeining to port 3101
server.listen(3101)
console.log("Invoice Generator Rest Layer Successfully Running on port : 3101")
