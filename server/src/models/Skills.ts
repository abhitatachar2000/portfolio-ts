import mongoose  from 'mongoose';

const SkillsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    skills: {type: [String], required: true},
});

export default mongoose.model("Skills", SkillsSchema);