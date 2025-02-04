import React, { useState, useEffect } from "react";
import "./Restaurants.css"; // External CSS for styling

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCuisine, setSelectedCuisine] = useState("");
    const [selectedCost, setSelectedCost] = useState("");
    const restaurantsPerPage = 12;

    useEffect(() => {
        fetch("http://localhost:5000/restaurants")
            .then((response) => response.json())
            .then((data) => setRestaurants(data))
            .catch((error) => console.error("Error fetching restaurants:", error));
    }, []);

    // Get unique values for filters
    const uniqueCities = [...new Set(restaurants.map((r) => r.City))];
    const uniqueCuisines = [...new Set(restaurants.map((r) => r.Cuisines))];
    const uniqueCosts = [...new Set(restaurants.map((r) => r["Average Cost for two"]))];

    // Filter restaurants based on search & dropdown selections
    const filteredRestaurants = restaurants.filter((restaurant) => {
        return (
            restaurant["Restaurant Name"].toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCity ? restaurant.City === selectedCity : true) &&
            (selectedCuisine ? restaurant.Cuisines === selectedCuisine : true) &&
            (selectedCost ? restaurant["Average Cost for two"] === selectedCost : true)
        );
    });

    // Pagination Logic
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
    const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

    return (
        <div className="restaurants-container">
            {/* Search & Filter Section */}
            <div className="filters-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by restaurant name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="filter-dropdown" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">All Cities</option>
                    {uniqueCities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
                <select className="filter-dropdown" value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
                    <option value="">All Cuisines</option>
                    {uniqueCuisines.map((cuisine, index) => (
                        <option key={index} value={cuisine}>{cuisine}</option>
                    ))}
                </select>
                <select className="filter-dropdown" value={selectedCost} onChange={(e) => setSelectedCost(e.target.value)}>
                    <option value="">All Costs</option>
                    {uniqueCosts.map((cost, index) => (
                        <option key={index} value={cost}>{cost}</option>
                    ))}
                </select>
            </div>

            {/* Restaurant List */}
            <div className="restaurants-grid">
                {currentRestaurants.map((restaurant) => (
                    <a key={restaurant["Restaurant ID"]} href={`/restaurant/${restaurant["Restaurant ID"]}`} style={{ textDecoration: "none" }}>
                        <div className="restaurant-card">
                            <h2 className="restaurant-name">{restaurant["Restaurant Name"]}</h2>
                            <p className="restaurant-city"><strong>City:</strong> {restaurant.City}</p>
                            <p className="restaurant-cuisine"><strong>Cuisines:</strong> {restaurant.Cuisines}</p>
                            <p className="restaurant-cost"><strong>Average Cost for Two:</strong> {restaurant["Average Cost for two"]}</p>
                            <p className="restaurant-rating"><strong>Rating:</strong> {restaurant["Rating text"]}</p>
                            <p className="restaurant-votes"><strong>Votes:</strong> {restaurant.Votes}</p>
                        </div>
                    </a>
                ))}
            </div>

            {/* Pagination Controls */}
            {filteredRestaurants.length > 0 && (
                <div className="pagination">
                    <button 
                        className="pagination-btn" 
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="pagination-info">Page {currentPage} of {totalPages}</span>
                    <button 
                        className="pagination-btn" 
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Restaurants;
