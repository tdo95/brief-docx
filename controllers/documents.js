const Document = require("../models/Document");
const path = require('path');
const fs = require('fs')
const alloTemplate = fs.readFileSync(path.join(__dirname, '../templates/allo-test.docx'), 'binary')
const PizZip = require('pizzip')
const Docxtemplater = require("docxtemplater");
const LinkModule = require('docxtemplater-link-module');
const docxConverter = require('docx-pdf');
// const libre = require('libreoffice-convert');
// const libreConvert = require('util').promisify(libre.convert);


module.exports = {
  getDocuments: async (req, res) => {
    try {
      const documents = await Document.find({ creator: req.user.id });
      
    } catch (err) {
      console.log(err);
    }
  },
  createDocument: async (req, res) => {
    const { template } = req.body
    const now = new Date()
    try {
      await Document.create({ 
        title: template, 
        template: template, 
        lastEdited: now, 
        sections: {}, 
      });
      console.log(`${template} document created`)
      res.send({success: `${template} document created`})
    } catch (err) {
      console.log(err);
      res.send({error: `Error creating document: ${err}`})
    }
  },
  getTemplate: async (req, res) => {
    const templateName = req.params.name.toLowerCase()
    if (templateName === 'allogene') {
      const filePath = path.join(__dirname, '../templates/allo-test.docx')
      res.sendFile(filePath, {}, (error) => {
        if (error) next(error)
        else console.log('Sent:', filePath)
      })
    }
    else res.send({error: `${templateName} template doesnt exist`})
  },
  generateDoc: async (req, res) => {
    
    const templateName = req.params.template.toLowerCase()
    const current = new Date().toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + "";

    if (templateName === 'allogene') {
      const linkModule = new LinkModule();
      const zip = new PizZip(alloTemplate)
      const doc = new Docxtemplater(zip)
        doc.attachModule(linkModule)
        doc.setData({
          date: current,
          hasCompetitor: true,
          hasCorp: true,
          corp: [
              {
                  link: { 
                      text: 'This Is A Test Title For What A Potential Title Might Look Like', 
                      url: "http://google.com"
                  }, 
                  description: 'More words here to simulate an actual description with actual words, but for now there is just an empty void filling this space and not really making much sense so here is my manifesto yeah I said it.', 
                  source: 'Test Inc.', 
                  date: '2/13/2023'
              },
          ],
          competitor: [
              {
                  link: { 
                      text: 'This Is A Test Title For What A Potential Title Might Look Like', 
                      url: "http://google.com"
                  }, 
                  description: 'More words here to simulate an actual description with actual words, but for now there is just an empty void filling this space and not really making much sense so here is my manifesto yeah I said it.', 
                  source: 'Test Inc.', 
                  date: '2/13/2023'
              },
              {
                  link: {
                      text: 'A Tester Titler For A Potential Title', 
                      url: "http://youtube.com"
                  }, 
                  description: 'More words here to simulate an actual description with actual words, but for now there is just an empty void filling this space and not really making much sense so here is my manifesto yeah I said it.', 
                  source: 'Testering Inc.', 
                  date: '2/14/2023'
              },
          ]
        })
        doc.render()

      const docxBuf = doc.getZip().generate({
        type:"nodebuffer"
      });
      // Note: I Would prefer to use libreoffice Convert library as it produces a more accurately formatted PDF result however, this library has libre office as a software dependency which I wouldn't be able to upload on the server when I use a free hosting platform. Also, there is A LOT of latency running the convert function(17,000 ms!! for event handler to complete) part of which I am guessing might derive from time wasted opening and closing the service on my computer as suggested in https://stackoverflow.com/questions/61447666/headless-libreoffice-very-slow-to-export-to-pdf-on-windows-6-times-slow-than-on post. For now I will be using the docx-pdf library even though it is old/not maintained and requires that files be downloaded on to the disk
  
      // let pdfBuf = await libreConvert(docxBuf, '.pdf', undefined);
      // res.send(pdfBuf);
      
      //Note: This option requires that files be saved onto the disk which presents an issue in the case where the event handler is run concurrently (2 requests executed at the same time). I might need to implement some sort of locking method to prevent unexpected behavior. For now I will opt to use the method rewriting into these output files defined below. Docx-pdf uses mammoth under the hood which converts docx to html to pdf and doesnt retain the structure (https://stackoverflow.com/questions/53586207/how-convert-word-document-to-pdf-in-nodejs) I am sacrificing proper formatting with this solution. In the future I might want to consider renaming these files to be unique but then that presents the issue of cluttering the disk space. I'll need to look more deeply into this later if the scope of this project expands.
      
      const inpath = path.join(__dirname, '../tmp/outdocx.docx');
      const outpath = path.join(__dirname, '../tmp/outpdf.pdf');
      fs.writeFileSync(inpath, docxBuf)
      docxConverter(inpath,outpath, function(err,result){
        if(err){
          return console.log(err);
        }
        console.log('PDF generated')
        console.log(outpath)
        res.contentType("application/pdf");
        res.sendFile(outpath);
      });
      
    }
    else res.send({error: `${templateName} template doesnt exist`})
  },
  generatePDF: async (req, res) => {
    //TODO: Reduce code duplication, purhaps move part of this code into a helper function
  },
};
