// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";          // ✅ align with your actual file name
import RecipeDetail from "./pages/RecipeDetail";
import MyRecipes from "./pages/MyRecipes";
import Bookmarks from "./pages/Bookmarks";
import RecipeFormModal from "./pages/RecipeFormModal"; // modal wrapper for RecipeForm
import "./styles/global.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />       {/* ✅ updated */}
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/create" element={<RecipeFormModal />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
