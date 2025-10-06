import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Lista rețete: folosim pozele principale deja existente
const allRecipes = [
  {
    name: "Omeletă cu spanac",
    mainImg: "/src/assets/recipes/omeleta-spanac.jpg",
    steps: [
      { text: "Spală toate ingredientele.", img: "/src/assets/recipes/omeleta-spanac.jpg" },
      { text: "Taie legumele mărunt.", img: "/src/assets/recipes/omeleta-spanac.jpg" },
      { text: "Încălzește tigaia cu puțin ulei.", img: "/src/assets/recipes/omeleta-spanac.jpg" },
      { text: "Gătește ingredientele conform rețetei.", img: "/src/assets/recipes/omeleta-spanac.jpg" },
      { text: "Servește și bucură-te de masă!", img: "/src/assets/recipes/omeleta-spanac.jpg" },
    ],
  },
  {
    name: "Salată de quinoa",
    mainImg: "/src/assets/recipes/quinoa.jpg",
    steps: [
      { text: "Spală quinoa și legumele.", img: "/src/assets/recipes/quinoa.jpg" },
      { text: "Fierbe quinoa conform instrucțiunilor.", img: "/src/assets/recipes/quinoa.jpg" },
      { text: "Taie legumele și adaugă-le peste quinoa.", img: "/src/assets/recipes/quinoa.jpg" },
      { text: "Adaugă dressing și amestecă.", img: "/src/assets/recipes/quinoa.jpg" },
      { text: "Servește salata proaspătă.", img: "/src/assets/recipes/quinoa.jpg" },
    ],
  },
];

export default function ChefAIChat({ recipeName = "Omeletă cu spanac" }) {
  const recipe = allRecipes.find(r => r.name === recipeName) || allRecipes[0];
  const [stepIndex, setStepIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: `Salut! Sunt Chef AI. Vrei să gătim ${recipe.name}?`, img: recipe.steps[0].img }
  ]);
  const messagesEndRef = useRef(null);

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ro-RO";
    synth.speak(utterance);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
    if (msg.sender === "ai") speakText(msg.text);
  };

  const nextStep = () => {
    if (stepIndex < recipe.steps.length - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      addMessage({ sender: "ai", text: recipe.steps[next].text, img: recipe.steps[next].img });
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      setStepIndex(prev);
      addMessage({ sender: "ai", text: recipe.steps[prev].text, img: recipe.steps[prev].img });
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    addMessage({ sender: "user", text: inputText });

    const responses = [
      "Poți începe cu ingredientele pregătite.",
      "Urmărește pașii în ordine și nu te grăbi.",
      "Nu uita să verifici temperatura tigăii.",
      "Poți să mă întrebi despre orice pas."
    ];
    const aiMessage = {
      sender: "ai",
      text: responses[Math.floor(Math.random() * responses.length)],
      img: recipe.steps[stepIndex].img
    };
    addMessage(aiMessage);
    setInputText("");
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Browserul tău nu suportă Speech Recognition");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ro-RO";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      recognition.stop();
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-emerald-50 p-4">
      <h1 className="text-2xl font-bold text-emerald-700 mb-4">{recipe.name}</h1>

      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-3 flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
          >
            {msg.sender === "ai" && msg.img && (
              <img src={msg.img} alt="pas" className="w-20 h-20 rounded-lg mr-2 object-cover" />
            )}
            <div className={`${msg.sender === "ai" ? "bg-white text-emerald-700" : "bg-emerald-700 text-white"} rounded-2xl p-3 max-w-xs`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex justify-between mb-2">
        <button onClick={prevStep} disabled={stepIndex === 0} className="px-4 py-2 bg-emerald-200 rounded-2xl shadow hover:bg-emerald-300 disabled:opacity-50">◀ Pas anterior</button>
        <button onClick={nextStep} disabled={stepIndex === recipe.steps.length - 1} className="px-4 py-2 bg-emerald-500 text-white rounded-2xl shadow hover:bg-emerald-600 disabled:opacity-50">Pas următor ▶</button>
      </div>

      <div className="flex space-x-2">
        <button onClick={handleVoiceInput} className="bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-emerald-600">🎤</button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Întreabă Chef AI..."
          className="flex-1 rounded-2xl p-2 border border-gray-300"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-emerald-600">Trimite</button>
      </div>
    </div>
  );
}
