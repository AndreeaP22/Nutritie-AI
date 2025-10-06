import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanFood() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // Scanare reală prin backend
  const handleScan = async () => {
    if (!image) return alert("Încarcă o poză mai întâi!");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/scan-food", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la scanare.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-emerald-50 p-6">
      <h1 className="text-2xl font-bold text-emerald-700 mb-4">Scanare Alimente</h1>

      <div className="flex flex-col items-center mb-6">
        {image && typeof image === "object" && (
          <img src={URL.createObjectURL(image)} alt="upload" className="w-64 h-64 object-cover rounded-lg mb-4" />
        )}
        <input type="file" accept="image/*" onChange={handleUpload} className="mb-2" />
        <button
          onClick={handleScan}
          disabled={loading}
          className="bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-emerald-600"
        >
          {loading ? "Scanare..." : "Fă scanarea"}
        </button>
      </div>

      {/* Rezultate */}
      <div className="flex flex-col space-y-3">
        {results.map((item, i) => (
          <div key={i} className="flex items-center bg-white p-3 rounded-2xl shadow">
            {item.img && (
              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-3" />
            )}
            <div>
              <p className="font-semibold text-emerald-700">{item.name}</p>
              <p className="text-gray-500">{item.quantity || "cantitate aproximativă"}</p>
            </div>
            <button
              className="ml-auto bg-emerald-200 px-3 py-1 rounded-2xl shadow hover:bg-emerald-300"
              onClick={() => alert(`${item.name} adăugat în jurnal`)}
            >
              Adaugă
            </button>
          </div>
        ))}
      </div>

      <button
        className="mt-6 text-emerald-700 underline"
        onClick={() => navigate("/dashboard")}
      >
        ◀ Înapoi la Dashboard
      </button>
    </div>
  );
}
