import { useEffect, useState } from "react";
import apiService from "../services/api"; // Import the centralized API service
import { useParams, useNavigate, Link } from "react-router-dom";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const data = await apiService.getMealById(id);
      setMeal(data);
    };
    fetchMeal();
  }, [id]);

  const handleDelete = async () => {
    await apiService.deleteMeal(id);
    navigate("/");
  };

  if (!meal) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fw-bold">Speedy Meals</h1>
        <Link to="/" className="text-primary">Back to Home</Link>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <h3 className="text-secondary">{meal.name} Recipe</h3>
        <button onClick={handleDelete} className="btn btn-danger d-flex align-items-center">
          <i className="bi bi-house-fill me-2"></i> REMOVE
        </button>
      </div>

      <div className="card p-4 mt-3">
        <h5 className="fw-bold">Cook Time</h5>
        <p>{meal.cookTime} minutes</p>

        <h5 className="fw-bold mt-3">Ingredients</h5>
        <ul className="list-group mb-3">
          {meal.ingredients.length > 0 ? (
            meal.ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">{ingredient}</li>
            ))
          ) : (
            <li className="list-group-item text-muted">No ingredients added</li>
          )}
        </ul>

        <h5 className="fw-bold">Directions</h5>
        <p className="border p-2">{meal.directions}</p>
      </div>
    </div>
  );
};

export default MealDetails;
