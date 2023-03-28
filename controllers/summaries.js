const Summary = require("../models/Summary");
const Document = require("../models/Document");

module.exports = {
    createSummary: async (req, res) => {
        const {title, description, source, date, docId, link, section} = req.body;
        try {
            //check for summary with 
            const duplicate = await Summary.findOne({link: link});
            console.log(duplicate)
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

            if (duplicate) {
                res.send({warning:{ 
                    document: duplicate.title, 
                    date: duplicate.createdAt.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }})
            }
            else res.send({summary: sum})
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

            //Update document lastEdited feild
            const now = Date.now()
            await Document.findOneAndUpdate({ _id: req.params.docId }, {lastEdited: now});

            res.send({success: 'Success! Item has been removed'})
        } catch (err) {
            console.log(err)
            res.send({error: `${err}`})
        }
    },
    addSimilar: async (req, res) => {
        const {summaryId, story} = req.body
        try {
            console.log(req.body)
            await Summary.findOneAndUpdate({_id: summaryId}, {$push: {similarStories: story}})

            //Update document lastEdited feild
            const now = Date.now()
            await Document.findOneAndUpdate({ _id: req.params.docId }, {lastEdited: now});

            res.send({success: 'Success! Item has been added.'})

        } catch (err) {
            console.log(err) 
            res.send({error: `${err}`})
        }
    },
    updateSimilar: async (req, res) => {
        const {summaryId, story, similarId} = req.body
        try {
            console.log(req.body)
            const data = await Summary.findOneAndUpdate({"similarStories._id": similarId}, {$set: {"similarStories.$": story}})
            console.log(data)

            //Update document lastEdited feild
            const now = Date.now()
            await Document.findOneAndUpdate({ _id: req.params.docId }, {lastEdited: now});
            
            res.send({success: 'Success! Item has been updated.'})

        } catch (err) {
            console.log(err) 
            res.send({error: `${err}`})
        }
    },
    deleteSimilar: async (req, res) => {
        const {summaryId, similarId} = req.params
        try {
            console.log(req.params)
            const data = await Summary.findOneAndUpdate({_id: summaryId}, {$pull: {"similarStories": {"_id": similarId}}})
            console.log(data)

            //Update document lastEdited feild
            const now = Date.now()
            await Document.findOneAndUpdate({ _id: req.params.docId }, {lastEdited: now});
            
            res.send({success: 'Success! Item has been deleted.'})

        } catch (err) {
            console.log(err) 
            res.send({error: `${err}`})
        }
    }
}