import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function NavBar() {
    const navBarSelectedItemRef = useRef<HTMLDivElement>(null);
    const navBarCollapseButtonRef = useRef<HTMLButtonElement>(null);
    return (
        <nav className="NavBarComponent navbar navbar-expand-lg navbar-light">
            <div className="container">
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    ref={navBarCollapseButtonRef}
                ><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navBarSelectedItemRef}>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3 gap-md-4 gap-lg-5">
                    {getListItems().map((item) => (
                        <li className="nav-item" key={item}>
                            <a className="nav-link NavBarItem" href={`#${item}`} onClick={() => {
                                if(navBarSelectedItemRef.current?.classList.contains("show")){
                                    navBarCollapseButtonRef.current?.click();
                                }
                            }}>{item}</a>
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