// src/components/RecipeCard.jsx
import { Link } from "react-router-dom";
import { IoIosTimer } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { SiLevelsdotfyi } from "react-icons/si";
import "../styles/RecipeDetail.css"; // reuse overlay/meta styles if available

export default function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="image-card hover-zoom"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="image-overlay">
        <h3 className="overlay-title">{recipe.title}</h3>
        <div className="overlay-meta icons">
          <span><IoIosTimer /> {recipe.cooking_time} min</span>
          <span><IoPeopleSharp /> {recipe.servings}</span>
          <span><SiLevelsdotfyi /> {recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}
