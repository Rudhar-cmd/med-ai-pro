from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input

app = Flask(__name__)
CORS(app)

# Load your trained model
model = tf.keras.models.load_model("model.h5")

@app.route("/predict", methods=["POST"])
def predict():

    # Match React FormData key
    file = request.files["image"]

    img = Image.open(file).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)

    img_array = preprocess_input(img_array)

    prediction = model.predict(img_array)[0][0]

    if prediction > 0.5:
        label = "Pneumonia"
        confidence = prediction
    else:
        label = "Normal"
        confidence = 1 - prediction

    return jsonify({
        "result": label,
        "confidence": float(confidence)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)