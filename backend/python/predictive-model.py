from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load models and encoder
grad_model = joblib.load('grad_model.pkl')
success_model = joblib.load('success_model.pkl')
next_gwa_model = joblib.load('next_gwa_model.pkl')
label_encoder = joblib.load('remarks_label_encoder.pkl')

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

    # Extract data from the last record
    last_record = gwa_records[-1]
    gwa_value = last_record['gwa']
    remark = last_record['remarks']
    encoded_remark = label_encoder.transform([remark])[0]

    # Calculate required features for prediction
    previous_gwa = gwa_records[-2]["gwa"] if len(gwa_records) > 1 else gwa_value
    cumulative_gwa = np.mean([record["gwa"] for record in gwa_records])
    gwa_change = gwa_value - previous_gwa if len(gwa_records) > 1 else 0

    # Prepare the feature array for prediction
    feature_array = np.array([[gwa_value, previous_gwa, encoded_remark, cumulative_gwa, gwa_change]])

    # Predict graduation rate and academic success rate
    predicted_grad_rate = grad_model.predict(feature_array)[0]
    predicted_success_rate = success_model.predict(feature_array)[0]

    # Predict the next GWA separately
    predicted_next_gwa = next_gwa_model.predict(feature_array)[0]
    predicted_remarks = classify_remarks(predicted_next_gwa)

    response = {
        'predicted_performance': 'Passed' if predicted_grad_rate == 1 else 'At Risk',
        'predicted_academic_success_rate': round(float(predicted_success_rate), 2),
        'predicted_remarks': predicted_remarks,
        'predicted_next_gwa': round(float(predicted_next_gwa), 2)
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
