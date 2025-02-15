import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IntroSection.css";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export function IntroSection() {
    return (
        <section id="Home">
            <img className="profile-img"
                src="src/assets/images/profile.png" 
                alt="profile-photo" 
            />
            <h3>Abhishek Vasudev Tatachar</h3>
            <h5>Fullstack Cloud Engineer</h5>
            <p style={{paddingRight: "10px"}}>I specialize in architecting and developing scalable SaaS applications, cloud security, and AI-driven solutions. With expertise in Python, JavaScript, and Java, I build high-performing systems using React, Node.js, and Spring Boot. I have hands-on experience with AWS (Lambda, EKS, S3), Kubernetes, and CI/CD pipelines. As an AWS Certified Solutions Architect, I focus on optimizing cloud architectures, identity management, and security in hybrid environments. Additionally, I have a strong research background with eight published papers in AI, Image Processing, and Cloud Applications.</p>
            <div className="icon-container">
                <a href="https://www.linkedin.com/in/abhishektatachar" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} color="#0077b6" />
                </a>
                <a href="mailto:abhishektatachar@gmail.com" target="_blank">
                    <FontAwesomeIcon icon={faEnvelope}  color="#0077b6"/>
                </a>
                <a href="https://github.com/abhitatachar2000" target="_blank">
                    <FontAwesomeIcon icon={faGithub} color="#0077b6"/>
                </a>
                <a href="public/Abhishek V Tatachar - Resume.pdf" target="_blank">
                    <FontAwesomeIcon icon={faDownload} color="#0077b6"/>
                </a>
            </div>
        </section>
    );
}