import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import './ChatBot.css';

// Defined outside component to avoid re-initialization
const KNOWLEDGE_BASE = [
    {
        id: 'buy',
        keywords: ['buy', 'order', 'purchase', 'shop', 'get', 'cost', 'price', 'rate'],
        priority: 10,
        handler: (text) => {
            if (text.includes('where')) return "You can purchase Aqua Vita directly from our 'Shop Collection' page. We deliver to your doorstep.";
            if (text.includes('price') || text.includes('cost') || text.includes('rate')) return "Our premium Alkaline Water starts at ₹120 for a 750ml glass bottle. We also offer subscription plans with exclusive savings.";
            return "You can order our premium water directly through the 'Shop' page. Simply select your preferred case size, and we'll handle the rest with our White-Glove delivery.";
        }
    },
    {
        id: 'competitors_mass',
        keywords: ['bisleri', 'aquafina', 'kinley', 'ro ', 'reverse osmosis', 'normal water', 'tap'],
        priority: 8,
        response: "Mass-market packaged water (like Bisleri/Aquafina) and RO water are typically processed 'dead water'—stripped of all minerals and then artificially remineralized. Aqua Vita is 'living water', 100% natural, untouched, and rich in bio-available minerals from the Himalayas."
    },
    {
        id: 'competitors_premium',
        keywords: ['evian', 'voss', 'perrier', 'fiji', 'smartwater'],
        priority: 8,
        response: "Those are excellent peers. Aqua Vita stands alongside them in global quality but offers a distinct advantage: we are sourced from the Himalayas, offering a unique mineral profile suited for our region, and bottled in sustainable glass, not plastic."
    },
    {
        id: 'shipping',
        keywords: ['shipping', 'delivery', 'deliver', 'track', 'arrive', 'long'],
        priority: 6,
        response: "We offer White-Glove delivery service. Standard delivery takes 2-3 business days. Same-day delivery is available in select metros for orders placed before 12 PM."
    },
    {
        id: 'health_safety',
        keywords: ['safe', 'baby', 'infant', 'kid', 'child', 'pregnant', 'pure', 'clean', 'filter', 'health', 'benefit', 'skin', 'beauty', 'digestion', 'acid', 'reflux', 'stomach', 'kidney'],
        priority: 7,
        handler: (text) => {
            if (text.includes('baby') || text.includes('infant')) return "Yes, Aqua Vita is distinctively pure and nitrate-free, making it safe for children. For infants under 6 months, consult your pediatrician.";
            if (text.includes('skin') || text.includes('beauty')) return "Rich in Silica (12mg/L), Aqua Vita supports skin elasticity and collagen production.";
            if (text.includes('kidney') || text.includes('minerals')) return "Aqua Vita has a balanced mineral profile (TDS 290). Patients with specific conditions should consult their doctor.";
            return "Our water is naturally alkaline (pH 8.2) and nitrate-free, making it 100% safe and beneficial for digestion, acidity, and overall wellness for all ages.";
        }
    },
    {
        id: 'technical',
        keywords: ['ph', 'tds', 'sodium', 'nitrate', 'alkaline', 'minerals', 'bpa'],
        priority: 9,
        handler: (text) => {
            if (text.includes('sodium')) return "Our water is low in sodium (<5mg/L), suitable for heart-healthy diets.";
            if (text.includes('tds')) return "Aqua Vita has a TDS of 290 mg/L—the perfect balance of taste and nutrition.";
            if (text.includes('nitrate')) return "We have negligible nitrate levels (<0.1 mg/L), indicating ultra-pure glacial sourcing.";
            return "Aqua Vita has a natural pH of 8.2 (Alkaline), TDS of 290 mg/L, and is completely free of BPAs, nitrates, and harsh chemicals.";
        }
    },
    {
        id: 'sustainability',
        keywords: ['bottle', 'glass', 'plastic', 'recycle', 'environment', 'planet'],
        priority: 5,
        response: "We are committed to a plastic-free future. We use only 100% premium grade glass bottles which are infinitely recyclable and preserve the water's integrity without leaching chemicals."
    },
    {
        id: 'small_talk',
        keywords: ['hi', 'hello', 'hey', 'who', 'thank', 'good morning', 'good evening', 'robot', 'ai'],
        priority: 1,
        handler: (text) => {
            if (text.includes('thank')) return "You're most welcome! Stay hydrated. 💧";
            return "Hello! I am your personal hydration concierge. I can assist with product details, health benefits, or order tracking.";
        }
    }
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Welcome to Aqua Vita Concierge. How may I assist you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const botResponse = generateResponse(userMessage);
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsTyping(false);
        }, 800);
    };

    const generateResponse = (text) => {
        const lowerText = text.toLowerCase();
        console.log("Analyzing:", lowerText);

        // Find matches
        const matches = KNOWLEDGE_BASE.filter(intent =>
            intent.keywords.some(keyword => lowerText.includes(keyword))
        );

        console.log("Matches:", matches);

        if (matches.length > 0) {
            // Sort by priority (descending)
            matches.sort((a, b) => b.priority - a.priority);

            const bestMatch = matches[0];

            if (bestMatch.handler) {
                return bestMatch.handler(lowerText);
            }
            return bestMatch.response;
        }

        return "That's a nuanced question. While I'm well-versed in our water's properties, for that specific inquiry, I'd recommend speaking to our Head Sommelier at support@aquavita.com.";
    };

    return (
        <div className="chatbot-wrapper">
            <button
                className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <div className="header-info">
                        <h3>Concierge</h3>
                        <span className="status-dot"></span>
                        <span className="status-text">Online</span>
                    </div>
                </div>

                <div className="chatbot-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.sender}`}>
                            <div className="message-content">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message bot typing">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chatbot-input" onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Type your question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
