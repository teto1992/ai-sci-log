import React from "react";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
    document.body.classList.add('backgroundHome');

    return (
        <div>
            <div className="titletext">
                <h2>GreenAItelier: Sustainable AI Systems from Open Data to Policy Integration</h2>
            </div>
            <div className="topleftimage">
                <Link to="/">
                    <img src="../public/home_logo_1.png" alt="Home Page Image" title="Home Page" width="400" height="150"/>
                </Link>
            </div>
            <div className="carbonIntensityImage">
                <Link to="/carbon_intensity">
                    <img src="../public/carbon_intensity_image.png" alt="Carbon Intensity Image" title="Carbon Intensity & Blue Whales" width="600" height="500"/>
                </Link>
            </div>
            <div className="footprintImage">
                <Link to="/carbon_dioxide_footprint">
                    <img src="../public/footprint_image.png" alt="Carbon Footprint Image" title="Carbon Footprint" width="600" height="500"/>
                </Link>
            </div>
            <div className="sciImage">
                <Link to="/sci">
                    <img src="../public/SCI_image.png" alt="SCI Image" title="SCI" width="100" height="50"/>
                </Link>
            </div>
        </div>
    );
};

export default Home;