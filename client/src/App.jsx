import { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import FAQ from './pages/FAQ'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'
import ChatBot from './components/ChatBot'
import AuthContext, { AuthProvider } from './context/AuthContext'
import './App.css'
import './Premium.css'

function AppContent() {
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { user, isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    // Close cart when route changes
    useEffect(() => {
        setIsCartOpen(false);
    }, [location]);

    // Initialize cart from database when user logs in
    useEffect(() => {
        if (isAuthenticated && user && user.cart) {
            if (user.cart.length > 0) {
                // Transform productId back to _id for frontend use
                const mappedCart = user.cart.map(item => ({
                    ...item,
                    _id: item.productId // Map backend productId to frontend _id
                }));
                setCart(mappedCart);
            }
        }
    }, [isAuthenticated, user]); // Run when auth state changes

    // Save cart to database whenever it changes
    useEffect(() => {
        if (isAuthenticated) {
            const saveCart = async () => {
                try {
                    // Transform _id to productId and sanitise fields for backend storage
                    const cartToSave = cart.map(item => ({
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        size: item.size,
                        quantity: item.quantity
                    }));

                    console.log('Saving cart to DB:', cartToSave);

                    await fetch('http://localhost:5000/api/auth/update', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('token')
                        },
                        body: JSON.stringify({ cart: cartToSave })
                    });
                } catch (err) {
                    console.error("Failed to save cart", err);
                }
            };
            // Debounce could be good, but for now direct save is okay for low traffic
            saveCart();
        }
    }, [cart, isAuthenticated]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id && item.size === product.size)
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === product._id && item.size === product.size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const updateQuantity = (productId, size, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item._id === productId && item.size === size) {
                    const newQuantity = Math.max(0, item.quantity + delta)
                    return { ...item, quantity: newQuantity }
                }
                return item
            }).filter(item => item.quantity > 0)
        })
    }

    const removeFromCart = (productId, size) => {
        setCart(prevCart => prevCart.filter(item => !(item._id === productId && item.size === size)))
    }

    const clearCart = () => {
        setCart([]);
    }

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className="app-container">
            <div className="film-grain"></div>
            <Navbar
                cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                onCartClick={toggleCart}
            />
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop addToCart={addToCart} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile addToCart={addToCart} />} />
                <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
            </Routes>
            <Footer />
            <ChatBot />
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    )
}

export default App
