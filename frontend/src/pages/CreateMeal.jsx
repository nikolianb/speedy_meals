import { useState } from "react";
import apiService from "../services/api"; 
import { useNavigate, Link } from "react-router-dom";

const CreateMeal = () => {
  const navigate = useNavigate();

  const [meal, setMeal] = useState({
    name: "",
    cookTime: "",
    directions: "",
    ingredients: ["", "", ""],
  });

  const [errors, setErrors] = useState({
    name: "",
    cookTime: "",
    directions: "",
  });

  const validate = (field, value) => {
    let errorMsg = "";

    switch (field) {
      case "name":
        if (!value) errorMsg = "Dish name is required.";
        else if (value.length < 3 || value.length > 20) errorMsg = "Must be 3-20 characters.";
        break;

      case "cookTime":
        if (!value) errorMsg = "Cook time is required.";
        else if (value < 2 || value > 240) errorMsg = "Must be between 2 and 240 minutes.";
        break;

      case "directions":
        if (!value) errorMsg = "Directions are required.";
        else if (value.length < 10) errorMsg = "Must be at least 10 characters.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const updatedIngredients = [...meal.ingredients];
      updatedIngredients[index] = e.target.value;
      setMeal({ ...meal, ingredients: updatedIngredients });
    } else {
      setMeal({ ...meal, [e.target.name]: e.target.value });
      validate(e.target.name, e.target.value);
    }
  };

  const isFormValid =
    !errors.name &&
    !errors.cookTime &&
    !errors.directions &&
    meal.name &&
    meal.cookTime &&
    meal.directions;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiService.createMeal(meal);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-3">Speedy Meals</h1>
        <Link to="/" className="text-primary">Back to Home</Link>
      </div>
      <p className="lead">Add the next culinary masterpiece!</p>

      <form onSubmit={handleSubmit} className="card p-4">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Dish Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={meal.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Total Minutes</label>
              <input
                type="number"
                name="cookTime"
                className={`form-control ${errors.cookTime ? "is-invalid" : ""}`}
                value={meal.cookTime}
                onChange={handleChange}
              />
              {errors.cookTime && <div className="invalid-feedback">{errors.cookTime}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Directions</label>
              <textarea
                name="directions"
                className={`form-control ${errors.directions ? "is-invalid" : ""}`}
                value={meal.directions}
                onChange={handleChange}
              />
              {errors.directions && <div className="invalid-feedback">{errors.directions}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Ingredients (Optional)</label>
            {meal.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleChange(e, index)}
                className="form-control mb-2"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateMeal;
