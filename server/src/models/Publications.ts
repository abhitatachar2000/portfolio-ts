import mongoose  from 'mongoose';

const PublicationSchema = new mongoose.Schema({
    title: {type: String, required: true},
    journal: {type: String, required: true},
    publication_date: {type: String, required: true},
    summary: {type: String, required: true},
    authors: {type: String, required: true},
    link: {type: String, required: true}
});

export default mongoose.model("Publications", PublicationSchema);