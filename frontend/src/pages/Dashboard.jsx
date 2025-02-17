import { useEffect, useState } from "react";
import apiService from "../services/api"; 
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchMeals();
  }, [filter]);

  const fetchMeals = async () => {
    const data = await apiService.getMeals(filter);
    setMeals(data);
  };

  const handleDelete = async (id) => {
    await apiService.deleteMeal(id);
    fetchMeals();
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Speedy Meals</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="lead mb-0">Find inspiration with these delicious meals!</p>
        <Link to="/new" className="btn btn-primary">Add a Meal</Link>
      </div>

      <div className="mb-3">
        <button className={`btn ${filter === "" ? "btn-dark" : "btn-outline-dark"} me-2`} onClick={() => setFilter("")}>
          All Meals
        </button>
        <button className={`btn ${filter === "under30" ? "btn-success" : "btn-outline-success"} me-2`} onClick={() => setFilter("under30")}>
          Under 30 Min
        </button>
        <button className={`btn ${filter === "over60" ? "btn-danger" : "btn-outline-danger"}`} onClick={() => setFilter("over60")}>
          Over 60 Min
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Meal</th>
            <th>Prep Time (min)</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => {
            const hasThreeValidIngredients = meal.ingredients && 
              meal.ingredients.filter(ingredient => ingredient.trim() !== "").length === 3;

            return (
              <tr key={meal._id}>
                <td>
                  {meal.name} 
                  {hasThreeValidIngredients && (
                    <i className="bi bi-star-fill text-warning ms-2"></i>
                  )}
                </td>
                <td>{meal.cookTime}</td>
                <td>
                  <Link to={`/${meal._id}`} className="btn btn-info btn-sm me-2">Details</Link>
                  <Link to={`/${meal._id}/edit`} className="btn btn-warning btn-sm me-2">Edit</Link>
                  <button onClick={() => handleDelete(meal._id)} className="btn btn-danger btn-sm">
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
