import React from 'react';
import './Policies.css';

const Shipping = () => {
    return (
        <div className="policy-page">
            <div className="policy-container">
                <h1 className="policy-title">Shipping & Delivery</h1>
                <div className="policy-content">
                    <section>
                        <h2>White-Glove Service</h2>
                        <p>
                            We don't just drop off boxes; we deliver an experience. Our uniformed delivery personnel ensure that your Aqua Vita cases are placed exactly where you want them in your home or office.
                        </p>
                    </section>

                    <section>
                        <h2>Delivery Areas</h2>
                        <p>
                            We currently serve select metropolitan areas to maintain our high service standards. Please check your pincode at checkout to see if you are within our service zone.
                        </p>
                    </section>

                    <section>
                        <h2>Timelines</h2>
                        <p>
                            <strong>Standard Delivery:</strong> 2-3 business days.<br />
                            <strong>Expedited Delivery:</strong> Same-day delivery for orders placed before 12 PM.<br />
                            <strong>Subscription:</strong> Automatically scheduled according to your preferences.
                        </p>
                    </section>

                    <section>
                        <h2>Handling & Care</h2>
                        <p>
                            Our glass bottles are heavy and fragile. They are transported in climate-controlled vehicles to ensure they reach you perfectly chilled and pristine.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
