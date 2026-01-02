import React from 'react';
import './About.css';

const About = () => {
    React.useEffect(() => {
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <div className="about-container">
            <div className="about-hero">
                <div className="about-hero-content">
                    <h1>Our Story</h1>
                    <p>Born from the glacial peaks, refined for the modern connoisseur.</p>
                </div>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <div className="about-text">
                        <h2>The Source</h2>
                        <p>
                            Aqua Vita begins its journey in the untouched altitudes of the Himalayas.
                            Far from industrial pollution, our water filters naturally through layers of
                            mineral-rich volcanic rock, acquiring a unique alkaline profile that restores
                            balance to the body.
                        </p>
                        <p>
                            We don't manufacture water; we simply bottle nature's perfection.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src="/images/feature_purity.png" alt="Glacial Source" />
                    </div>
                </div>

                <div className="about-section reverse">
                    <div className="about-text">
                        <h2>The Philosophy</h2>
                        <p>
                            Water is not just a commodity; it is the essence of life. We believe that
                            hydration should be an experience of luxury and wellness.
                        </p>
                        <p>
                            From our gold-standard filtration process to our signature glass bottles,
                            every detail is curated to ensure that what touches your lips is nothing
                            short of extraordinary.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src="/images/feature_quality.png" alt="Premium Quality" />
                    </div>
                </div>

                <div className="values-section" id="sustainability">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <h3>Purity</h3>
                            <p>Untouched by human hands until you open the seal.</p>
                        </div>
                        <div className="value-item">
                            <h3>Sustainability</h3>
                            <p>Committed to 100% recyclable glass and zero-plastic packaging.</p>
                        </div>
                        <div className="value-item">
                            <h3>Excellence</h3>
                            <p>Award-winning taste profile preferred by sommeliers worldwide.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="process-section">
                <h2>The Journey of Purity</h2>
                <div className="process-timeline">
                    <div className="process-step">
                        <div className="step-number">01</div>
                        <h3>The Source</h3>
                        <p>Harvested from protected glacial springs at 12,000ft elevation.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">02</div>
                        <h3>Natural Filtration</h3>
                        <p>Volcanic rock filtration enriches the water with essential minerals.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">03</div>
                        <h3>Precision Bottling</h3>
                        <p>Bottled at source in UV-sterilized glass to seal in the freshness.</p>
                    </div>
                    <div className="process-step">
                        <div className="step-number">04</div>
                        <h3>Global Delivery</h3>
                        <p>Climate-controlled logistics ensure it reaches you perfectly chilled.</p>
                    </div>
                </div>
            </div>



            <div className="certifications-section">
                <h2 className="section-title">Certified Excellence</h2>
                <div className="cert-grid">
                    <div className="cert-item">
                        <img src="/logos/fssai.png" alt="FSSAI" />
                        <span>FSSAI Certified</span>
                    </div>
                    <div className="cert-item">
                        <img src="/logos/isi.png" alt="ISI Mark" />
                        <span>ISI Mark (IS 14543)</span>
                    </div>
                    <div className="cert-item">
                        <img src="/logos/bis.png" alt="BIS" />
                        <span>BIS Standard</span>
                    </div>
                    <div className="cert-item">
                        <img src="/logos/haccp.png" alt="HACCP" />
                        <span>HACCP Certified</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
