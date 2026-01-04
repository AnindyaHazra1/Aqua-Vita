import React, { useEffect, useState, useContext } from 'react';
import { Plus, Heart } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API_URL from '../config';
import './Shop.css';
import '../components/Loader.css';

const Shop = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, loadUser, isAuthenticated } = useContext(AuthContext);
    const { showToast } = useToast();


    useEffect(() => {
        // Fetch products from the backend
        fetch(`${API_URL}/products`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setError("Unable to load products. Please check if the server is running.");
                setLoading(false);
            });
    }, []);

    const toggleWishlist = async (product) => {
        if (!isAuthenticated) {
            showToast('Please login to add items to wishlist', 'info');
            return;
        }

        const currentWishlist = user.wishlist || [];
        const isWishlisted = currentWishlist.some(item => item.productId === product._id);
        let updatedWishlist;

        if (isWishlisted) {
            // Remove from wishlist
            updatedWishlist = currentWishlist.filter(item => item.productId !== product._id);
            showToast('Removed from Wishlist', 'info');

        } else {
            // Add to wishlist
            updatedWishlist = [...currentWishlist, {
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image
            }];
        }

        try {
            const res = await fetch(`${API_URL}/auth/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ wishlist: updatedWishlist })
            });

            if (res.ok) {
                loadUser(); // Refresh user state to reflect changes
                if (!isWishlisted) showToast('Added to Wishlist', 'success');
            } else {
                showToast('Failed to update wishlist', 'error');
            }
        } catch (err) {
            console.error('Error updating wishlist:', err);
        }
    };

    if (loading) {
        return (
            <div className="shop-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div className="loader-container">
                    <div className="drop"></div>
                    <div className="wave"></div>
                </div>
                <div className="loading-text">Aqua Vita</div>
                <div className="loading-subtext">Curating the collection...</div>

                <svg className="goo-filter">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
            </div>
        );
    }

    if (error) {
        return (
            <div className="shop-container">
                <div className="section-container" style={{ textAlign: 'center', marginTop: '4rem', color: '#ff6b6b' }}>
                    <p style={{ fontSize: '1.2rem' }}>{error}</p>
                    <button className="btn-primary" onClick={() => window.location.reload()} style={{ marginTop: '1rem' }}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-container">
            <div className="shop-hero">
                <div className="shop-hero-content">
                    <h1 className="shop-title">The Collection</h1>
                    <p className="shop-subtitle">Curated hydration for the discerning palate.</p>
                </div>
            </div>

            <div className="section-container">
                <div className="products-showcase">
                    {products.map((product, index) => {
                        const isWishlisted = user && user.wishlist && user.wishlist.some(item => item.productId === product._id);
                        return (
                            <div key={product._id} className={`product-card ${index % 2 === 0 ? 'align-left' : 'align-right'}`}>
                                <div className="product-image-wrapper">
                                    <img
                                        src={product.image || 'https://via.placeholder.com/300?text=Water+Bottle'}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <button
                                        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                        onClick={() => toggleWishlist(product)}
                                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                                    >
                                        <Heart size={20} fill={isWishlisted ? "#ff4d4d" : "none"} />
                                    </button>
                                    <div className="product-overlay">
                                        <button
                                            className="quick-add-btn"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart <Plus size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="product-info">
                                    <span className="product-category">{product.category}</span>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-meta">
                                        <span className="product-size">{product.size}</span>
                                        <span className="product-price">₹{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Shop;
