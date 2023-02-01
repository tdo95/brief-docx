const Document = require("../models/Document");

module.exports = {
  getDocuments: async (req, res) => {
    try {
      const documents = await Document.find({ creator: req.user.id });
      
    } catch (err) {
      console.log(err);
    }
  },
};
