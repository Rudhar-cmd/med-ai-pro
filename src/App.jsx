import React, { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";
import axios from "axios";
export default function App() {
  const [activePage, setActivePage] = useState("upload");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("image", image);
  
      const response = await axios.post(
         "https://med-ai-project.onrender.com/predict",
        formData
      );
  
      const aiResult = {
        label: response.data.result,
        confidence: Math.round(response.data.confidence * 100)
      };
  
      setResult(aiResult);
  
      setHistory((prev) => [
        { image: preview, result: aiResult },
        ...prev,
      ]);
  
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }
  
    setLoading(false);
  };

  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    doc.text("Chest Disease Report", 20, 20);
    doc.text(`Result: ${result.label}`, 20, 40);
    doc.text(`Confidence: ${result.confidence}%`, 20, 50);
    doc.save("report.pdf");
  };

  return (
    <div className="app">
  
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">🩺</div>
          <div>
            <h2>MedAI</h2>
            <span>AI Diagnostics</span>
          </div>
        </div>
  
        <div
          className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </div>
  
        <div
          className={`nav-item ${activePage === "upload" ? "active" : ""}`}
          onClick={() => setActivePage("upload")}
        >
          Upload Scan
        </div>
  
        <div
          className={`nav-item ${activePage === "history" ? "active" : ""}`}
          onClick={() => setActivePage("history")}
        >
          History
        </div>
  
        <div
          className={`nav-item ${activePage === "settings" ? "active" : ""}`}
          onClick={() => setActivePage("settings")}
        >
          Settings
        </div>
  
        <div className="footer">
          AI Diagnostic System v2.0
        </div>
      </div>
  
      <div className="main">
  
        {activePage === "dashboard" && (
          <div className="dashboard">
  
            <div className="hero-card">
              <h1>🩺 AI Chest Disease Detection</h1>
              <p>
                Advanced Deep Learning Diagnostic Platform
              </p>
            </div>
  
            <div className="stats-grid">
  
              <div className="stat-card">
                <h3>Total Scans</h3>
                <h1>{history.length}</h1>
              </div>
  
              <div className="stat-card">
                <h3>Model</h3>
                <h1>EfficientNet</h1>
              </div>
  
              <div className="stat-card">
                <h3>Status</h3>
                <h1>Online</h1>
              </div>
  
            </div>
  
          </div>
        )}
  
        {activePage === "upload" && (
  
          <div className="upload-layout">
  
            <div className="scan-card">
  
              {!preview ? (
  
                <label className="upload-zone">
  
                  <div>
                    <h2>📤 Upload X-Ray</h2>
                    <p>Select chest X-ray image</p>
                  </div>
  
                  <input
                    type="file"
                    hidden
                    onChange={handleImageUpload}
                  />
  
                </label>
  
              ) : (
  
                <div className="preview-wrapper">
  
                  <img
                    src={preview}
                    className="preview"
                    alt=""
                  />
  
                  {loading && (
                    <>
                      <div className="grid-overlay"></div>
                      <div className="scan-line"></div>
                      <div className="heatmap"></div>
                    </>
                  )}
  
                </div>
  
              )}
  
            </div>
  
            <div className="result-panel">
  
              <h2>AI Diagnosis</h2>
  
              <button
                className="button"
                onClick={handleSubmit}
              >
                {loading ? "Analyzing..." : "Detect Disease"}
              </button>
  
              {loading && (
                <div className="loading"></div>
              )}
  
              {result && (
  
                <div className="result-card">
  
                  <h1>{result.label}</h1>
  
                  <div className="confidence-bar">
                    <div
                      className="confidence-fill"
                      style={{
                        width: `${result.confidence}%`
                      }}
                    />
                  </div>
  
                  <h2>{result.confidence}%</h2>
  
                  <p>Confidence Score</p>
  
                  <button
                    className="button"
                    onClick={downloadPDF}
                  >
                    Download Report
                  </button>
  
                </div>
  
              )}
  
            </div>
  
          </div>
  
        )}
  
        {activePage === "history" && (
  
          <div className="history-page">
  
            <h1>Scan History</h1>
  
            {history.map((item, i) => (
  
              <div
                key={i}
                className="history-card"
              >
  
                <img
                  src={item.image}
                  alt=""
                />
  
                <div>
                  <h3>{item.result.label}</h3>
                  <p>
                    {item.result.confidence}% Confidence
                  </p>
                </div>
  
              </div>
  
            ))}
  
          </div>
  
        )}
  
        {activePage === "settings" && (
          <div className="settings-page">
            <h1>Settings</h1>
            <p>Future Configuration Panel</p>
          </div>
        )}
  
      </div>
  
    </div>
  );
}
