import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import allRecipes from "../data/recipes";

export default function RecipeDetail() {
  const { recipeName } = useParams();
  const navigate = useNavigate();

  const recipe = allRecipes.find(r => decodeURIComponent(recipeName) === r.name);

  if (!recipe) return <p>Rețeta nu a fost găsită.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-emerald-50 p-6">
      <button
        className="mb-4 text-emerald-700 font-medium"
        onClick={() => navigate(-1)}
      >
        ◀ Înapoi
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-md p-4"
      >
        <img
          src={recipe.img}
          alt={recipe.name}
          className="w-full h-48 object-cover rounded-2xl mb-4"
        />
        <h1 className="text-2xl font-bold text-emerald-700 mb-2">{recipe.name}</h1>
        <p className="text-gray-500 mb-2">{recipe.calories} kcal</p>
        <h2 className="font-semibold text-emerald-700 mb-1">Ingrediente:</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>

        <button
          onClick={() => navigate(`/chef-ai/${encodeURIComponent(recipe.name)}`)}
          className="bg-emerald-600 text-white py-2 px-4 rounded-2xl shadow-md hover:bg-emerald-700 transition"
        >
          Gătește cu Chef AI
        </button>
      </motion.div>
    </div>
  );
}
