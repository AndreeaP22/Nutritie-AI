import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FoodJournal from "../components/FoodJournal";
import allRecipes from "../data/recipes"; // lista rețete centralizată

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Carduri rapide + Scanare
  const cards = [
    { icon: "🧠", title: "Recomandări AI", onClick: () => {} },
    { icon: "🏃", title: "Activitate fizică", onClick: () => {} },
    { icon: "💰", title: "Economii financiare", onClick: () => {} },
    { icon: "📸", title: "Scanare aliment", onClick: () => navigate("/scan-food") }, // card Scanare
  ];

  // Filtrare rețete în funcție de alimentele din jurnal
  const recommendedRecipes = allRecipes.filter((recipe) =>
    recipe.ingredients.some((ing) =>
      foods.map(f => f.name.toLowerCase()).includes(ing.toLowerCase())
    )
  );

  const recipesToShow = recommendedRecipes.length ? recommendedRecipes : allRecipes;

  // Funcții scroll butoane
  const scrollLeft = () => sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });

  // Funcții swipe mobil
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) scrollRight(); // swipe stânga
    if (touchEndX - touchStartX > 50) scrollLeft();  // swipe dreapta
  };

  return (
    <div className="flex flex-col min-h-screen bg-emerald-50 p-6">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-emerald-700 mb-6"
      >
        Bună dimineața, Andreea! 🌞
      </motion.h1>

      {/* FOOD JOURNAL */}
      <FoodJournal onFoodsChange={setFoods} />

      {/* CARDURI RAPIDE */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={card.onClick}
          >
            <span className="text-3xl mb-2">{card.icon}</span>
            <p className="text-gray-700 font-medium">{card.title}</p>
          </motion.div>
        ))}
      </div>

      {/* SLIDER RECOMANDĂRI AI */}
      <div className="mb-20 relative">
        <h2 className="text-lg font-semibold text-emerald-700 mb-2">Recomandări AI pentru tine</h2>

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-emerald-100"
        >◀</button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-emerald-100"
        >▶</button>

        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {recipesToShow.map((recipe, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="min-w-[180px] bg-white rounded-2xl shadow-md cursor-pointer flex-shrink-0"
              onClick={() => navigate(`/chef-ai/${encodeURIComponent(recipe.name)}`)} // navigare către ChefAI
            >
              <img
                src={recipe.img}
                alt={recipe.name}
                className="w-full h-32 object-cover rounded-t-2xl"
              />
              <div className="p-3">
                <p className="font-semibold text-emerald-700">{recipe.name}</p>
                <p className="text-gray-500 text-sm">{recipe.calories} kcal</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NAVBAR FIX JOS */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 shadow-inner">
        <button className="flex flex-col items-center text-emerald-700" onClick={() => navigate("/dashboard")}>🏠<span className="text-xs">Acasă</span></button>
        <button className="flex flex-col items-center text-gray-500" onClick={() => navigate("/scan-food")}>📸<span className="text-xs">Scanare</span></button>
        <button className="flex flex-col items-center text-gray-500">🍽️<span className="text-xs">Rețete</span></button>
        <button className="flex flex-col items-center text-gray-500">👤<span className="text-xs">Profil</span></button>
      </div>

    </div>
  );
}
