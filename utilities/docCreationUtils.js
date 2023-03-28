const fs = require('fs')
const path = require('path');
const inpath = path.join(__dirname, '../tmp/outdocx.docx');
const outpath = path.join(__dirname, '../tmp/outpdf.pdf');
const work = fs.readFileSync(path.join(__dirname, '../templates/allo-temp.docx'))
const notes = fs.readFileSync(path.join(__dirname, '../templates/notes-temp.docx'))
const { createReport } = require('docx-templates')
const docxConverter = require('docx-pdf');
// const libre = require('libreoffice-convert');
// const libreConvert = require('util').promisify(libre.convert);

module.exports = {
    generateWordDocBuffer: async function(docData, templateName) {

      console.log(docData, templateName)
      let template
      if (templateName === 'allogene') template = work;
      if (templateName === 'notes') template = notes;
      try {
        const buffer = await createReport({
          template,
          data: docData
        })

        fs.writeFileSync(inpath, buffer)
        return buffer

      } catch (err) {
        console.log(err)
      }
    },
    generatePdfAndSend: async function(docxBuf, res) {
      // Note: I Would prefer to use libreoffice Convert library as it produces a more accurately formatted PDF result however, this library has libre office as a software dependency which I wouldn't be able to upload on the server when I use a free hosting platform. Also, there is A LOT of latency running the convert function(17,000 ms!! for event handler to complete) part of which I am guessing might derive from time wasted opening and closing the service on my computer as suggested in https://stackoverflow.com/questions/61447666/headless-libreoffice-very-slow-to-export-to-pdf-on-windows-6-times-slow-than-on post. For now I will be using the docx-pdf library even though it is old/not maintained and requires that files be downloaded on to the disk
  
      // let pdfBuf = await libreConvert(docxBuf, '.pdf', undefined);
      // res.send(pdfBuf);
    
      //Note: This option requires that files be saved onto the disk which presents an issue in the case where the event handler is run concurrently (2 requests executed at the same time). I might need to implement some sort of locking method to prevent unexpected behavior. For now I will opt to use the method rewriting into these output files defined below. Docx-pdf uses mammoth under the hood which converts docx to html to pdf and doesnt retain the structure (https://stackoverflow.com/questions/53586207/how-convert-word-document-to-pdf-in-nodejs) I am sacrificing proper formatting with this solution. In the future I might want to consider renaming these files to be unique but then that presents the issue of cluttering the disk space. I'll need to look more deeply into this later if the scope of this project expands.
      
      //Note: this function logs a random array to the console... not sure what that's about lol
      docxConverter(inpath,outpath, function(err,result){
        if(err){
            console.log(err);
            res.send({error: `Couldn't generate PDF: ${err}`})
        }
        console.log('PDF generated')
        res.type("application/pdf")
        res.sendFile(outpath)
        
      });

    }
}