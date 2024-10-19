# predictive_model.py

from flask import Flask, request, jsonify
import numpy as np
import joblib  # or other ML model format

app = Flask(__name__)

# Load your trained machine learning model (e.g., a model to predict performance, graduation rate, etc.)
model = joblib.load('path_to_your_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Data sent from the JS side
    
    # Extract the relevant student information (e.g., grades, quiz scores)
    gwa = np.array([data['gwa']])  # Assuming gwa is a key in the data
    
    # Perform prediction using the machine learning model
    prediction = model.predict(gwa)  # Replace with appropriate model handling
    
    # For example, predict multiple things
    performance_pred = prediction[0]
    grad_rate_pred = prediction[1]
    success_rate_pred = prediction[2]
    
    # Return predictions
    return jsonify({
        "predicted_performance": performance_pred,
        "predicted_graduation_rate": grad_rate_pred,
        "predicted_academic_success_rate": success_rate_pred
    })

if __name__ == '__main__':
    app.run(debug=True)
