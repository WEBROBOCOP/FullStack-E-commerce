import React, { useEffect, useState } from "react";
import Navbar from "../components/Navabar";
import Banner from "../components/Banner";
import { useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { MdShoppingBag } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai"; 

function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get("category") || "all"; 

    // State Variables
    const [dresses, setDresses] = useState([]); // Stores all fetched products
    const [filteredDresses, setFilteredDresses] = useState([]); // Shows results based on filters
    const [category, setCategory] = useState(initialCategory);
    const [priceSort, setPriceSort] = useState("default");
    const [wishlist, setWishlist] = useState([]); 

    // Fetch All Products 
    useEffect(() => {
        const fetchDresses = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
    
                // ✅ Filter clothing items only
                const clothingItems = data.filter(item => 
                    item.category === "men's clothing" || item.category === "women's clothing"
                );
    
                setDresses(clothingItems); // ✅ Store only clothing
                setFilteredDresses(clothingItems); // ✅ Show only clothing initially
    
                console.log("Fetched Clothing Products:", clothingItems);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchDresses();
    }, []);
    

    // Apply Filters Dynamically
    useEffect(() => {
        if (dresses.length === 0) return; // Prevent filtering before data is loaded

        let result = [...dresses]; // Start with all products

        // Filter by Category (Only filter if not "all")
        if (category !== "all") {
            result = result.filter(item => item.category === category);
        }

        // Apply price sorting
        if (priceSort !== "default") {
            result.sort((a, b) => {
                const priceA = parseFloat(a.price);
                const priceB = parseFloat(b.price);
                return priceSort === "low-to-high" ? priceA - priceB : priceB - priceA;
            });
        }

        console.log("Filtered Result:", result);
        setFilteredDresses(result);
    }, [category, priceSort]); // Only updates when filters change (not on initial load)

    // Handle Dropdown Changes
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePriceSort = (e) => {
        setPriceSort(e.target.value);
    };

    // Wishlist Toggle
    const toggleWishlist = (id) => {
        setWishlist((prevWishlist) =>
            prevWishlist.includes(id)
                ? prevWishlist.filter((itemId) => itemId !== id) // Remove if already liked
                : [...prevWishlist, id] // Add to wishlist
        );
    };

    // Helper Functions
    const truncateTitle = (title, wordLimit = 3) => {
        const words = title.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : title;
    };

    const truncateDescription = (description, wordLimit = 10) => {
        if (!description) return "";
        const words = description.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : description;
    };

    return (
        <div>
            <Banner />
            <div className="flex justify-center p-15">
                <div className="flex gap-6 items-center p-6 rounded-lg">
                    {/* Category Dropdown */}
                    <div className="relative w-48">
                        <select
                            id="sort"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="all">All</option>
                            <option value="men's clothing">Men</option>
                            <option value="women's clothing">Women</option>
                        </select>
                    </div>

                    {/* Price Sorting Dropdown */}
                    <div className="relative w-48">
                        <select
                            id="price"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={priceSort}
                            onChange={handlePriceSort}
                        >
                            <option value="default">Price</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {filteredDresses.length > 0 ? (
                    filteredDresses.map((dress) => (
                        <div
                            key={dress.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[420px]"
                        >
                            {/* Image + Heart Icon */}
                            <div className="relative group">
                                <img
                                    src={dress.image}
                                    alt={dress.title}
                                    className="w-full h-60 object-cover object-top rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"

                                />

                                {/* Heart Icon (Top Right) */}
                                <button
                                    className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
                                    onClick={() => toggleWishlist(dress.id)}
                                >
                                    {wishlist.includes(dress.id) ? (
                                        <AiFillHeart className="w-6 h-6 text-red-500" /> // Filled heart
                                    ) : (
                                        <CiHeart className="w-6 h-6 text-gray-600" /> // Outline heart
                                    )}
                                </button>
                            </div>

                            <div className="p-4 flex flex-col justify-between bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-[420px]">
                                {/* Card Product */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-lg text-gray-900">{truncateTitle(dress.title)}</h3>
                                        <span className="font-bold text-lg text-orange-600">€{dress.price}</span>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed truncate">{truncateDescription(dress.description, 5)}</p>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="mt-4">
                                    <button className="w-full bg-orange-500 text-white py-3 rounded-xl shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                                        <MdShoppingBag className="w-6 h-6" />
                                        <span className="text-md font-medium">Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products match your filters.</p>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
