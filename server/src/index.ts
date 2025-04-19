import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { error } from "console";
import { MongoDBManager } from "./MongoDBManager";
import Experience from './models/Experience';
import Education from './models/Education';
import Skills from './models/Skills';
import Publication from "./models/Publications";

dotenv.config();

const fs = require('fs');
const path = require('path');

const mongoDBManager = new MongoDBManager();
mongoDBManager.connectToDB()

const app = express();
const PORT = Number(process.env.VITE_SERVERPORT) || 8080;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json("Application up and running");
});

app.get("/api/portfolio/Experience", async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({error: error})
    }
})

app.post("/api/portfolio/Experience", (req, res) => {
    const requiredKeys: string[] = ["title", "company", "startDate", "endDate", "type", "description"];
    let missingKeys = '';

    try {
        const obtainedKeys = Object.keys(req.body);
        requiredKeys.forEach((key) => {
            if(!obtainedKeys.includes(key)) {
                missingKeys = missingKeys.concat(`, ${key}`);
            }
        })
        if (missingKeys.length > 0) {
            throw new Error(`Missing required keys: ${missingKeys.substring(2)}`);
        } else {
            const experienceData = new Experience(req.body);
            experienceData.save();
            res.status(201).json({message: "New experience item added"})
        }
    } catch {
        res.status(400).json({error: error});    
    }
})

app.get("/api/portfolio/Education", async (req, res) => {
    try {
        const educationData = await Education.find();
        res.json(educationData);
    } catch (error) {
        res.status(500).json({ error: `Error reading education data: ${error}` });
    }
});

app.post("/api/portfolio/Education", (req, res) => {
    const requiredKeys: string[] = ["title", "institution", "start", "end", "description"];
    let missingKeys: string = '';
    try {
        const obtainedKeys = Object.keys(req.body);
        requiredKeys.forEach((key:string) => {
            if (!obtainedKeys.includes(key)) {
                missingKeys = missingKeys.concat(`, ${key}`);
            }
        })
        if (missingKeys.length > 0) {
            throw new Error(`Missing required keys: ${missingKeys.substring(2)}`);
        } else {
            const educationData = new Education(req.body);
            educationData.save();
            res.status(201).json({message: "New education item created"});
        }
    } catch (error) {
        res.status(400).json({ error: error});
    }
})

app.get('/api/portfolio/Skills', async (req, res) => {
    try {
        const skills = await Skills.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(400).json({error : error});
    }
})

app.post('/api/portfolio/Skills', (req, res) => {
    try {
        const requiredKeys: string[] = ['title', 'skills'];
        let missingKeys: string = '';
        const obtainedKeys = Object.keys(req.body);
        requiredKeys.forEach(key => {
            if (!obtainedKeys.includes(key)){
                missingKeys = missingKeys.concat(`, ${key}`)
            }
        })
        if (missingKeys.length > 0) {
            throw new Error(`Missing required keys: ${missingKeys.substring(2)}`);
        } else {
            const skills = new Skills(req.body);
            skills.save();
            res.status(201).json({message: "New skills item added successfully"});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
})

app.get('/api/portfolio/Publications', async(req, res) => {
    try {
        const publicationData = await Publication.find();
        res.status(200).json(publicationData);
    } catch (error) {
        res.status(400).json({error : error});
    }
})

app.post("/api/portfolio/Publications", (req, res) => {
    const requiredKeys: string[] = ["title", "journal", "publication_date", "summary", "authors"];
    let missingKeys: string = '';
    try {
        const obtainedKeys = Object.keys(req.body);
        requiredKeys.forEach((key:string) => {
            if (!obtainedKeys.includes(key)) {
                missingKeys = missingKeys.concat(`, ${key}`);
            }
        })
        if (missingKeys.length > 0) {
            throw new Error(`Missing required keys: ${missingKeys.substring(2)}`);
        } else {
            const publicationData = new Publication(req.body);
            publicationData.save();
            res.status(201).json({message: "New publication item added successfully."})
        }
    } catch (error) {
        res.status(400).json({ error: error});
    }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
