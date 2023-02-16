const Document = require("../models/Document");
const path = require('path')

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
      const filePath = path.join(__dirname, '../templates/tag-example.docx')
      res.sendFile(filePath, {}, (error) => {
        if (error) next(error)
        else console.log('Sent:', filePath)
      })
    }
    else res.send({error: `${templateName} template doesnt exist`})
  }
};
