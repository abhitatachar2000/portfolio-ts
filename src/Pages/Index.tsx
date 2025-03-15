import { NavBar } from '../components/NavBar'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './Index.css'
import { IntroSection } from '../components/IntroSection' 
import { ExperienceSection } from '../components/ExperienceSection';
import { EducationSection } from '../components/EducationSection';
import { SkillSection } from '../components/SkillsSection';
import { PublicationSection } from '../components/PublicationSection';
import { ContactSection } from '../components/ContactSection';

function Index() {
  return (
    <div>
      <section id="nav-bar">
      <NavBar />
      </section>
      <div id="main-page" className="container mt-3 pt-5">
        <IntroSection />
        <ExperienceSection />
        <EducationSection />
        <PublicationSection />
        <SkillSection />
        <ContactSection />
      </div>
        <footer className="p-4 text-white text-center w-100 position-relative start-0 end-0">
          © 2025 Abhishek Vasudev Tatachar
      </footer>
    </div>
    
  );
}

export default Index;
