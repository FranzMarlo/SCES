from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

try:
    gwa_model = joblib.load("gwa_model.pkl")
except FileNotFoundError as e:
    raise RuntimeError(f"Model loading error: {e}")

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

def format_quarter_label(quarter_number):
    """
    Formats the quarter label based on the given quarter number.

    Args:
        quarter_number (int): The quarter number to format.

    Returns:
        str: The formatted quarter label.
    """
    if quarter_number == 1:
        return "1st Quarter"
    elif quarter_number == 2:
        return "2nd Quarter"
    elif quarter_number == 3:
        return "3rd Quarter"
    elif quarter_number == 4:
        return "4th Quarter"
    else:
        return f"Quarter {quarter_number}"
    
@app.route('/')
def home():
    return jsonify({
        "message": "Unauthorized Personnel Keep Out",
        "routes": {
            "POST /predict": "Predict the next GWA based on provided records."
        }
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the POST request
        data = request.get_json()
        gwa_records = data.get('gwa_records', [])

        if not gwa_records:
            return jsonify({"error": "No GWA records provided."}), 200

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
            return jsonify(response)

        if len(gwa_values) < 2:
            return jsonify({"error": "At least two GWA records are required for prediction."}), 200

        # Calculate features from GWA values
        recent_gwa = gwa_values[-1]
        cumulative_gwa = np.mean(gwa_values)  # Cumulative mean of all GWA values
        gwa_trend = recent_gwa - gwa_values[0]

        # Prepare features as a DataFrame to retain feature names
        feature_names = ["recent_gwa", "cumulative_gwa", "gwa_trend"]
        features = pd.DataFrame([[recent_gwa, cumulative_gwa, gwa_trend]], columns=feature_names)

        # Make predictions using the GWA model
        predicted_next_gwa = gwa_model.predict(features)[0]

        # Classify remarks based on predicted next GWA
        predicted_remarks = classify_remarks(predicted_next_gwa)

        # Create the response with the predicted values
        response = {
            'predicted_next_gwa': round(predicted_next_gwa, 2),
            'predicted_academic_success_rate': round(cumulative_gwa, 2),  # Cumulative GWA now included
            'predicted_remarks': predicted_remarks,
            'predicted_performance': "Passed" if predicted_next_gwa >= 80 else "At Risk"
        }
        return jsonify(response)

    except Exception as e:
        # Return error if there's an exception in the prediction process
        return jsonify({"error": str(e)}), 500

@app.route('/interpret', methods=['POST'])
def interpret():
    try:
        # Get JSON data from the POST request
        data = request.get_json()
        gwa_records = data.get('gwa_records', [])

        if not gwa_records:
            return jsonify({"error": "No GWA records provided."}), 200

        # Extract GWA values and grade levels from the records
        gwa_values = [record.get("gwa", 0) for record in gwa_records]
        grade_levels = [record.get("grade_level", "") for record in gwa_records]

        if len(gwa_values) == 0:
            return jsonify({"message": "No GWA data available for analysis."})

        insights = []
        overall_trend = 0

        # Generate insights based on changes in GWA across grade levels
        for i in range(1, len(gwa_values)):
            grade_from = grade_levels[i - 1]
            grade_to = grade_levels[i]
            gwa_from = int(gwa_values[i - 1])  # Remove decimal points
            gwa_to = int(gwa_values[i])  # Remove decimal points
            diff = gwa_to - gwa_from
            overall_trend += diff

            if diff > 0:
                insights.append(
                    f"An improvement in GWA from {gwa_from} to {gwa_to} between {grade_from} and {grade_to}"
                )
            elif diff < 0:
                insights.append(
                    f"A decline in GWA from {gwa_from} to {gwa_to} between {grade_from} and {grade_to}"
                )
            else:
                insights.append(
                    f"No changes in GWA from {grade_from} to {grade_to}"
                )

        # Determine overall trend
        if overall_trend > 0:
            overall_message = "Overall, the student shows an improvement in performance."
        elif overall_trend < 0:
            overall_message = "Overall, the student shows a decline in performance."
        else:
            overall_message = "Overall, there is no significant change in the student's performance."

        # Return only necessary components
        response = {
            "overall_message": overall_message,
            "insights": insights  # Keep detailed insights here if needed
        }
        return jsonify(response)

    except Exception as e:
        # Handle exceptions
        return jsonify({"error": str(e)}), 500

@app.route('/interpret-grades', methods=['POST'])
def interpret_grades():
    try:
        # Parse incoming JSON data
        data = request.get_json()
        subject_filter = data.get('subject_filter', 'All')
        quarter_filter = data.get('quarter_filter', 'All')
        labels = data.get('labels', [])
        bar_data = data.get('bar_data', [])

        if not labels or not bar_data:
            return jsonify({
                "interpretation": "No data available to analyze."
            }), 200

        if len(bar_data) < 2:
            return jsonify({
                "interpretation": "Only one grade is available to perform analysis."
                if len(bar_data) == 1 else "No grade data available for analysis."
            })

        if subject_filter == "All":
            # Check if all grades are the same
            if all(grade == bar_data[0] for grade in bar_data):
                if bar_data[0] < 80:
                    interpretation = "The student has difficulties in all subjects."
                else:
                    interpretation = "The student excels in all subjects."
                return jsonify({
                    "interpretation": interpretation
                })

            if quarter_filter == "All":
                # Determine highest and lowest grades
                max_index = bar_data.index(max(bar_data))
                min_index = bar_data.index(min(bar_data))
                interpretation = (
                    f"The student excels in {labels[max_index]} "
                    f"and has difficulties in {labels[min_index]}."
                )
            else:  # quarter_filter != "All"
                max_index = bar_data.index(max(bar_data))
                min_index = bar_data.index(min(bar_data))
                interpretation = (
                    f"In the {quarter_filter} quarter, the student excels in {labels[max_index]} "
                    f"and has difficulties in {labels[min_index]}."
                )
        else:  # subject_filter != "All"
            if quarter_filter == "All":
                trends = []
                overall_trend = 0

                # Analyze trends across data
                for i in range(1, len(bar_data)):
                    grade_from = labels[i - 1]
                    grade_to = labels[i]
                    score_from = bar_data[i - 1]
                    score_to = bar_data[i]
                    diff = score_to - score_from
                    overall_trend += diff

                    if diff > 0:
                        trends.append(
                            f"An improvement of grades from {score_from} to {score_to} in {grade_to}"
                        )
                    elif diff < 0:
                        trends.append(
                            f"A decline of grades from {score_from} to {score_to} in {grade_to}"
                        )
                    else:
                        trends.append(
                            f"No changes in grades between {score_from} in {grade_from} and {score_to} in {grade_to}"
                        )

                overall_message = (
                    "an overall improvement in performance."
                    if overall_trend > 0 else
                    "an overall decline in performance."
                    if overall_trend < 0 else
                    "no significant change in performance."
                )
                interpretation = (
                    f"The bar graph depicts: {' '.join(trends)}. "
                    f"Overall, the student exhibits {overall_message}"
                )
            else:  # subject_filter != "All" and quarter_filter != "All"
                trends = []
                overall_trend = 0

                for i in range(1, len(bar_data)):
                    grade_from = labels[i - 1]
                    grade_to = labels[i]
                    score_from = bar_data[i - 1]
                    score_to = bar_data[i]
                    diff = score_to - score_from
                    overall_trend += diff

                    if diff > 0:
                        trends.append(
                            f"An improvement of grades from {score_from} to {score_to} in {grade_to}"
                        )
                    elif diff < 0:
                        trends.append(
                            f"A decline of grades from {score_from} to {score_to} in {grade_to}"
                        )
                    else:
                        trends.append(
                            f"No changes in grades between {score_from} in {grade_from} and {score_to} in {grade_to}"
                        )

                overall_message = (
                    "an overall improvement in performance."
                    if overall_trend > 0 else
                    "an overall decline in performance."
                    if overall_trend < 0 else
                    "no significant change in performance."
                )
                interpretation = (
                    f"The bar graph depicts: {' '.join(trends)}. "
                    f"Overall, the student exhibits {overall_message}"
                )

        return jsonify({
            "interpretation": interpretation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interpret-subject', methods=['POST'])
def interpret_subject():
    try:
        # Get JSON data from the POST request
        data = request.get_json()
        labels = data.get('labels', [])
        bar_data = data.get('bar_data', [])

        if not labels or not bar_data:
            return jsonify({
                "interpretation": "No grade data available for analysis."
            }), 200

        predicted_grade = None
        missing_message = ""

        # Ensure that labels include "1st Quarter" and "2nd Quarter"
        has_first_quarter = "1st Quarter" in labels
        has_second_quarter = "2nd Quarter" in labels

        if has_first_quarter and has_second_quarter:
            if len(bar_data) <= 3:
                changes = []
                for i in range(1, len(bar_data)):
                    changes.append(bar_data[i] - bar_data[i - 1])

                average_change = sum(changes) / len(changes)
                predicted_grade = round(bar_data[-1] + average_change)
                bar_data.append(predicted_grade)

                next_quarter_label = format_quarter_label(len(labels) + 1)
                labels.append(next_quarter_label)
        else:
            # Prepare the message for missing quarters
            missing_quarters = []
            if not has_first_quarter:
                missing_quarters.append("1st Quarter")
            if not has_second_quarter:
                missing_quarters.append("2nd Quarter")

            missing_message = f"Prediction skipped: Missing data for {', '.join(missing_quarters)}."

        # Interpretation logic
        interpretation = ""
        if len(bar_data) > 1:
            changes = []
            for i in range(1, len(bar_data)):
                changes.append(bar_data[i] - bar_data[i - 1])

            all_positive_or_zero = all(change >= 0 for change in changes)
            all_negative_or_zero = all(change <= 0 for change in changes)
            all_zero_changes = all(change == 0 for change in changes)

            if all_zero_changes:
                interpretation = "The student's grades have remained consistent across quarters."
            elif all_positive_or_zero:
                interpretation = "The student's grades have shown consistent improvement across quarters."
            elif all_negative_or_zero:
                interpretation = "The student's grades have consistently declined across quarters."
            else:
                interpretation = "The student's grades have varied across quarters."

            if predicted_grade is not None:
                interpretation += f" The predicted grade for the next quarter is {predicted_grade}."
        else:
            interpretation = "Insufficient number of grades to determine trends."

        # Append the prediction skipped message if applicable
        if missing_message:
            interpretation += f" {missing_message}"

        return jsonify({
            "interpretation": interpretation,
            "grades": bar_data,
            "labels": labels
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interpret-gwa', methods=['POST'])
def interpret_gwa():
    try:
        # Get data from the request
        data = request.get_json()
        year = data.get('year', 'All')
        grade = data.get('gradeLevel', 'All')
        labels = data.get('labels', [])
        bar_data = data.get('barData', [])

        # Validate input
        if not labels or not bar_data or len(labels) != len(bar_data):
            return jsonify({
                "interpretation": "Invalid data or no data available for the selected filters."
            }), 200

        # Helper functions
        def analyze_all_grades():
            max_gwa = max(bar_data)
            min_gwa = min(bar_data)
            max_gwa_index = bar_data.index(max_gwa)
            min_gwa_index = bar_data.index(min_gwa)
            highest_grade = labels[max_gwa_index]
            lowest_grade = labels[min_gwa_index]

            # Check for grade levels with GWA < 80
            below_threshold = [
                f"{labels[i]} (GWA: {gwa})"
                for i, gwa in enumerate(bar_data)
                if gwa < 80
            ]

            interpretation = (
                f"The grade level with the highest average GWA is {highest_grade} with a GWA of {max_gwa}, "
                f"while the grade level with the lowest average GWA is {lowest_grade} with a GWA of {min_gwa}. "
            )
            if below_threshold:
                interpretation += (
                    f"The following grade levels show a decline with GWA below 80: {', '.join(below_threshold)}."
                )
            else:
                interpretation += "No grade levels indicated a decline in students' rating."
            return interpretation

        def analyze_specific_grade():
            selected_gwa = bar_data[0]  # Assuming data is filtered for the specific grade level
            if selected_gwa < 80:
                return (
                    f"The GWA {selected_gwa} of {grade} indicates a decline as it is below 80."
                )
            else:
                return (
                    f"The GWA {selected_gwa} of {grade} does not indicate a decline in students' rating."
                )

        def analyze_trends():
            significant_changes = []
            overall_trend = 0

            for i in range(1, len(bar_data)):
                grade_from = labels[i - 1]
                grade_to = labels[i]
                score_from = bar_data[i - 1]
                score_to = bar_data[i]
                diff = score_to - score_from

                overall_trend += diff

                # Check for significant improvement or decline (threshold: 1.0)
                if abs(diff) >= 1.0:
                    if diff > 0:
                        significant_changes.append(
                            f"Significant improvement from {score_from} to {score_to} ({grade_from} to {grade_to})"
                        )
                    else:
                        significant_changes.append(
                            f"Significant decline from {score_from} to {score_to} ({grade_from} to {grade_to})"
                        )

            overall_message = (
                "an improvement in performance." if overall_trend > 0
                else "a decline in performance." if overall_trend < 0
                else "no significant changes in performance."
            )

            if year == "All":
                return (
                    f"Through the years, the {grade} had: "
                    f"{' '.join(significant_changes) if significant_changes else 'no significant improvements or declines were observed.'} "
                    f"Overall, there is {overall_message}"
                )
            else:
                return (
                    f"For {grade}, "
                    f"{' '.join(significant_changes) if significant_changes else 'no significant improvements or declines were observed.'} "
                    f"Overall, there is {overall_message}"
                )

        # Main logic
        if grade == "All":
            interpretation = analyze_all_grades()
        elif year != "All" and grade != "All":
            interpretation = analyze_specific_grade()
        else:
            interpretation = analyze_trends()

        # Return the interpretation
        return jsonify({
            "interpretation": interpretation
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True)
