const Summary = require("../models/Summary");
const Document = require("../models/Document");

module.exports = {
    createSummary: async (req, res) => {
        const {title, description, source, date, docId, link, section} = req.body;
        try {
            const sum = await Summary.create({ 
                title, 
                description, 
                source, 
                date, 
                docId, 
                link, 
                section, 
            });
            //Update document lastEdited feild
            const now = Date.now()
            const document = await Document.findOneAndUpdate({ _id: docId }, {lastEdited: now});

            console.log(`summary created`)
            res.send({summary: sum})
        } catch (err) {
            console.log(err);
            res.send({error: `Error creating summary: ${err}`})
        }
    },
    getDocumentSummaries: async (req, res) => {
        const { docId } = req.params
        console.log(docId)
        try {
            const summaries = await Summary.find({docId: docId});
            console.log(summaries)
            res.send(summaries)

        } catch (err) {
            console.log(err)
            res.send({error: `Error getting summaries: ${err}`})
        }
        

    },
}