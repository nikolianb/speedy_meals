import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateMeal from "./pages/CreateMeal";
import MealDetails from "./pages/MealDetails";
import EditMeal from "./pages/EditMeal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<CreateMeal />} />
        <Route path="/:id" element={<MealDetails />} />
        <Route path="/:id/edit" element={<EditMeal />} />
      </Routes>
    </Router>
  );
}

export default App;
