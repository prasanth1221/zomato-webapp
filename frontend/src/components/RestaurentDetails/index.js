import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RestaurantDetails.css"; // External CSS

const RestaurantDetails = () => {
    const { id } = useParams(); // Get Restaurant ID from URL
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/restaurants/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurant(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching restaurant details:", error));
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!restaurant) {
        return <div className="error-message">Restaurant not found!</div>;
    }

    return (
        <div className="restaurant-details-container">
           <h1 className="restaurant-title">{restaurant["Restaurant Name"]}</h1>
<p className="restaurant-info"><strong>ID:</strong> {restaurant["Restaurant ID"]}</p>
<p className="restaurant-info"><strong>City:</strong> {restaurant.City}</p>
<p className="restaurant-info"><strong>Address:</strong> {restaurant.Address}</p>
<p className="restaurant-info"><strong>Cuisines:</strong> {restaurant.Cuisines}</p>
<p className="restaurant-info"><strong>Average Cost for Two:</strong> {restaurant["Average Cost for two"]} {restaurant.Currency}</p>
<p className="restaurant-info"><strong>Rating:</strong> {restaurant["Aggregate rating"]} ({restaurant["Rating text"]})</p>
<p className="restaurant-info"><strong>Votes:</strong> {restaurant.Votes}</p>
<p className="restaurant-info"><strong>Locality:</strong> {restaurant.Locality}</p>
<p className="restaurant-info"><strong>Locality Verbose:</strong> {restaurant["Locality Verbose"]}</p>
<p className="restaurant-info"><strong>Country:</strong> {restaurant["Country"]}</p>
<p className="restaurant-info"><strong>Has Online Delivery:</strong> {restaurant["Has Online delivery"] === 1 ? "Yes" : "No"}</p>
<p className="restaurant-info"><strong>Has Table Booking:</strong> {restaurant["Has Table booking"] === 1 ? "Yes" : "No"}</p>
<p className="restaurant-info"><strong>Delivery Available:</strong> {restaurant["Is delivering now"] === 1 ? "Yes" : "No"}</p>
<p className="restaurant-info"><strong>Price Range:</strong> {restaurant["Price range"]}</p>
<p className="restaurant-info"><strong>Rating Color:</strong> <span style={{ color: restaurant["Rating color"] }}>{restaurant["Rating color"]}</span></p>

        </div>
    );
};

export default RestaurantDetails;
