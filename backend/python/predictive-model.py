from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

try:
    gwa_model = joblib.load("gwa_model.pkl")
    success_rate_model = joblib.load("success_rate_model.pkl")
    grade_model = joblib.load("grade_model.pkl")
    label_encoders = joblib.load("label_encoders.pkl")
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
    quarters = {1: "1st Quarter", 2: "2nd Quarter", 3: "3rd Quarter", 4: "4th Quarter"}
    return quarters.get(quarter_number, f"Quarter {quarter_number}")
    
@app.route('/ping', methods=['GET'])
def ping():
    return "Access Not Allowed", 200
    
@app.route('/')
def home():
    return "SCES ML Model Hosted By Render", 200

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
        predicted_next_gwa = float(gwa_model.predict(features)[0])  # Convert to float
        computed_success_rate = float(success_rate_model.predict(features)[0]) 
        predicted_success_rate = (computed_success_rate + predicted_next_gwa) / 2
        # Classify remarks based on predicted next GWA
        predicted_remarks = classify_remarks(predicted_next_gwa)

        # Create the response with the predicted values
        response = {
            'predicted_next_gwa': round(predicted_next_gwa, 2),
            'predicted_academic_success_rate': round(predicted_success_rate, 2),  # Use model prediction here
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
            if all(grade == bar_data[0] for grade in bar_data):
                if bar_data[0] < 80:
                    interpretation = "The student has difficulties in all subjects."
                else:
                    interpretation = "The student excels in all subjects."
                return jsonify({
                    "interpretation": interpretation
                })

            if quarter_filter == "All":
                max_index = bar_data.index(max(bar_data))
                min_index = bar_data.index(min(bar_data))
                interpretation = (
                    f"The student excels in {labels[max_index]} "
                    f"and has difficulties in {labels[min_index]}."
                )
            else:
                max_index = bar_data.index(max(bar_data))
                min_index = bar_data.index(min(bar_data))
                interpretation = (
                    f"In the {quarter_filter} quarter, the student excels in {labels[max_index]} "
                    f"and has difficulties in {labels[min_index]}."
                )
        else:
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
                        f"An improvement of grades from {score_from} to {score_to} in {grade_to}."
                    )
                elif diff < 0:
                    trends.append(
                        f"A decline of grades from {score_from} to {score_to} in {grade_to}."
                    )
                else:
                    trends.append(
                        f"No changes in grades between {score_from} in {grade_from} and {score_to} in {grade_to}."
                    )

            overall_message = (
                "an overall improvement in performance."
                if overall_trend > 0 else
                "an overall decline in performance."
                if overall_trend < 0 else
                "no significant change in performance."
            )

            trends_message = ' '.join(trends) if trends else ""
            if trends_message:
                trends_message += " "  # Add a space after trends for proper separation

            interpretation = (
                f"The bar graph depicts: {trends_message}"
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
        subject_name = data.get('subject_name', "Unknown Subject")  # Default to "Unknown Subject" if not provided

        # Ensure the necessary quarters are available
        required_quarters = ["1st Quarter", "2nd Quarter", "3rd Quarter"]
        missing_quarters = [q for q in required_quarters if q not in labels]

        predicted_grade = None
        prediction_made = False

        # Determine the next quarter to predict
        if len(labels) < 4:
            next_quarter_number = len(labels) + 1
            next_quarter_label = format_quarter_label(next_quarter_number)

            # Check if conditions for prediction are met
            if (next_quarter_label == "2nd Quarter" and "1st Quarter" in labels) or \
               (next_quarter_label == "3rd Quarter" and all(q in labels for q in ["1st Quarter", "2nd Quarter"])) or \
               (next_quarter_label == "4th Quarter" and all(q in labels for q in ["1st Quarter", "2nd Quarter", "3rd Quarter"])):

                # Prepare feature vector for prediction
                recent_grade = bar_data[-1]
                subject_encoded = label_encoders['subject'].transform([subject_name])[0]
                quarter_encoded = label_encoders['quarter_with_label'].transform([next_quarter_label])[0]  # Use quarter_with_label

                features = pd.DataFrame({
                    'subject': [subject_encoded],
                    'quarter_with_label': [quarter_encoded],  # Correct column name
                    'previous_grade': [recent_grade]
                })

                # Predict the next grade
                predicted_grade = grade_model.predict(features)[0]
                predicted_grade = round(predicted_grade)
                predicted_grade = min(predicted_grade, 100)  # Cap grade at 100

                # Update data with prediction
                bar_data.append(predicted_grade)
                labels.append(next_quarter_label)
                prediction_made = True

        # Interpretation logic
        interpretation = ""

        if len(bar_data) > 1:
            # Exclude the predicted grade from comparisons
            grade_differences = [
                bar_data[i] - bar_data[i - 1] for i in range(1, len(bar_data) - (1 if prediction_made else 0))
            ]

            # Detailed interpretation for each quarter
            quarter_differences = []
            for i, diff in enumerate(grade_differences):
                if diff > 0:
                    quarter_differences.append(
                        f"The grade improved by {diff} from {labels[i]} to {labels[i + 1]}."
                    )
                elif diff < 0:
                    quarter_differences.append(
                        f"The grade dropped by {abs(diff)} from {labels[i]} to {labels[i + 1]}."
                    )
                else:
                    quarter_differences.append(
                        f"The grade remained the same between {labels[i]} and {labels[i + 1]}."
                    )

            interpretation += " ".join(quarter_differences)

        else:
            interpretation += "Insufficient number of grades to determine trends."

        # Add prediction or prediction skipped message
        if prediction_made and predicted_grade is not None:
            prediction_message = f"The predicted grade of the student for the next quarter is {predicted_grade}."
        elif not prediction_made and missing_quarters:
            prediction_message = f"Prediction skipped: Missing grades for {', '.join(missing_quarters)}."
        else:
            prediction_message = ""

        # Overall summary
        if len(bar_data) > 1:
            all_positive_or_zero = all(diff >= 0 for diff in grade_differences)
            all_negative_or_zero = all(diff <= 0 for diff in grade_differences)
            all_zero_changes = all(diff == 0 for diff in grade_differences)

            if all_zero_changes:
                overall_message = "Overall, the student's grades remained consistent across quarters."
            elif all_positive_or_zero:
                overall_message = "Overall, the student's grades have shown an improvement in the subject across quarters."
            elif all_negative_or_zero:
                overall_message = "Overall, the student's grades have shown a decline in the subject across quarters."
            else:
                overall_message = "Overall, the student's grades varied across quarters."
        else:
            overall_message = ""

        # Combine all messages with the proper order
        interpretation = " ".join(filter(None, [interpretation, prediction_message, overall_message]))

        return jsonify({
            "interpretation": interpretation,
            "grades": bar_data,
            "labels": labels,
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
        student_counts = data.get('studentCounts', [])

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
            highest_students = student_counts[max_gwa_index]
            lowest_students = student_counts[min_gwa_index]

            below_threshold = [
                f"{labels[i]} (GWA: {gwa}, Students: {student_counts[i]})"
                for i, gwa in enumerate(bar_data)
                if gwa < 80
            ]

            interpretation = (
                f"The grade level with the highest average GWA is {highest_grade} with a GWA of {max_gwa} "
                f"for a total of {highest_students} students, while the grade level with the lowest average GWA is {lowest_grade} "
                f"with a GWA of {min_gwa} for a total of {lowest_students} students. "
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
            selected_students = student_counts[0] if student_counts else 0
            if selected_gwa < 80:
                return (
                    f"The {selected_students} {grade} students with an average GWA of {selected_gwa} indicates a decline as it is below 80."
                )
            else:
                return (
                   f"The {selected_students} {grade} students with an average GWA of {selected_gwa} is decent as it is above 80."
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

                if abs(diff) >= 1.0:
                    if diff > 0:
                        significant_changes.append(
                            f"Significant improvement from {score_from} to {score_to} ({grade_from} to {grade_to}) "
                            f"with {student_counts[i]} students."
                        )
                    else:
                        significant_changes.append(
                            f"Significant decline from {score_from} to {score_to} ({grade_from} to {grade_to}) "
                            f"with {student_counts[i]} students."
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
