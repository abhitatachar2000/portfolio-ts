import "./ExperienceSection.css";
import { useState, useEffect } from 'react';

type ExperienceData = {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    type: string;
    description: string;
};

export function ExperienceSection() {
    const [experienceData, setExperienceData] = useState<Array<ExperienceData>>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    useEffect(() => {
        fetch(`/api/portfolio/Experience`)
            .then(response => response.json())
            .then(data => setExperienceData(data))
            .catch(error => console.error('Error fetching experience data:', error));
    }, []);

    return (
        <section id="Experience" className="exp-section">
            <h1 className="exp-h1">Work Experience</h1>
            <p className="exp-oneLiner">My professional journey and roles that have shaped my expertise in frontend development.</p>
            <div className="experience-data">
                <div className="row">
                    <div className="col-12 col-md-4 mb-3">
                        <div className="col-md-12">
                            <div className="list-group">
                            {
                            experienceData.map((exp, index) => (
                                <button
                                    key={index}
                                    className={`list-group-item list-group-item-action p-3 ${
                                    selectedIndex === index ? "exp-active" : ""
                                    }`}
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <strong>{exp.title}</strong>
                                    <br />
                                    <small>{exp.company}</small>
                                </button>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 d-flex">
                        <div className="card p-4 shadow-sm w-100" style={{padding: "0px"}}>
                            <h5 className="fw-bold">{experienceData[selectedIndex]?.title}</h5>
                            <p className="card-text">
                                <small className="text-muted">
                                {`${experienceData[selectedIndex]?.company} • ${experienceData[selectedIndex]?.startDate} - ${experienceData[selectedIndex]?.endDate}`}
                                </small>
                            </p>
                            <p className="text-muted">
                                {experienceData[selectedIndex]?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}