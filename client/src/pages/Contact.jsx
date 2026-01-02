import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Linkedin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this to a backend
        alert('Thank you for reaching out to Aqua Vita. Our concierge will be in touch shortly.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <div className="contact-hero">
                <h1>Get in Touch</h1>
                <p>Allow us to curate your hydration experience.</p>
            </div>

            <div className="contact-content">
                {/* Left Column: Contact Info & Map */}
                <div className="contact-details">
                    <div className="detail-card">
                        <div className="icon-wrapper"><MapPin size={24} /></div>
                        <h3>Visit Our Boutique</h3>
                        <p>Aqua Vita Estate, GT Road<br />Near City Centre<br />Asansol, West Bengal 713301</p>
                    </div>

                    <div className="detail-card">
                        <div className="icon-wrapper"><Phone size={24} /></div>
                        <h3>Concierge</h3>
                        <p>+91 341 234 5678<br />concierge@aquavita.com</p>
                    </div>

                    <div className="detail-card">
                        <div className="icon-wrapper"><Clock size={24} /></div>
                        <h3>Boutique Hours</h3>
                        <p>Mon - Sat: 10:00 AM - 8:00 PM<br />Sun: By Appointment</p>
                    </div>

                    <div className="social-links-container">
                        <h3>Follow Our Journey</h3>
                        <div className="social-links">
                            <a href="#" className="social-link"><Instagram size={20} /></a>
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                            <a href="#" className="social-link"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="contact-form-wrapper">
                    <div className="form-header">
                        <h2>Send a Message</h2>
                        <p>We'd love to hear from you.</p>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we assist you?"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Message <Send size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Map Section */}
            <div className="map-section">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117076.65668549372!2d86.90858172909062!3d23.683454199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71f0ea10221d9%3A0x627d351336c57f0!2sAsansol%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715432109876!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Aqua Vita Location"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
