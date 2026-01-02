import React, { useEffect, useState } from 'react';
import './BackgroundEffects.css';

const BackgroundEffects = () => {
    const [offset, setOffset] = useState(0);
    const [droplets, setDroplets] = useState([]);

    // Parallax Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Generate static random droplets on mount to avoid re-rendering flicker
    useEffect(() => {
        const newDroplets = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // 0-100% width
            size: Math.random() * 15 + 5, // 5-20px size
            duration: Math.random() * 15 + 10, // 10-25s animation duration
            delay: Math.random() * 20, // 0-20s delay
            parallaxSpeed: Math.random() * 0.5 + 0.1 // speed factor
        }));
        setDroplets(newDroplets);
    }, []);

    return (
        <div className="background-effects">
            {droplets.map((drop) => (
                <div
                    key={drop.id}
                    className="droplet"
                    style={{
                        left: `${drop.left}%`,
                        width: `${drop.size}px`,
                        height: `${drop.size}px`,
                        animationDuration: `${drop.duration}s`,
                        animationDelay: `-${drop.delay}s`, // Negative delay starts animation mid-cycle
                        transform: `translateY(${offset * drop.parallaxSpeed}px)` // Parallax shift
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundEffects;
