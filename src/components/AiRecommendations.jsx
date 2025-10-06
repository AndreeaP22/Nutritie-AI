import { motion } from "framer-motion";

export default function AiRecommendations({ recipes }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
      <h2 className="text-lg font-semibold text-emerald-700 mb-2">
        Recomandări AI pentru tine
      </h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {recipes.map((recipe, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="min-w-[150px] bg-emerald-100 rounded-xl p-3 flex flex-col items-center justify-center font-medium cursor-pointer hover:bg-emerald-200 transition"
          >
            <span className="text-center">{recipe.name}</span>
            <span className="text-sm text-gray-600 mt-1">{recipe.calories} kcal</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
