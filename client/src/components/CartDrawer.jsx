import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    }

    return (
        <>
            <div
                className={`cart-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Your Collection</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-msg">
                            <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>Your collection is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={`${item._id}-${item.size}`} className="cart-item">
                                <img src={item.image || 'https://via.placeholder.com/100?text=Water'} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <span className="item-size">{item.size}</span>
                                    <span className="item-price">₹{item.price * item.quantity}</span>

                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.size, -1)}
                                            className="qty-btn"
                                        >
                                            -
                                        </button>
                                        <span className="qty-display">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.size, 1)}
                                            className="qty-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item._id, item.size)}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-subtotal">
                        <span>Subtotal</span>
                        <span>₹{total}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
