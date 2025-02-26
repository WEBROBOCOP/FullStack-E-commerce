import React from "react";
import Navbar from "../components/Navabar"
import Hero from "../assets/Hero.jpeg"
import Banner from "../components/Banner";



function Homepage() {
    return (
        <div>
            <Banner />
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <img src={Hero} alt="Hero" style={{ width: '100%', height: 'auto', maxHeight: '675px' }} />
                <div
                    className="mx-8"
                    style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '70px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                }}>
                    Styled by You, <br/>
                    Defined by Fashion.
                </div>
            </div>
            <Banner />
        </div>
    );
}

export default Homepage; 