import "./EducationSection.css";
import { useState, useEffect } from 'react';

export type EducationData = {
    title: string;
    institution: string;
    start: string;
    end: string;
    description: string;
}

export function EducationSection() {
    const [educationData, setEducationData] = useState<Array<EducationData>>([]);
    useEffect(() => {
        fetch(`/api/portfolio/Education`)
            .then(response => response.json())
            .then(data => setEducationData(data))
            .catch(error => console.error('Error fetching education data:', error));
    }, []);
    return (
        <section id="Education" className="edu-section">
            <h1 className="edu-h1">Education</h1>
            <p className="exp-oneLiner">My academic background and educational qualifications.</p>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {educationData.map((education, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-header edu-header" style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                                    <strong>{education.title}</strong>
                                </div>
                                <div className="card-body">
                                    <h6 className="text-muted">{education.institution}</h6>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {education.start} - {education.end}
                                        </small>
                                    </p>
                                    <p className="card-text">{education.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}   