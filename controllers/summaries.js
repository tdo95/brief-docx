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
            const summaries = await Summary.find({docId: docId}).sort({ createdAt: "desc" }).lean();
            console.log(summaries)
            res.send(summaries)

        } catch (err) {
            console.log(err)
            res.send({error: `Error getting summaries: ${err}`})
        }
        

    },
    updateSummary: async (req, res) => {
        const { summaryId, title, description, source, date, docId, link, section } = req.body

        try {
            const update = await Summary.findOneAndUpdate({_id: summaryId}, {
                title, 
                description,
                source,
                link,
                section,
                date
            })
            //Update document lastEdited feild
            const now = Date.now()
            await Document.findOneAndUpdate({ _id: docId }, {lastEdited: now});

            res.send({success: update})

        } catch (err) {
            console.log(err)
            res.send({error: `Error updating summary: ${err}`})
        }
    },
    deleteSummary: async (req, res) => {
        try {
            await Summary.remove({ _id: req.params.summaryId});
            res.send({success: 'Summary has been removed'})
        } catch (err) {
            console.log(err)
            res.send({error: `${err}`})
        }
    },
}