# MedAI - Chest Disease Detection

This is a frontend project where users can upload chest X-ray images and get a prediction of possible diseases using an AI model.

Right now, the UI is fully built and uses demo data. Backend + ML model can be connected later.

---

## Features

* Upload chest X-ray image
* AI-style scanning animation
* Shows prediction with confidence
* Download report as PDF
* Keeps history of previous scans
* Clean dashboard UI with sidebar

---

## How to run

1. Clone the repo

git clone https://github.com/Rudhar-cmd/med-ai-project.git

2. Go into the folder

cd med-ai-project

3. Install dependencies

npm install

4. Start the project

npm run dev

---

## Backend (not connected yet)

you can connect a backend API at:

http://localhost:5000/predict

Expected response:

{
"label": "Pneumonia",
"confidence": 92.5
}

---

## Tech used

* React (Vite)
* CSS (custom styling)
* jsPDF

---

## Future plan

* Connect real ML model
* Add real heatmap detection
* Improve UI more
* Deploy online

---

## Author

https://github.com/Parv21Sharma
https://github.com/Aarush-ICEMAN
https://github.com/Rudhar-cmd
