import mongoose  from 'mongoose';

const EducationSchema = new mongoose.Schema({
    title: {type: String, required: true},
    institution: {type: String, required: true},
    start: {type: String, required: true},
    end: {type: String, required: true},
    description: {type: String, required: true}
});

export default mongoose.model("Education", EducationSchema);