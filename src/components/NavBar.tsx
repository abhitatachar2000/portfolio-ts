import { useRef, useState, useEffect } from "react";
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function NavBar() {
    const [isScrolling, setIsScrolling] = useState(false);
    const navBarSelectedItemRef = useRef<HTMLDivElement>(null);
    const navBarCollapseButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
    
        const handleScroll = () => {
            setIsScrolling(true);
    
            // Clear the previous timeout
            if (scrollTimeout) clearTimeout(scrollTimeout);
    
            // Set a new timeout to detect scroll stop (e.g., after 300ms of no scroll)
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 300);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);
    return (
        <nav className="NavBarComponent navbar navbar-expand-lg navbar-light fixed-top bg-white pt-3 pb-3">
            <div className="container-fluid d-flex justify-content-center position-relative">
                <button 
                    className={`navbar-toggler position-absolute d-lg-none ${isScrolling ? 'opacity-0' : 'opacity-100'}`}
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    ref={navBarCollapseButtonRef}
                    style={{
                        zIndex: 1001,
                        top: '-5px',
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div 
                    className="collapse navbar-collapse justify-content-center" 
                    id="navbarSupportedContent" 
                    ref={navBarSelectedItemRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        zIndex: 1000
                    }}
                >
                    <ul className="navbar-nav mb-2 mb-lg-0 gap-3 gap-md-4 gap-lg-5">
                        {getListItems().map((item) => (
                            <li className="nav-item" key={item}>
                                <a className="nav-link NavBarItem" href={`#${item}`} onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(item);
                                    if (element) {
                                        const headerOffset = 70;
                                        const elementPosition = element.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                    }
                                    if(navBarSelectedItemRef.current?.classList.contains("show")){
                                        navBarCollapseButtonRef.current?.click();
                                    }
                                }}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function getListItems(): string[] {
    const listItems = ['Home', 'Experience', 'Education', 'Publications', 'Skills', 'Contact'];
    return listItems;
}