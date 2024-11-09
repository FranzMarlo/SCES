# predictive-model.py
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load optional label encoder if available
try:
    label_encoder = joblib.load('remarks_label_encoder.pkl')
except FileNotFoundError:
    label_encoder = None

# Function to classify remarks based on predicted success rate
def classify_remarks(success_rate):
    if success_rate >= 90:
        return "Outstanding"
    elif 85 <= success_rate < 90:
        return "Very Good"
    elif 80 <= success_rate < 85:
        return "Good"
    elif 75 <= success_rate < 80:
        return "Fair"
    else:
        return "Failed"

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight check passed'}), 200

    data = request.get_json()
    gwa_records = data.get('gwa_records', [])

    if not gwa_records:
        return jsonify({"error": "No GWA records provided."}), 400

    # Extract GWA values from records
    gwa_values = [record["gwa"] for record in gwa_records]
    recent_gwa = gwa_values[-1]
    cumulative_gwa = np.mean(gwa_values)
    gwa_trend = gwa_values[-1] - gwa_values[0]  # Difference between first and last GWA

    # Graduation prediction: Based on most recent GWA
    predicted_grad_rate = "Passed" if recent_gwa >= 80 else "At Risk"

    # Calculate adjusted success rate based on cumulative GWA and trend
    trend_adjustment = gwa_trend * 0.1  # Small adjustment based on trend (10%)
    predicted_success_rate = cumulative_gwa + trend_adjustment
    predicted_success_rate = round(predicted_success_rate, 2)

    # Predict next GWA based on recent trend
    predicted_next_gwa = recent_gwa + trend_adjustment
    predicted_next_gwa = round(predicted_next_gwa, 1)

    # Remarks classification based on success rate
    predicted_remarks = classify_remarks(predicted_next_gwa)

    response = {
        'predicted_performance': predicted_grad_rate,
        'predicted_academic_success_rate': predicted_success_rate,
        'predicted_remarks': predicted_remarks,
        'predicted_next_gwa': predicted_next_gwa
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
