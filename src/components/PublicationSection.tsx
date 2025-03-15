import { getServerUrl } from "../commonUtils";
import "./PublicationSection.css";

import { useState, useEffect } from 'react';

export type PublicationData = {
    title: string;
    journal: string;
    publication_date: string;
    summary: string;
    authors: string;
    link: string;
}

export function PublicationSection() {
    const [publicationsData, setPublicationsData] = useState<Array<PublicationData>>([]);
    const baseApiRoute = getServerUrl() || 'http://localhost:8080';
    useEffect(() => {
        fetch(`${baseApiRoute}/api/portfolio/Publications`)
            .then(response => response.json())
            .then(data => setPublicationsData(data))
            .catch(error => console.error('Error fetching publication data:', error));
    }, []);
    return (
        <section id="Publications" className="pub-section">
            <h1 className="pub-h1">Publications</h1>
            <p className="exp-oneLiner">Research papers and articles I've authored or co-authored in the field of Artificial Intelligence and Software Engineering</p>
            {(publicationsData ?? []).map((data: PublicationData) => {
                return (
                    <div className="card" style={{width: "100%", marginBottom: "10px"}}>
                    <div className="card-header pub-header" style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                        <strong>{data.title}</strong>
                    </div>
                    <div className="card-body">
                        <p className="card-text"><small>{`${data.journal} • ${data.publication_date}`}</small></p>
                        <p className="card-text">{data.summary}</p>
                        <a href={`${data.link}`} target="blank" className="card-link" style={{ textDecoration: 'none' }}>
                            Read Publication <i className="fa fa-external-link" aria-hidden="true"></i>
                        </a>
                    </div>
                    </div>
                );
            })}
        </section>
    );
}   