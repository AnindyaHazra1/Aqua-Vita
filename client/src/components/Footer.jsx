import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Instagram, Twitter, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column brand-col">
                    <div className="footer-brand">
                        <Droplets size={24} />
                        <span className="brand-name">Aqua <span>Vita</span></span>
                    </div>
                    <p className="footer-desc">
                        Elevating hydration to an art form.
                        Sourced from nature, bottled with perfection.
                    </p>
                </div>

                <div className="footer-column">
                    <h4>Explore</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop Collection</Link></li>
                        <li><Link to="/about">Our Story</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Support</h4>
                    <ul className="footer-links">
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/shipping">Shipping</Link></li>
                        <li><Link to="/returns">Returns</Link></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Connect</h4>
                    <div className="social-icons">
                        <a href="#" className="social-link"><Instagram size={20} /></a>
                        <a href="#" className="social-link"><Twitter size={20} /></a>
                        <a href="#" className="social-link"><Facebook size={20} /></a>
                    </div>
                    <p className="newsletter-text">Subscribe to our newsletter for exclusive offers.</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Aqua Vita. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
