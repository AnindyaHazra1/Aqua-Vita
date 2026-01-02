import React, { useEffect, useState, useContext } from 'react';
import { Plus, Heart } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import './Shop.css';

const Shop = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, loadUser, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        // Fetch products from the backend
        fetch('http://localhost:5000/api/products')
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
            alert('Please login to add items to wishlist');
            return;
        }

        const currentWishlist = user.wishlist || [];
        const isWishlisted = currentWishlist.some(item => item.productId === product._id);
        let updatedWishlist;

        if (isWishlisted) {
            // Remove from wishlist
            updatedWishlist = currentWishlist.filter(item => item.productId !== product._id);
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
            const res = await fetch('http://localhost:5000/api/auth/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ wishlist: updatedWishlist })
            });

            if (res.ok) {
                loadUser(); // Refresh user state to reflect changes
            } else {
                alert('Failed to update wishlist');
            }
        } catch (err) {
            console.error('Error updating wishlist:', err);
        }
    };

    if (loading) {
        return (
            <div className="shop-container">
                <div className="section-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <p>Loading premium collection...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="shop-container">
                <div className="section-container" style={{ textAlign: 'center', marginTop: '4rem', color: 'red' }}>
                    <p>{error}</p>
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
