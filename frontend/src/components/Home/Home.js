import React from 'react';
import './Home.css';
import alert from '../../images/alert.gif';
import alert2 from '../../images/alert2.png';
import icons from '../../images/icons.png';
const Home = (props) => {
    return (
        <div>
            <div className={"my-4"}>
                <img className="w-101" src={alert} alt="img"/>
            </div>
            <div id="homeCarousel" className="carousel slide my-4 w-101" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={alert2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.neptun.mk/2024/06/27/WebSlider_Honor_Magic6Pro_Webslider-02.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.neptun.mk/2024/05/09/samsung-Galaxy-S23-S23FE-_-Buds-FE--webslider_new.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.neptun.mk/2024/07/24/Samsung_GalazyZFold6-ZFlip6_Vaucher_Webslider.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.neptun.mk/2024/08/15/Apple_B2S_1920x520.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.neptun.mk/2024/08/16/amazfit-Avgust-webslider.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.neptun.mk/2024/08/16/canon-b2s-webslider.png" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <a href="/chatbot" className="hero-section">
                <div className="hero-text">
                    <h1 className={"text-warning"}>Try Our Chatbot</h1>
                </div>
            </a>
            <div className="my-4 pt-4">
                <img className="w-100" src={icons} alt="idk" />
            </div>
        </div>
    );
}

export default Home;