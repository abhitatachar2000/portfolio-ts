import "./IntroSection.css";
export function IntroSection() {
    return (
        <section id="Home" className="intro-section">
            <img className="profile-img"
                src="/assets/images/profile2.png" 
                alt="profile-photo" 
            />
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="badge profile-badge">Fullstack Developer</span>
                    <div className="name-container">
                        <h1 className="intro-h1">Hi, I'm</h1>
                        <h1 className="intro-h1">Abhishek Vasudev Tatachar</h1>
                    </div>

                    <p className="intro-p">I am a cloud solutions architect and AI-driven application developer specializing in scalable, secure SaaS solutions. Proficient in Python, JavaScript, and Java, I build high-performance applications with React, Node.js, and Spring Boot, leveraging AWS, Kubernetes, and CI/CD for automation and scalability. As an AWS Certified Solutions Architect, I ensure secure deployments with expertise in cloud security, identity management, DevOps, and infrastructure as code (IaC). With eight published research papers in AI, Image Processing, and Cloud Applications, I integrate cutting-edge research with real-world innovation.</p>
                    <button 
                        type="button" 
                        className="btn btn-primary contact-button"
                        onClick={() => document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Contact
                    </button>
                </div>
            </div>
        </section>
    );
}