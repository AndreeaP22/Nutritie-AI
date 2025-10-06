import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FoodJournal({ onFoodsChange }) {
  const [foods, setFoods] = useState([]);
  const [input, setInput] = useState("");

  const addFood = () => {
    if (input.trim() === "") return;
    const newFood = {
      name: input.toLowerCase(),
      calories: Math.floor(Math.random() * 500) + 50, // mock calories
    };
    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    setInput("");
    if (onFoodsChange) onFoodsChange(updatedFoods);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
      <h2 className="text-lg font-semibold text-emerald-700 mb-3">Jurnal alimentar</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Adaugă aliment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          onClick={addFood}
          className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
        >
          Adaugă
        </button>
      </div>

      <div className="max-h-48 overflow-y-auto">
        {foods.length === 0 && (
          <p className="text-gray-500 text-sm">Nu ai adăugat nimic încă.</p>
        )}
        {foods.map((food, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between py-2 border-b border-gray-100"
          >
            <span>{food.name}</span>
            <span>{food.calories} kcal</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
