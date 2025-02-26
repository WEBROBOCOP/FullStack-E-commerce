import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const FavoriteContext = createContext();

// Create the provider component
export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('favorites');
        return localData ? new Set(JSON.parse(localData)) : new Set();
    });

    // Update localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify([...favorites]));
    }, [favorites]);

    // Toggle favorite status
    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    // Check if an item is favorited
    const isFavorite = (productId) => {
        return favorites.has(productId);
    };

    // Get all favorites
    const getFavorites = () => {
        return [...favorites];
    };

    // Clear all favorites
    const clearFavorites = () => {
        setFavorites(new Set());
    };

    // Context value
    const value = {
        favorites,
        toggleFavorite,
        isFavorite,
        getFavorites,
        clearFavorites
    };

    return (
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    );
};

// Custom hook for using the favorite context
export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }
    return context;
};