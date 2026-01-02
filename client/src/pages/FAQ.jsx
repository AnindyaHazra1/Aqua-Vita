import React, { useState } from 'react';
import './Policies.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Where is Aqua Vita sourced from?",
            answer: "Aqua Vita is sourced directly from protected glacial springs in the Himalayas at an altitude of 12,000ft. It is naturally filtered through layers of mineral-rich volcanic rock."
        },
        {
            question: "Is the bottle 100% glass?",
            answer: "Yes. We use premium, high-grade glass to ensure zero chemical leaching and to preserve the natural taste and temperature of the water. Our bottles are 100% recyclable."
        },
        {
            question: "Do you offer subscription services?",
            answer: "Absolutely. You can subscribe to weekly or monthly deliveries to ensure you never run out of premium hydration. Our 'White-Glove' service caters to your schedule."
        },
        {
            question: "What is the pH level of Aqua Vita?",
            answer: "Our water has a natural alkaline pH of 8.2, achieved purely through geological filtration, without any artificial additives or ionization."
        },
        {
            question: "How do I manage my delivery schedule?",
            answer: "You can easily manage your delivery preferences, pause subscriptions, or change your address directly from your Profile dashboard."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="policy-page">
            <div className="policy-container">
                <h1 className="policy-title">Frequently Asked Questions</h1>
                <p className="policy-intro">Everything you need to know about the Aqua Vita experience.</p>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="toggle-icon">{openIndex === index ? '−' : '+'}</span>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
