const Document = require("../models/Document");
const Summary = require("../models/Summary");
const { generateWordDocBuffer, generatePdfAndSend } = require( "../utilities/docCreationUtils");
const path = require('path');
const docxPath = path.join(__dirname, '../tmp/outdocx.docx');

module.exports = {
  getDocuments: async (req, res) => {
    try {
      const documents = await Document.find({ creator: req.user.id });
      res.send(documents)
      
    } catch (err) {
      console.log(err);
      res.send({error: err})
    }
  },
  updateDocument: async (req, res) => {
    try {
      const { docId } = req.params;
      const now = Date.now()
      const update = {...req.body, lastEdited: now}
      const document = await Document.findOneAndUpdate({ _id: docId }, update);
      res.end()
      
    } catch (err) {
      console.log(err);
      res.send({error: err})
    }
  },
  deleteDocument: async (req, res) => {
    try {
      console.log(req.user)
      await Document.remove({ _id: req.params.docId });
      res.send({success: 'Success! Document removed.'})
    } catch (err) {
      console.log(err);
      res.send({error: err})
    }
  },
  createDocument: async (req, res) => {
    const { template } = req.body
    const now = new Date();
    let doc;
    let title = 'Untitled';
    if (template === 'Allogene') {
      title = `Allogene Daily Media Monitoring - ${now.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}`
    }
    try {
      doc = await Document.create({ 
        title: title, 
        template: template, 
        lastEdited: now,  
        creator: req.user._id
      });
      console.log(`${template} document created`)
      res.send({document: doc})
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
  generateDocument: async (req, res) => {
    const { template, docType, docId } = req.params
    const acceptedTemplates = ['allogene', 'notes']
    if (!acceptedTemplates.includes(template.toLowerCase())) res.send({error: `${templateName} template doesnt exist`})
    
      try {
        //get document info from database
        const docInfo = await Document.findById({_id: docId})
        
        //get all summaries associated with the document sorted by date
        const summaries = await Summary.find({docId: req.params.docId}).sort({date: "desc"})
        
        //format summaries into section catagories to be compatible with docx-templates engine
        const docData = summaries.reduce((obj, item) => {
          //add items section if it doesnt exist
          if (!obj.sections[item.section]) obj.sections[item.section] = [];
          //add formatted summary to section
          obj.sections[item.section].push({
            description: item.description,
            source: item.source,
            date: item.date.toLocaleDateString('en-US'),
            //TODO: Change this to be not so confusing in template and here
            link: {
              text: item.title,
              url: item.link
            },
            similarStories: item.similarStories
          })  
          return obj
        }, {sections: {}})

        if (template.toLowerCase() === 'notes') {
          // Format sections into an array
          const sectionList = [];
          for (const section in docData.sections) 
            sectionList.push({title: section, summaries: docData.sections[section]})
          console.log(sectionList)
          docData.sections = sectionList
        }

        //add document creation date formatted Month, Day, Year
        docData.date = docInfo.creationDate.toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).toString()
        //add document title
        docData.title = docInfo.title

        const docxBuf = await generateWordDocBuffer(docData, template.toLowerCase())

        if (docType === 'word') {
          res.type('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
          res.sendFile(docxPath)
        } else generatePdfAndSend(docxBuf, res)

      } catch (err) {
        res.send({error:`Couldn't generate document: ${err}`})
      }
    
    
  },
};
