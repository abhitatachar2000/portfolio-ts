import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { error } from "console";
const educationData = require('../content/Education.json');
const experienceData = require('../content/Experience.json');
const skillsData = require('../content/Skills.json');
const publicationsData = require('../content/Publications.json')
const fs = require('fs');
const path = require('path');

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());

app.get("/api/portfolio/Experience", (req, res) => {
    try {
        res.status(200).json(experienceData["experience"])
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
            const filePath = path.join(__dirname, '../content/Experience.json');
            const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            currentData.experience.push(req.body);
            fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
        }
        res.status(201).json({message: "New experience item added"})
    } catch {
        res.status(400).json({error: error});    
    }
})

app.get("/api/portfolio/Education", (req, res) => {
    try {
        res.status(200).json(educationData["education"]);
    } catch (error) {
        res.status(500).json({ error: 'Error reading education data' });
    }
});

app.post("/api/portfolio/Education", (req, res) => {
    const requiredKeys: string[] = ["Title", "Institution", "Start", "End", "Description"];
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
            const filePath = path.join(__dirname, '../content/Education.json');
            const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            currentData.education.push(req.body);
            fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
        }
        res.status(201).json({message: "New education item added"})
    } catch (error) {
        res.status(400).json({ error: error});
    }
})

app.get('/api/portfolio/Skills', (req, res) => {
    try {
        res.status(200).json(skillsData["skills"]);
    } catch (error) {
        res.status(400).json({error : error});
    }
})

app.get('/api/portfolio/Publications', (req, res) => {
    try {
        res.status(200).json(publicationsData["publications"]);
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
            const filePath = path.join(__dirname, '../content/Publications.json');
            const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            currentData.publications.push(req.body);
            fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
        }
        res.status(201).json({message: "New publication added"})
    } catch (error) {
        res.status(400).json({ error: error});
    }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
