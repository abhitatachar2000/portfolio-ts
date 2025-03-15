import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeSquare, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./ContactSection.css";
import { RefObject, useRef } from "react";
function handleContactFormSubmission(
    contactEmail: React.RefObject<HTMLInputElement>,
    contactName: React.RefObject<HTMLInputElement>,
    contactSubject: React.RefObject<HTMLInputElement>,
    contactText: React.RefObject<HTMLTextAreaElement>
) {
    if (contactEmail.current && contactName.current && contactSubject.current && contactText.current) { 
        const mailtoLink = `mailto:abhishektatachar@gmail.com?subject=${encodeURIComponent(contactSubject.current.value)}&body=${encodeURIComponent(`From: ${contactName.current.value}\nReply to: ${contactEmail.current.value}\n\n${contactText.current.value}`)}`; 
        window.location.href = mailtoLink; 
        
        contactName.current.value = '';
        contactEmail.current.value = '';
        contactSubject.current.value = '';
        contactText.current.value = '';
    }
}

export function ContactSection() {
    const contactPersonName = useRef<HTMLInputElement>(null);
    const contactPersonEmail = useRef<HTMLInputElement>(null);
    const contactSubject = useRef<HTMLInputElement>(null);
    const contactText = useRef<HTMLTextAreaElement>(null);

    return(
        <section id="Contact" className="contact-section">
            <h1 className="contact-h1">Contact Me</h1>
            <p className="exp-oneLiner">Reach out to me directly or use the form below.</p>
            <div className="row g-4">
            <div className="col-12 col-md-6">
                <div className="card h-100" style={{width: "100%"}}>
                <div className="card-body">
                    <h5 className="card-title">
                    <strong>Contact Information</strong>
                    </h5>
                    <div className="row align-items-center" style={{ marginTop: '15px' }}>
                    <div className="col-1" style={{ marginRight: '5px' }}>
                        <FontAwesomeIcon icon={faEnvelopeSquare} size="2x" />
                    </div>
                    <div className="col">
                        <p className="mb-0"><strong>Email</strong><br></br>abhishektatachar@gmail.com</p>
                    </div>
                    </div>
                    <div className="row align-items-center" style={{ marginTop: '15px' }}>
                    <div className="col-1" style={{ marginRight: '5px' }}>
                        <FontAwesomeIcon icon={faLocationDot} size="2x" />
                    </div>
                    <div className="col">
                        <p className="mb-0"><strong>Location</strong><br></br>Bangalore, Karnataka, India</p>
                    </div>
                    </div>
                    <div className="row align-items-center" style={{ marginTop: '15px' }}>
                    <div className="col-1" style={{ marginRight: '5px' }}>
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </div>
                    <div className="col">
                        <p className="mb-0"><strong>Linkedin</strong><br></br>linkedin.com/in/abhishektatachar</p>
                    </div>
                    </div>
                    <div className="row align-items-center" style={{ marginTop: '15px' }}>
                    <div className="col-1" style={{ marginRight: '5px' }}>
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                    </div>
                    <div className="col">
                        <p className="mb-0"><strong>GitHub</strong><br></br>abhitatachar2000</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="card h-100" style={{width: "100%"}}>
                <div className="card-body">
                    <form onSubmit={() => {
                        handleContactFormSubmission(contactPersonEmail as RefObject<HTMLInputElement>, 
                            contactPersonName as RefObject<HTMLInputElement>,
                            contactSubject as RefObject<HTMLInputElement>, 
                            contactText as RefObject<HTMLTextAreaElement>);
                    }}>
                        <div className="mb-3">
                            <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="nameInput" className="form-label">Name</label>
                                <input type="text" ref={contactPersonName} className="form-control" id="nameInput" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="emailInput" className="form-label">Email address</label>
                                <input type="email" ref={contactPersonEmail} className="form-control" id="emailInput" required />
                            </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subjectInput" className="form-label">Subject</label>
                            <input type="text" ref={contactSubject} className="form-control" id="subjectInput" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Email Content</label>
                            <textarea className="form-control" ref={contactText} id="exampleFormControlTextarea1" required ></textarea>
                        </div>
                        <button type="submit" className="btn submit-button">Submit</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}