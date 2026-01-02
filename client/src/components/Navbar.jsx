import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Droplets, User, Menu, X } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ cartCount, onCartClick }) => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand group" onClick={closeMenu}>
                <div className="brand-icon">
                    <Droplets size={24} />
                </div>
                <span className="brand-name">
                    Aqua <span>Vita</span>
                </span>
            </Link>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-only-header">
                    <span className="brand-name">Aqua <span>Vita</span></span>
                </div>
                <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/shop" className="nav-link" onClick={closeMenu}>Shop</Link></li>
                <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
            </ul>

            <div className="nav-actions">
                <Link
                    to={isAuthenticated ? "/profile" : "/login"}
                    className="profile-btn"
                    title={isAuthenticated ? "My Profile" : "Login / Register"}
                    onClick={closeMenu}
                >
                    <User size={24} />
                </Link>

                <button type="button" className="cart-btn" onClick={onCartClick}>
                    <ShoppingBag size={24} />
                    {cartCount > 0 && (
                        <div className="cart-badge">
                            {cartCount}
                        </div>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
