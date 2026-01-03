import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import API_URL from '../config';
import { useToast } from '../context/ToastContext';
import './Profile.css';
import { User, Package, Settings, CreditCard, Heart, LogOut, ChevronRight, LayoutDashboard, Trash2, Edit } from 'lucide-react';

const Profile = ({ addToCart }) => {
    const authContext = useContext(AuthContext);
    const { user, isAuthenticated, loading, logout, loadUser } = authContext; // Ensure loadUser is available
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('info'); // info, orders, addresses

    // Edit Modes
    const [editInfo, setEditInfo] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userGender: '',
        mobile: ''
    });

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    // Address States
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        addressType: 'Home'
    });

    // Payment States
    const [showCardForm, setShowCardForm] = useState(false);
    const [newCard, setNewCard] = useState({ cardNumber: '', holderName: '', expiry: '', cardType: 'Visa' });

    const [showUpiForm, setShowUpiForm] = useState(false);
    const [newUpi, setNewUpi] = useState({ vpa: '', bankName: '' });

    const [showGiftCardForm, setShowGiftCardForm] = useState(false);
    const [newGiftCard, setNewGiftCard] = useState({ code: '', pin: '' });

    // Handlers for Payments
    const handleSaveCard = async () => {
        if (!newCard.cardNumber || !newCard.holderName || !newCard.expiry) {
            showToast('Please fill all card details', 'error');
            return;
        }
        const currentCards = user.savedCards || [];
        const updatedCards = [...currentCards, newCard];
        const success = await handleUpdateProfile({ savedCards: updatedCards });
        if (success) {
            setShowCardForm(false);
            setNewCard({ cardNumber: '', holderName: '', expiry: '', cardType: 'Visa' });
            showToast('Card Saved Successfully', 'success');
        }
    };

    const handleDeleteCard = async (index) => {
        if (window.confirm('Delete this card?')) {
            const updatedCards = user.savedCards.filter((_, i) => i !== index);
            await handleUpdateProfile({ savedCards: updatedCards });
        }
    };

    const handleSaveUpi = async () => {
        if (!newUpi.vpa) {
            showToast('Please enter VPA', 'error');
            return;
        }
        const currentUpi = user.upiIds || [];
        const updatedUpi = [...currentUpi, newUpi];
        const success = await handleUpdateProfile({ upiIds: updatedUpi });
        if (success) {
            setShowUpiForm(false);
            setNewUpi({ vpa: '', bankName: '' });
            setNewUpi({ vpa: '', bankName: '' });
            showToast('UPI Saved Successfully', 'success');
        }
    };

    const handleDeleteUpi = async (index) => {
        if (window.confirm('Delete this UPI ID?')) {
            const updatedUpi = user.upiIds.filter((_, i) => i !== index);
            await handleUpdateProfile({ upiIds: updatedUpi });
        }
    };

    const handleSaveGiftCard = async () => {
        if (!newGiftCard.code || !newGiftCard.pin) {
            showToast('Please enter Gift Card Number and PIN', 'error');
            return;
        }
        const currentGiftCards = user.giftCards || [];
        const updatedGiftCards = [...currentGiftCards, { ...newGiftCard, balance: 0, expiry: new Date() }]; // Mock balance/expiry
        const success = await handleUpdateProfile({ giftCards: updatedGiftCards });
        if (success) {
            setShowGiftCardForm(false);
            setNewGiftCard({ code: '', pin: '' });
            setNewGiftCard({ code: '', pin: '' });
            showToast('Gift Card Added Successfully', 'success');
        }
    };

    const handleDeleteGiftCard = async (index) => {
        if (window.confirm('Remove this Gift Card?')) {
            const updatedGiftCards = user.giftCards.filter((_, i) => i !== index);
            await handleUpdateProfile({ giftCards: updatedGiftCards });
        }
    };

    const [editingAddressIndex, setEditingAddressIndex] = useState(-1);




    // Initial Data Load
    useEffect(() => {
        if (user) {
            const names = user.name ? user.name.split(' ') : ['', ''];
            setFormData({
                firstName: names[0] || '',
                lastName: names[1] || '',
                userGender: user.gender || '',
                mobile: user.mobile || ''
            });
        }
    }, [user]);

    // If auth failed, redirect immediately
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Fetch Orders when tab changes
    useEffect(() => {
        if (activeTab === 'orders' && isAuthenticated) {
            fetchOrders();
        }
    }, [activeTab, isAuthenticated]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const res = await fetch(`${API_URL}/orders`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            const data = await res.json();
            if (res.ok) {
                setOrders(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleUpdateProfile = async (updatedFields = {}) => {
        try {
            // Merge current form data with specific updates (e.g. adding address)
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                mobile: formData.mobile,
                gender: formData.userGender,
                ...updatedFields // Allow overriding/adding fields like addresses
            };

            const res = await fetch(`${API_URL}/auth/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                await loadUser(); // Reload global state
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const handleSaveProfileInfo = async () => {
        const success = await handleUpdateProfile();
        if (success) {
            setEditInfo(false);
            showToast('Profile Updated Successfully', 'success');
        } else {
            showToast('Failed to update profile', 'error');
        }
    };

    const handleEditAddress = (addr, index) => {
        setNewAddress(addr);
        setEditingAddressIndex(index);
        setShowAddressForm(true);
    };

    const handleSaveAddress = async () => {
        if (!newAddress.name || !newAddress.mobile || !newAddress.pincode || !newAddress.address) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        let updatedAddresses = [...(user.addresses || [])];

        if (editingAddressIndex >= 0) {
            // Update existing
            updatedAddresses[editingAddressIndex] = newAddress;
        } else {
            // Add new
            updatedAddresses.push(newAddress);
        }

        const success = await handleUpdateProfile({ addresses: updatedAddresses });
        if (success) {
            setShowAddressForm(false);
            setEditingAddressIndex(-1);
            setNewAddress({
                name: '', mobile: '', pincode: '', locality: '', address: '', city: '', state: '', addressType: 'Home'
            });
            showToast(editingAddressIndex >= 0 ? 'Address Updated Successfully' : 'Address Saved Successfully', 'success');
        } else {
            showToast('Failed to save address', 'error');
        }
    };

    const handleCancelAddress = () => {
        setShowAddressForm(false);
        setEditingAddressIndex(-1);
        setNewAddress({
            name: '', mobile: '', pincode: '', locality: '', address: '', city: '', state: '', addressType: 'Home'
        });
    };

    const handleDeleteAddress = async (index) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            const currentAddresses = user.addresses || [];
            const updatedAddresses = currentAddresses.filter((_, i) => i !== index);

            const success = await handleUpdateProfile({ addresses: updatedAddresses });
            if (success) {
                showToast('Address Deleted Successfully', 'info');
            } else {
                showToast('Failed to delete address', 'error');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading || !user) {
        return (
            <div className="profile-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: '20px' }}>
                <div className="loading-spinner" style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid #2874f0',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <div style={{ fontSize: '18px', fontWeight: '500' }}>Loading Dashboard...</div>
                <div style={{ color: '#666', fontSize: '14px', textAlign: 'center', maxWidth: '300px' }}>
                    Connecting to server. If this takes longer than 30s, the server might be waking up (Free Tier).
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    const renderMainContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">Personal Information</h2>
                            {editInfo ? (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="edit-btn" onClick={handleSaveProfileInfo}>Save</button>
                                    <button className="edit-btn" style={{ color: '#878787' }} onClick={() => setEditInfo(false)}>Cancel</button>
                                </div>
                            ) : (
                                <button className="edit-btn" onClick={() => setEditInfo(true)}>Edit</button>
                            )}
                        </div>

                        <div className="info-section">
                            <div className="input-row">
                                <div className="input-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        disabled={!editInfo}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        disabled={!editInfo}
                                    />
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>Your Gender</h3>
                                <div style={{ display: 'flex', gap: '24px' }}>
                                    <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: editInfo ? 'pointer' : 'default' }}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={formData.userGender === 'Male'}
                                            onChange={() => setFormData({ ...formData, userGender: 'Male' })}
                                            disabled={!editInfo}
                                        /> Male
                                    </label>
                                    <label style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: editInfo ? 'pointer' : 'default' }}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={formData.userGender === 'Female'}
                                            onChange={() => setFormData({ ...formData, userGender: 'Female' })}
                                            disabled={!editInfo}
                                        /> Female
                                    </label>
                                </div>
                            </div>

                            <div className="main-header" style={{ marginTop: '40px' }}>
                                <h2 className="main-title">Email Address</h2>
                            </div>
                            <div className="input-row">
                                <div className="input-group" style={{ maxWidth: '400px' }}>
                                    <label>Email Address</label>
                                    <input type="email" value={user.email} disabled />
                                </div>
                            </div>

                            <div className="main-header" style={{ marginTop: '40px' }}>
                                <h2 className="main-title">Mobile Number</h2>
                                {!editInfo && <button className="edit-btn" onClick={() => setEditInfo(true)}>Edit</button>}
                            </div>
                            <div className="input-row">
                                <div className="input-group" style={{ maxWidth: '400px' }}>
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        placeholder="Add Mobile Number"
                                        disabled={!editInfo}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'orders':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">My Orders</h2>
                        </div>
                        {ordersLoading ? (
                            <div>Loading Orders...</div>
                        ) : orders.length > 0 ? (
                            <div className="orders-list">
                                {orders.map(order => (
                                    <div key={order._id} style={{ border: '1px solid #f0f0f0', padding: '16px', marginBottom: '16px', borderRadius: '4px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ fontWeight: '600' }}>Order #{order._id.slice(-6)}</span>
                                            <span style={{ color: order.status === 'Delivered' ? 'green' : '#2874f0' }}>{order.status}</span>
                                        </div>
                                        <div>Total: ₹{order.totalAmount}</div>
                                        <div style={{ fontSize: '12px', color: '#878787' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders-placeholder">
                                <Package size={48} color="#e0e0e0" />
                                <p>You haven't placed any orders yet.</p>
                                <button className="edit-btn" onClick={() => navigate('/shop')} style={{ fontSize: '16px' }}>Start Shopping</button>
                            </div>
                        )}
                    </>
                );
            case 'addresses':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">Manage Addresses</h2>
                            {!showAddressForm && (
                                <button className="edit-btn" style={{ border: '1px solid #2874f0', padding: '8px 16px', borderRadius: '2px' }} onClick={() => {
                                    setEditingAddressIndex(-1);
                                    setNewAddress({ name: '', mobile: '', pincode: '', locality: '', address: '', city: '', state: '', addressType: 'Home' });
                                    setShowAddressForm(true);
                                }}>+ Add A New Address</button>
                            )}
                        </div>

                        {showAddressForm ? (
                            <div className="info-section" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px' }}>
                                <h3>{editingAddressIndex >= 0 ? 'Edit Address' : 'Add New Address'}</h3>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Name</label>
                                        <input type="text" value={newAddress.name} onChange={e => setNewAddress({ ...newAddress, name: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>10-digit mobile number</label>
                                        <input type="text" value={newAddress.mobile} onChange={e => setNewAddress({ ...newAddress, mobile: e.target.value })} />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Pincode</label>
                                        <input type="text" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Locality</label>
                                        <input type="text" value={newAddress.locality} onChange={e => setNewAddress({ ...newAddress, locality: e.target.value })} />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>City/District/Town</label>
                                        <input type="text" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>State</label>
                                        <input type="text" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} />
                                    </div>
                                </div>
                                <div className="input-group" style={{ marginBottom: '24px' }}>
                                    <label>Address (Area and Street)</label>
                                    <input type="text" value={newAddress.address} onChange={e => setNewAddress({ ...newAddress, address: e.target.value })} style={{ width: '100%' }} />
                                </div>

                                <div className="input-group" style={{ marginBottom: '24px' }}>
                                    <label>Address Type</label>
                                    <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <input type="radio" name="addressType" checked={newAddress.addressType === 'Home'} onChange={() => setNewAddress({ ...newAddress, addressType: 'Home' })} />
                                            Home
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <input type="radio" name="addressType" checked={newAddress.addressType === 'Work'} onChange={() => setNewAddress({ ...newAddress, addressType: 'Work' })} />
                                            Work
                                        </label>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="edit-btn" style={{ background: '#2874f0', color: 'white', padding: '10px 20px' }} onClick={handleSaveAddress}>Save</button>
                                    <button className="edit-btn" onClick={handleCancelAddress}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            user.addresses && user.addresses.length > 0 ? (
                                <div className="addresses-list">
                                    {user.addresses.map((addr, idx) => (
                                        <div key={idx} style={{ border: '1px solid #e0e0e0', padding: '16px', marginBottom: '16px', background: 'white' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ background: '#f0f0f0', padding: '2px 6px', fontSize: '10px', borderRadius: '2px', textTransform: 'uppercase', color: '#878787' }}>{addr.addressType || 'Home'}</span>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button className="edit-btn" style={{ fontSize: '12px', padding: 0, color: '#2874f0', display: 'flex', alignItems: 'center' }} onClick={() => handleEditAddress(addr, idx)}>
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="edit-btn" style={{ fontSize: '12px', padding: 0, color: 'red', display: 'flex', alignItems: 'center' }} onClick={() => handleDeleteAddress(idx)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px', margin: '10px 0', fontWeight: '600' }}>
                                                <span>{addr.name}</span>
                                                <span>{addr.mobile}</span>
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#212121' }}>
                                                {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <span style={{ fontWeight: '600' }}>{addr.pincode}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-orders-placeholder" style={{ height: '200px' }}>
                                    <p>No addresses found.</p>
                                </div>
                            )
                        )}
                    </>
                );
            case 'savedCards':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">Manage Saved Cards</h2>
                            {!showCardForm && (
                                <button className="toggle-add-btn" onClick={() => setShowCardForm(true)}>+ Add A New Card</button>
                            )}
                        </div>
                        {showCardForm ? (
                            <div className="elegant-form">
                                <h3>Add New Card</h3>
                                <div className="elegant-input-group" style={{ marginBottom: '16px' }}>
                                    <label>Card Number</label>
                                    <input className="elegant-input" type="text" value={newCard.cardNumber} onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })} placeholder="XXXX XXXX XXXX XXXX" />
                                </div>
                                <div className="input-row">
                                    <div className="elegant-input-group" style={{ flex: 1 }}>
                                        <label>Holder Name</label>
                                        <input className="elegant-input" type="text" value={newCard.holderName} onChange={(e) => setNewCard({ ...newCard, holderName: e.target.value })} placeholder="Name on Card" />
                                    </div>
                                    <div className="elegant-input-group" style={{ flex: 1 }}>
                                        <label>Expiry (MM/YY)</label>
                                        <input className="elegant-input" type="text" value={newCard.expiry} onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })} placeholder="MM/YY" />
                                    </div>
                                </div>
                                <div className="btn-group">
                                    <button className="btn-elegant-primary" onClick={handleSaveCard}>Save Card</button>
                                    <button className="btn-elegant-secondary" onClick={() => setShowCardForm(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            user.savedCards && user.savedCards.length > 0 ? (
                                <div>
                                    {user.savedCards.map((card, idx) => (
                                        <div key={idx} className="saved-item-card">
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <CreditCard size={24} color="#2874f0" />
                                                <div>
                                                    <div style={{ fontWeight: '600', color: '#212121', fontSize: '15px' }}>{card.cardType} **** {card.cardNumber.slice(-4)}</div>
                                                    <div style={{ fontSize: '13px', color: '#878787', marginTop: '4px' }}>{card.holderName} • Expires {card.expiry}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteCard(idx)} style={{ color: '#ff6161', border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }} title="Remove Card">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : <div className="no-orders-placeholder"><CreditCard size={48} color="#e0e0e0" /><p>No saved cards</p></div>
                        )}
                    </>
                );
            case 'upi':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">Manage UPI IDs</h2>
                            {!showUpiForm && (
                                <button className="toggle-add-btn" onClick={() => setShowUpiForm(true)}>+ Add New UPI</button>
                            )}
                        </div>
                        {showUpiForm ? (
                            <div className="elegant-form">
                                <h3>Add New UPI</h3>
                                <div className="elegant-input-group" style={{ marginBottom: '16px' }}>
                                    <label>Virtual Payment Address (VPA)</label>
                                    <input className="elegant-input" type="text" value={newUpi.vpa} onChange={(e) => setNewUpi({ ...newUpi, vpa: e.target.value })} placeholder="e.g. username@upi" />
                                </div>
                                <div className="elegant-input-group">
                                    <label>Bank Name (Optional)</label>
                                    <input className="elegant-input" type="text" value={newUpi.bankName} onChange={(e) => setNewUpi({ ...newUpi, bankName: e.target.value })} placeholder="e.g. SBI" />
                                </div>
                                <div className="btn-group">
                                    <button className="btn-elegant-primary" onClick={handleSaveUpi}>Save UPI</button>
                                    <button className="btn-elegant-secondary" onClick={() => setShowUpiForm(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            user.upiIds && user.upiIds.length > 0 ? (
                                <div>
                                    {user.upiIds.map((upi, idx) => (
                                        <div key={idx} className="saved-item-card">
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <div style={{ width: '40px', height: '40px', background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#2874f0' }}>UPI</div>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: '#212121', fontSize: '15px' }}>{upi.vpa}</div>
                                                    <div style={{ fontSize: '13px', color: '#878787', marginTop: '4px' }}>{upi.bankName}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteUpi(idx)} style={{ color: '#ff6161', border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }} title="Remove UPI">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : <div className="no-orders-placeholder"><p>No saved UPIs</p></div>
                        )}
                    </>
                );
            case 'giftCards':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">Gift Cards</h2>
                            {!showGiftCardForm && (
                                <button className="toggle-add-btn" onClick={() => setShowGiftCardForm(true)}>+ Add A Gift Card</button>
                            )}
                        </div>
                        {showGiftCardForm ? (
                            <div className="elegant-form">
                                <h3>Add Gift Card</h3>
                                <div className="elegant-input-group" style={{ marginBottom: '16px' }}>
                                    <label>Gift Card Number</label>
                                    <input className="elegant-input" type="text" value={newGiftCard.code} onChange={(e) => setNewGiftCard({ ...newGiftCard, code: e.target.value })} placeholder="Enter 16-digit Card Number" />
                                </div>
                                <div className="elegant-input-group">
                                    <label>Gift Card PIN (Password)</label>
                                    <input className="elegant-input" type="password" value={newGiftCard.pin} onChange={(e) => setNewGiftCard({ ...newGiftCard, pin: e.target.value })} placeholder="Enter PIN" />
                                </div>
                                <div className="btn-group">
                                    <button className="btn-elegant-primary" onClick={handleSaveGiftCard}>Add Gift Card</button>
                                    <button className="btn-elegant-secondary" onClick={() => setShowGiftCardForm(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            user.giftCards && user.giftCards.length > 0 ? (
                                <div>
                                    {user.giftCards.map((gc, idx) => (
                                        <div key={idx} className="saved-item-card">
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <div style={{ width: '40px', height: '26px', background: '#ffe11b', borderRadius: '4px', border: '1px solid #e0c200' }}></div>
                                                <div>
                                                    <div style={{ fontWeight: '600', color: '#212121', fontSize: '15px' }}>Gift Card ending in {gc.code.slice(-4)}</div>
                                                    <div style={{ fontSize: '13px', color: '#878787', marginTop: '4px' }}>Balance: ₹{gc.balance} • Exp: {new Date(gc.expiry).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteGiftCard(idx)} style={{ color: '#ff6161', border: 'none', background: 'none', cursor: 'pointer', padding: '8px' }} title="Remove Gift Card">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-orders-placeholder">
                                    <CreditCard size={48} color="#e0e0e0" />
                                    <p>You have 0 active Gift Cards</p>
                                </div>
                            )
                        )}
                    </>
                );
            case 'coupons':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">My Coupons</h2>
                        </div>
                        {user.coupons && user.coupons.length > 0 ? (
                            <div>
                                {user.coupons.map((coupon, idx) => (
                                    <div key={idx} className="saved-item-card">
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <div style={{ width: '40px', height: '40px', background: '#e0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0097a7' }}>%</div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#212121', fontSize: '15px' }}>{coupon.code}</div>
                                                <div style={{ fontSize: '13px', color: '#878787', marginTop: '4px' }}>{coupon.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders-placeholder">
                                <div style={{ fontSize: '48px' }}>🏷️</div>
                                <p>No Active Coupons</p>
                            </div>
                        )}
                    </>
                );
            case 'reviews':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">My Reviews & Ratings</h2>
                        </div>
                        {user.reviews && user.reviews.length > 0 ? (
                            <div>
                                {user.reviews.map((review, idx) => (
                                    <div key={idx} className="saved-item-card" style={{ display: 'block' }}>
                                        <div style={{ fontWeight: '600', color: '#212121', marginBottom: '8px' }}>{review.productName}</div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ background: '#388e3c', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{review.rating} ★</span>
                                            <span style={{ color: '#878787', fontSize: '12px' }}>{new Date(review.date).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#212121' }}>{review.comment}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders-placeholder">
                                <div style={{ fontSize: '48px' }}>⭐</div>
                                <p>No Reviews yet</p>
                            </div>
                        )}
                    </>
                );
            case 'notifications':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">All Notifications</h2>
                        </div>
                        {user.notifications && user.notifications.length > 0 ? (
                            <div>
                                {user.notifications.map((notif, idx) => (
                                    <div key={idx} className="saved-item-card" style={{ display: 'block', borderLeft: notif.isRead ? '1px solid #eee' : '4px solid #2874f0' }}>
                                        <div style={{ fontWeight: '600', color: '#212121', marginBottom: '4px' }}>{notif.title}</div>
                                        <div style={{ fontSize: '14px', color: '#555' }}>{notif.message}</div>
                                        <div style={{ fontSize: '12px', color: '#878787', marginTop: '8px' }}>{new Date(notif.date).toLocaleDateString()}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders-placeholder">
                                <div style={{ fontSize: '48px' }}>🔔</div>
                                <p>No New Notifications</p>
                            </div>
                        )}
                    </>
                );
            case 'wishlist':
                return (
                    <>
                        <div className="main-header">
                            <h2 className="main-title">My Wishlist</h2>
                        </div>
                        {user.wishlist && user.wishlist.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                                {user.wishlist.map((item, idx) => (
                                    <div key={idx} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                                        <img src={item.image || '/placeholder.png'} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '16px' }} />
                                        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>{item.name}</div>
                                        <div style={{ color: '#2874f0', fontWeight: '500' }}>₹{item.price}</div>
                                        <button
                                            onClick={() => addToCart({ _id: item.productId, name: item.name, price: item.price, image: item.image, size: 'Standard' })}
                                            className="edit-btn"
                                            style={{ marginTop: '10px', background: '#ff9f00', color: 'white', padding: '8px 16px', width: '100%', borderRadius: '4px' }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-orders-placeholder">
                                <Heart size={48} color="#e0e0e0" />
                                <p>Your Wishlist is Empty</p>
                            </div>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-content-wrapper">
                {/* Sidebar */}
                <aside className="profile-sidebar">
                    {/* Hello User Card */}
                    <div className="sidebar-card user-hello-card">
                        <div className="user-avatar-small"></div>
                        <div>
                            <div className="hello-text">Hello,</div>
                            <div className="user-name-large">{user.name}</div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="sidebar-card sidebar-nav-container">

                        <div className="nav-section">
                            <div className="nav-header">
                                <LayoutDashboard size={18} />
                                <span>MY ORDERS</span>
                            </div>
                            <div className="nav-items">
                                <div className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                                    My Orders
                                </div>
                            </div>
                        </div>

                        <div className="nav-section">
                            <div className="nav-header active">
                                <User size={18} />
                                <span>ACCOUNT SETTINGS</span>
                            </div>
                            <div className="nav-items">
                                <div className={`nav-item ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                                    Profile Information
                                </div>
                                <div className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`} onClick={() => setActiveTab('addresses')}>
                                    Manage Addresses
                                </div>
                            </div>
                        </div>

                        <div className="nav-section">
                            <div className="nav-header">
                                <CreditCard size={18} style={{ color: '#878787' }} />
                                <span style={{ color: '#878787' }}>PAYMENTS</span>
                            </div>
                            <div className="nav-items">
                                <div className={`nav-item ${activeTab === 'giftCards' ? 'active' : ''}`} onClick={() => setActiveTab('giftCards')}>Gift Cards</div>
                                <div className={`nav-item ${activeTab === 'upi' ? 'active' : ''}`} onClick={() => setActiveTab('upi')}>Saved UPI</div>
                                <div className={`nav-item ${activeTab === 'savedCards' ? 'active' : ''}`} onClick={() => setActiveTab('savedCards')}>Saved Cards</div>
                            </div>
                        </div>

                        <div className="nav-section">
                            <div className="nav-header">
                                <Heart size={18} style={{ color: '#878787' }} />
                                <span style={{ color: '#878787' }}>MY STUFF</span>
                            </div>
                            <div className="nav-items">
                                <div className={`nav-item ${activeTab === 'coupons' ? 'active' : ''}`} onClick={() => setActiveTab('coupons')}>My Coupons</div>
                                <div className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>My Reviews & Ratings</div>
                                <div className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>All Notifications</div>
                                <div className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>My Wishlist</div>
                            </div>
                        </div>

                        <div className="nav-section">
                            <button className="logout-btn-sidebar" onClick={handleLogout}>
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="profile-main-area">
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
};

export default Profile;
