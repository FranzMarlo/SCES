import sys
import json
import numpy as np
import pandas as pd
import joblib

# Load the trained model (ensure the path is correct)
gwa_model = joblib.load("C:/xampp/htdocs/SCES/backend/python/gwa_model.pkl")

def classify_remarks(next_gwa):
    """Classifies remarks based on the predicted next GWA"""
    if next_gwa >= 90:
        return "Outstanding"
    elif 85 <= next_gwa < 90:
        return "Very Satisfactory"
    elif 80 <= next_gwa < 85:
        return "Satisfactory"
    elif 75 <= next_gwa < 80:
        return "Fairly Satisfactory"
    else:
        return "Did Not Meet Expectations"

if __name__ == "__main__":
    # Ensure the argument is passed properly
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No GWA records provided."}))
        sys.exit(1)

    # Read the command-line argument passed from PHP
    gwa_records = json.loads(sys.argv[1])  # Assuming the data is passed as a JSON string

    if not gwa_records:
        print(json.dumps({"error": "No GWA records provided."}))
        sys.exit(1)

    # Extract GWA values from the records
    gwa_values = [record.get("gwa", 0) for record in gwa_records]

    if len(gwa_values) == 1:
        # Handle the case where there is only one GWA record
        single_gwa = gwa_values[0]
        predicted_next_gwa = single_gwa  # Default prediction for a single GWA record
        predicted_remarks = classify_remarks(predicted_next_gwa)
        response = {
            'predicted_next_gwa': round(predicted_next_gwa, 2),
            'predicted_academic_success_rate': round(single_gwa, 2),
            'predicted_remarks': predicted_remarks,
            'predicted_performance': "Passed" if predicted_next_gwa >= 80 else "At Risk"
        }
        print(json.dumps(response))
        sys.exit(0)

    if len(gwa_values) < 2:
        print(json.dumps({"error": "At least two GWA records are required for prediction."}))
        sys.exit(1)

    # Calculate features from GWA values
    recent_gwa = gwa_values[-1]
    cumulative_gwa = np.mean(gwa_values)  # Cumulative mean of all GWA values
    gwa_trend = recent_gwa - gwa_values[0]

    # Prepare features as a DataFrame to retain feature names
    feature_names = ["recent_gwa", "cumulative_gwa", "gwa_trend"]
    features = pd.DataFrame([[recent_gwa, cumulative_gwa, gwa_trend]], columns=feature_names)

    # Make predictions using the trained model (you may need to adjust this)
    predicted_next_gwa = gwa_model.predict(features)[0]
    predicted_remarks = classify_remarks(predicted_next_gwa)

    # Prepare the response to send back
    response = {
        'predicted_next_gwa': round(predicted_next_gwa, 2),
        'predicted_academic_success_rate': round(np.mean(gwa_values), 2),
        'predicted_remarks': predicted_remarks,
        'predicted_performance': "Passed" if predicted_next_gwa >= 80 else "At Risk"
    }

    # Return the prediction results as JSON
    print(json.dumps(response))
