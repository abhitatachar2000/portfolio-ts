import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeSquare, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./ContactSection.css";
import { FormEvent, useRef } from "react";
import emailjs from '@emailjs/browser';


export function ContactSection() {
    const formRef = useRef<HTMLFormElement | null>(null);

    const sendEmail = (e: FormEvent) => {
        console.log(formRef.current, 'current');
        e.preventDefault();
        const serviceID = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY;

        if (formRef.current != null) {
            emailjs.sendForm(serviceID, templateID, formRef.current, {
                publicKey: publicKey,
              }).then(
                () => {
                  console.log('Email sent successfully!');
                },
                (error) => {
                  console.error('Failed to send email:', error.text);
                },
            );
        }
    }

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
                    <form ref={formRef} onSubmit={sendEmail}>
                        <div className="mb-3">
                            <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="nameInput" className="form-label">Name</label>
                                <input type="text" className="form-control" id="nameInput" name="name" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="emailInput" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="emailInput" name="email" required />
                            </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subjectInput" className="form-label">Subject</label>
                            <input type="text" className="form-control" id="subjectInput" name="title" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Email Content</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="message" required ></textarea>
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