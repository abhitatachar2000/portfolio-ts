import { getServerUrl } from "../commonUtils";
import "./SkillsSection.css";
import { useEffect, useState } from "react";

type skill = {
    title: string,
    skills: string[]
}
 
export function SkillSection() {
    const [skillsData, setSkillsData] = useState<skill[]>([]);
    const baseApiRoute = getServerUrl() || 'http://localhost:8080';
    useEffect(() => {
        fetch(`${baseApiRoute}/api/portfolio/Skills`)
            .then(response => response.json())
            .then(data => setSkillsData(data))
            .catch(error => console.error('Error fetching skills data:', error));
    }, []);
    return (
        <section id="Skills" className="skills-section">
            <h1 className="skills-h1"> Skills</h1>
            <p className="exp-oneLiner">Research papers and articles I've authored or co-authored in the field of Artificial Intelligence and Software Engineering</p>
            <div className="accordion" id="accordionExample">
            {
                skillsData.map((skill: skill, index: number) => {
                    return (
                        <div key={index} className="accordion-item">
                            <h2 className="accordion-header " id={`headingAccordion-${index}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                    <strong>{skill.title}</strong>
                                </button>
                            </h2>
                            <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`headingAccordion-${index}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                <ul className="list-group list-group-flush">
                                {skill.skills.map((skillItem: string, i: number) => (
                                    <li key={i} className="list-group-item">{skillItem}</li>
                                ))}
                                </ul>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
        </section>
    );
}       