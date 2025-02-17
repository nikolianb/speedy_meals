import axios from "axios";

const API_URL = "http://localhost:5000/api/meals";

const apiService = {
  getMeals: (filter = "") => axios.get(`${API_URL}?filter=${filter}`).then(res => res.data),
  createMeal: (meal) => axios.post(API_URL, meal).then(res => res.data),
  getMealById: (id) => axios.get(`${API_URL}/${id}`).then(res => res.data),
  updateMeal: (id, meal) => axios.put(`${API_URL}/${id}`, meal).then(res => res.data),
  deleteMeal: (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data),
};

export default apiService;
