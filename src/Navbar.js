import React from 'react';

function Navbar() {
    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="index.js">Movie Database</a>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a href="App.js" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item active">
                        <a href="AboutUs.js" className="nav-link">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Contact Us</a>
                    </li>
                </ul>
            </div>
        </nav>

    )

}
export default Navbar;
