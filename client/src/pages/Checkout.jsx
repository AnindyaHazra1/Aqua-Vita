import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { MapPin, CreditCard, Gift, Truck, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Checkout.css';

const Checkout = ({ cart, clearCart }) => {
    const { user, isAuthenticated, loadUser } = useContext(AuthContext);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);

    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=checkout');
        } else if (!user) {
            loadUser();
        }
    }, [isAuthenticated, user, navigate, loadUser]);

    if (!user || !cart) return <div className="checkout-container">Loading...</div>;

    if (cart.length === 0) {
        return (
            <div className="checkout-container">
                <div className="checkout-wrapper" style={{ display: 'block', textAlign: 'center', paddingTop: '100px' }}>
                    <h2>Your cart is empty</h2>
                    <button className="place-order-btn" style={{ width: 'auto', padding: '1rem 3rem' }} onClick={() => navigate('/shop')}>
                        Go to Shop
                    </button>
                </div>
            </div>
        );
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500
    const total = subtotal + shipping;

    const handlePlaceOrder = () => {
        if (!user.addresses || user.addresses.length === 0) {
            showToast('Please add a delivery address first!', 'error');
            navigate('/profile');
            return;
        }
        // Show the restriction popup instead of placing order
        setShowErrorPopup(true);
    };

    return (
        <div className="checkout-container">
            {showErrorPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="popup-icon">⚠️</div>
                        <h3>Service Unavailable</h3>
                        <p>We are currently not ready to accept orders. Our premium delivery service is coming soon to your area.</p>
                        <button onClick={() => setShowErrorPopup(false)}>Understood</button>
                    </div>
                </div>
            )}
            <div className="checkout-wrapper">
                {/* Left Column */}
                <div className="checkout-main">
                    <h2>Checkout</h2>

                    {/* Address Section */}
                    <div className="checkout-section">
                        <div className="section-head">
                            <h3><MapPin size={20} style={{ marginRight: '8px', verticalAlign: '-3px' }} /> Delivery Address</h3>
                        </div>

                        {user.addresses && user.addresses.length > 0 ? (
                            <div className="address-grid">
                                {user.addresses.map((addr, idx) => (
                                    <div
                                        key={idx}
                                        className={`address-card ${selectedAddressIndex === idx ? 'selected' : ''}`}
                                        onClick={() => setSelectedAddressIndex(idx)}
                                    >
                                        <h4>{addr.name} <span style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '8px' }}>({addr.addressType})</span></h4>
                                        <p>{addr.address}, {addr.locality}</p>
                                        <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p>Phone: {addr.mobile}</p>
                                        {selectedAddressIndex === idx && <div className="check-icon"><CheckCircle size={16} color="#D4AF37" /></div>}
                                    </div>
                                ))}

                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <p style={{ marginBottom: '1rem', color: '#94A3B8' }}>No addresses found.</p>
                                <button className="place-order-btn" style={{ width: 'auto' }} onClick={() => navigate('/profile')}>
                                    Add Address
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Payment Section */}
                    <div className="checkout-section">
                        <div className="section-head">
                            <h3><CreditCard size={20} style={{ marginRight: '8px', verticalAlign: '-3px' }} /> Payment Method</h3>
                        </div>

                        <div
                            className={`payment-option ${selectedPaymentMethod === 'cod' ? 'selected' : ''}`}
                            onClick={() => setSelectedPaymentMethod('cod')}
                        >
                            <div className="radio-circle"></div>
                            <Truck size={24} color="#94A3B8" />
                            <div>
                                <h4 style={{ margin: 0, color: '#F8FAFC' }}>Cash on Delivery</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Pay when you receive the order</p>
                            </div>
                        </div>

                        {/* Placeholder for other methods */}
                        <div
                            className={`payment-option ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                            onClick={() => setSelectedPaymentMethod('card')}
                        >
                            <div className="radio-circle"></div>
                            <CreditCard size={24} color="#94A3B8" />
                            <div>
                                <h4 style={{ margin: 0, color: '#F8FAFC' }}>Saved Card</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Pay securely with your saved cards</p>
                            </div>
                        </div>

                        <div
                            className={`payment-option ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
                            onClick={() => setSelectedPaymentMethod('upi')}
                        >
                            <div className="radio-circle"></div>
                            <div style={{ fontWeight: 'bold', color: '#94A3B8', fontSize: '14px' }}>UPI</div>
                            <div>
                                <h4 style={{ margin: 0, color: '#F8FAFC' }}>UPI</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Google Pay, PhonePe, Paytm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Summary */}
                <div className="checkout-summary">
                    <h3>Order Summary</h3>

                    <div className="summary-items">
                        {cart.map((item, idx) => (
                            <div key={idx} className="summary-item">
                                <img src={item.image || '/placeholder.png'} alt={item.name} />
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p>Qty: {item.quantity} | {item.size}</p>
                                    <p style={{ color: '#D4AF37' }}>₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="price-breakdown">
                        <div className="price-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="price-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? <span style={{ color: '#4ade80' }}>Free</span> : `₹${shipping}`}</span>
                        </div>
                        <div className="price-row total">
                            <span>Total Amount</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button
                        className="place-order-btn"
                        onClick={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>

                    <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748B' }}>
                        <p>Secure Checkout powered by TechTitans</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
