const Document = require("../models/Document");

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
};
