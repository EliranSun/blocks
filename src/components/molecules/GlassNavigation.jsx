import { useState, useEffect } from 'react';

const GlassNavigation = ({ categories, selectedCategory, onCategoryChange }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const index = categories.findIndex(cat => cat.name === selectedCategory);
        setActiveIndex(index >= 0 ? index : 0);
    }, [selectedCategory, categories]);

    const handleCategoryClick = (category, index) => {
        setActiveIndex(index);
        onCategoryChange(category.name);
    };

    return (
        <div className="glass-navigation">
            <div className="glass-container">
                {categories.map((category, index) => (
                    <button
                        key={category.name}
                        onClick={() => handleCategoryClick(category, index)}
                        className={`glass-button ${index === activeIndex ? 'active' : ''}`}
                        style={{
                            '--button-index': index,
                            '--total-buttons': categories.length,
                        }}
                    >
                        <span className="glass-button-content">
                            {category.label}
                        </span>
                        <div className="glass-button-glow" />
                    </button>
                ))}

                {/* Floating active indicator */}
                <div
                    className="glass-active-indicator"
                    style={{
                        '--active-index': activeIndex,
                        '--total-buttons': categories.length,
                    }}
                />
            </div>
        </div>
    );
};

export default GlassNavigation;
