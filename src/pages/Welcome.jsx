import { motion } from "framer-motion";
import { UtensilsCrossed, Salad, ScanLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-200 via-white to-emerald-50 items-center justify-between p-6">

      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-12"
      >
        <h1 className="text-4xl font-extrabold text-emerald-800 tracking-tight">
          Nutriție Inteligentă
        </h1>
      </motion.div>

      {/* ILUSTRAȚIE CENTRALĂ */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center space-y-6"
      >
        <div className="relative flex justify-center items-center w-56 h-56">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-56 h-56 bg-white rounded-full flex items-center justify-center shadow-xl"
          >
            <UtensilsCrossed className="w-20 h-20 text-emerald-600" />
          </motion.div>
          <Salad className="absolute top-6 left-6 text-emerald-500 w-10 h-10" />
          <ScanLine className="absolute bottom-6 right-6 text-emerald-500 w-10 h-10" />
        </div>
        <p className="text-center text-gray-700 text-lg font-medium max-w-xs">
          Gătit asistat de AI, recunoaștere alimente și plan nutrițional personalizat
        </p>
      </motion.div>

      {/* BUTOANE */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full flex flex-col space-y-4 mt-8"
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-3 text-lg rounded-2xl w-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          Vezi sugestii AI
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="border-emerald-600 border text-emerald-600 hover:bg-emerald-100 py-3 text-lg rounded-2xl w-full shadow-sm hover:scale-105 transform transition duration-300"
        >
          Scanează aliment
        </button>
      </motion.div>

      {/* FOOTER */}
      <motion.p
        whileHover={{ scale: 1.05, color: "#16a34a" }}
        className="text-sm text-gray-500 mb-4 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Continuă ca invitat
      </motion.p>

    </div>
  );
}
