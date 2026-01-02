import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Droplet, Truck, ShieldCheck, Wine, Sparkles, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-video-container">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src="/images/hero_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title reveal-up active">
                        Nature’s <br />
                        <span>Masterpiece.</span>
                    </h1>
                    <p className="hero-subtitle reveal-up active delay-100">
                        Sourced from the pristine glacial lakes of the Himalayas.
                        Aqua Vita isn't just water; it's an experience.
                    </p>
                    <Link to="/shop" className="btn-primary reveal-up active delay-200">
                        Experience Luxury
                    </Link>
                </div>
            </section>

            <section className="features-section">
                <div className="section-container">
                    <h2 className="section-title">The Essence of Life</h2>

                    <div className="feature-row">
                        <div className="feature-image">
                            <img src="/images/feature_purity.png" alt="Glacial Stream" />
                        </div>
                        <div className="feature-text">
                            <div className="feature-icon-wrapper">
                                <Droplet size={28} />
                            </div>
                            <h3 className="feature-title">Untouched Purity</h3>
                            <p className="feature-desc">
                                Sourced directly from ancient glacial springs in the Himalayas.
                                Our water travels through layers of mineral-rich rock, naturally filtering
                                impurities and enriching every drop with essential electrolytes.
                            </p>
                        </div>
                    </div>

                    <div className="feature-row reverse">
                        <div className="feature-image">
                            <img src="/images/feature_delivery.png" alt="Doorstep Delivery" />
                        </div>
                        <div className="feature-text">
                            <div className="feature-icon-wrapper">
                                <Truck size={28} />
                            </div>
                            <h3 className="feature-title">Effortless Hydration</h3>
                            <p className="feature-desc">
                                Never worry about running out. Our premium doorstep delivery service
                                ensures you have fresh, crisp water whenever you need it.
                                Flexible scheduling designed around your lifestyle.
                            </p>
                        </div>
                    </div>

                    <div className="feature-row">
                        <div className="feature-image">
                            <img src="/images/feature_quality.png" alt="Premium Glass Bottle" />
                        </div>
                        <div className="feature-text">
                            <div className="feature-icon-wrapper">
                                <Award size={28} />
                            </div>
                            <h3 className="feature-title">Uncompromised Quality</h3>
                            <p className="feature-desc">
                                We bottle exclusively in high-grade, sustainable glass to preserve
                                the water's natural taste and temperature. No plastic aftertaste,
                                just pure, refreshing hydration as nature intended.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-us-section">
                <div className="section-container">
                    <h2 className="section-title">The Aqua Vita Distinction</h2>
                    <p className="section-subtitle">Why connoisseurs choose us over the rest.</p>

                    <div className="why-us-grid">
                        <div className="why-us-card">
                            <div className="icon-box">
                                <ShieldCheck size={32} />
                            </div>
                            <h3>Glacial Purity</h3>
                            <p className="benefit">Untouched for centuries</p>
                            <p className="comparison">vs. Treated municipal water</p>
                        </div>

                        <div className="why-us-card">
                            <div className="icon-box">
                                <Wine size={32} />
                            </div>
                            <h3>100% Glass</h3>
                            <p className="benefit">Pure taste, zero leaching</p>
                            <p className="comparison">vs. Plastic chemical aftertaste</p>
                        </div>

                        <div className="why-us-card">
                            <div className="icon-box">
                                <Sparkles size={32} />
                            </div>
                            <h3>Naturally Alkaline</h3>
                            <p className="benefit">pH 8.2 from volcanic rock</p>
                            <p className="comparison">vs. Artificially added minerals</p>
                        </div>

                        <div className="why-us-card">
                            <div className="icon-box">
                                <Clock size={32} />
                            </div>
                            <h3>White-Glove Service</h3>
                            <p className="benefit">Scheduled doorstep delivery</p>
                            <p className="comparison">vs. Uncertain delivery windows</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="impact-section">
                <div className="section-container">
                    <h2 className="section-title">Our Impact</h2>
                    <div className="impact-grid">
                        <div className="impact-item">
                            <span className="impact-number">50k+</span>
                            <span className="impact-label">Plastic Bottles Saved</span>
                        </div>
                        <div className="impact-item">
                            <span className="impact-number">100%</span>
                            <span className="impact-label">Recyclable Glass</span>
                        </div>
                        <div className="impact-item">
                            <span className="impact-number">12</span>
                            <span className="impact-label">Springs Protected</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="newsletter-content">
                    <h2>Join the Inner Circle</h2>
                    <p>Receive exclusive hydration tips, early access to limited editions, and invitations to our events.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your Email Address" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </section>
        </div >
    );
};

export default Home;
