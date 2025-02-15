import { NavBar } from './components/NavBar'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import { IntroSection } from './components/IntroSection' 

function App() {
  return (
    <div>
      <section id="nav-bar">
        <NavBar />
      </section>
      <div id="main-page" className="container mt-3 pt-5">
        <div className="row">
        <div className="col-md-4 col-12 fixed-column">
            <IntroSection />
        </div>
        <div className="col-md-8 col-12 scrollable-column">
            <div className="content">
                <h4>Scrollable Column</h4>
                <p>Scroll this section independently on larger screens.</p>
                <p>More content...</p>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}
export default App
