import React from 'react';
import './Policies.css';

const Returns = () => {
    return (
        <div className="policy-page">
            <div className="policy-container">
                <h1 className="policy-title">Returns & Refunds</h1>
                <div className="policy-content">
                    <section>
                        <h2>Our Guarantee</h2>
                        <p>
                            We stand behind the purity and quality of our water. If you are not completely satisfied with your experience, we want to make it right.
                        </p>
                    </section>

                    <section>
                        <h2>Return Eligibility</h2>
                        <p>
                            Due to the nature of our product (consumable food/beverage), we cannot accept returns of opened bottles. However, we accept returns for:
                        </p>
                        <ul>
                            <li>Unopened, original packaging cases within 7 days of delivery.</li>
                            <li>Damaged or broken bottles upon arrival (photo proof required).</li>
                            <li>Incorrect incorrect items delivered.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Refund Process</h2>
                        <p>
                            Once your return is received and inspected (or damage proof verified), we will initiate a refund to your original payment method. Please allow 5-7 business days for the credit to appear.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>
                            To initiate a return or report an issue, please contact our concierge team at support@aquavita.com or call us at +91 98765 43210.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Returns;
