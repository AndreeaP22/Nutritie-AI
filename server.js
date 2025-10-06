import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const port = 5000;

// Permite request-uri din React
app.use(cors({
  origin: "http://localhost:5173", // portul unde rulează React
}));

const upload = multer();

// Endpoint scan-food
app.post("/api/scan-food", upload.single("image"), async (req, res) => {
  try {
    // aici faci procesarea imaginii cu OpenAI/alt AI
    res.json({
      results: [
        { name: "Ou", quantity: "2 buc", img: "/src/assets/food/ou.jpg" },
        { name: "Spanac", quantity: "50 g", img: "/src/assets/food/spanac.jpg" },
        { name: "Ulei", quantity: "10 ml", img: "/src/assets/food/ulei.jpg" },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server scan-food rulează pe http://localhost:${port}`));
