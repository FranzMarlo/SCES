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
                    f"Improvement in GWA from {gwa_from} to {gwa_to} between {grade_from} and {grade_to}."
                )
            elif diff < 0:
                insights.append(
                    f"Decline in GWA from {gwa_from} to {gwa_to} between {grade_from} and {grade_to}."
                )
            else:
                insights.append(
                    f"No changes in GWA between {grade_from} and {grade_to}."
                )

        # Determine overall trend and provide recommendations
        if overall_trend > 0:
            overall_message = (
                "Overall, the student's academic performance shows a notable improvement. "
                "This progress reflects the student's commendable effort and dedication. Continue to encourage the student by recognizing their achievements, "
                "providing opportunities for advanced learning or enrichment activities, and offering constructive feedback to sustain this upward trajectory. "
                "Collaborating with the student to set specific academic goals can further reinforce this progress."
            )
        elif overall_trend < 0:
            overall_message = (
                "Overall, the student's academic performance shows a decline, indicating potential areas of difficulty. "
                "Identify specific subjects or areas where the student is struggling and provide targeted support. "
                "Consider to held a consultation with the student to better address the student's needs. "
                "Lastly, maintain regular communication with the student to understand any challenges and provide timely interventions to help improve performance."
            )
        else:
            overall_message = (
                "Overall, the student's academic performance has remained stable without significant changes. "
                "While consistency is commendable, encouraging the student to strive for growth by assigning more challenging tasks, "
                "promoting participation in extracurricular academic opportunities, and offering personalized feedback to identify and develop areas for improvement would be beneficial. "
                "Providing support to the student in setting higher academic goals and monitoring progress can help the student unlock their full potential."
            )

        response = {
            "overall_message": overall_message,
            "insights": insights,
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

        if subject_filter == "All":
            if not labels or not bar_data:
                return jsonify({
                    "interpretation": "No data available to analyze."
                }), 200

            if len(bar_data) < 2:
                return jsonify({
                    "interpretation": "Only one grade is available, cannot perform analysis."
                    if len(bar_data) == 1 else "No grade data available for analysis."
                }), 200
            
            if all(grade == bar_data[0] for grade in bar_data):
                if bar_data[0] < 80:
                    interpretation = (
                        "The student has consistent difficulties across all subjects. "
                        "Identify the root causes of these challenges, such as the specific lessons for each subject. "
                        "Providing additional support, learning resources, and assessments may help address these difficulties."
                    )
                else:
                    interpretation = (
                        "The student excels consistently across all subjects. "
                        "Provide enrichment opportunities, such as advanced learning tasks or quizzes, to further challenge the student and nurture their potential."
                    )
                return jsonify({"interpretation": interpretation}), 200

            max_index = bar_data.index(max(bar_data))
            min_index = bar_data.index(min(bar_data))
            if quarter_filter == "All":
                interpretation = (
                    f"The student excels in {labels[max_index]} and has difficulties in {labels[min_index]}. "
                    f"Provide additional support to the student on {labels[min_index]} by holding a consultation and identifying the specific lessons that the student had difficulties with. "
                    f"Meanwhile, recognizing the achievements and excellence of the student in {labels[max_index]} can help the student to boost their confidence to strive harder in studying."
                )
            else:
                interpretation = (
                    f"In the {quarter_filter} quarter, the student excels in {labels[max_index]} and has difficulties in {labels[min_index]}. "
                    f"Provide focused support to the student for {labels[min_index]} and sustain the high performance in {labels[max_index]} by offering engaging and challenging quizzes or assessments."
                )
            return jsonify({"interpretation": interpretation}), 200

        else:
            if not bar_data:
                # No grade data available for the specific subject
                return jsonify({
                    "initial": "No grade data is available for this subject.",
                    "trends": [],
                    "overall_message": "No performance trends can be analyzed without sufficient data."
                }), 200

            if len(bar_data) == 1:
                # Only one grade is available for the specific subject
                single_grade = bar_data[0]
                return jsonify({
                    "initial": f"The student has only one grade ({single_grade}) available for analysis in the subject.",
                    "trends": [],
                    "overall_message": "With only one grade, trends cannot be established."
                }), 200

            # Rest of the logic for multiple grades continues below
            if quarter_filter == "All":
                initial = "Based on the analysis of the student's grade on the subject across grade levels, the following insights were identified:"
            else:
                initial = f"Based on the analysis of the student's grade on the subject during {quarter_filter} Quarter across grade levels, the following insights were identified:"

            # Initialize trend counters
            improvements = 0
            declines = 0
            no_changes = 0
            trends = []
            overall_trend = 0

            # Analyze grade trends
            for i in range(1, len(bar_data)):
                grade_from = labels[i - 1]
                grade_to = labels[i]
                score_from = bar_data[i - 1]
                score_to = bar_data[i]
                diff = score_to - score_from
                overall_trend += diff

                if diff > 0:
                    improvements += 1
                    trends.append(f"An improvement of grades from {score_from} to {score_to} in {grade_to}.")
                elif diff < 0:
                    declines += 1
                    trends.append(f"A decline of grades from {score_from} to {score_to} in {grade_to}.")
                else:
                    no_changes += 1
                    trends.append(f"No changes in grades between {score_from} in {grade_from} and {score_to} in {grade_to}.")

            # Determine overall message based on trend counts
            if improvements > declines:
                overall_message = (
                    "Overall, the student showed an improvement in performance on the subject. "
                    "Continue to foster effective learning environments and recognize the student's efforts, while introducing advanced learning opportunities to sustain improvement."
                )
            elif declines > improvements:
                overall_message = (
                    "Overall, the student showed a decline in performance on the subject. "
                    "Focus closely on the student to identify underlying issues and implement strategies for improvement, such as personalized learning plans or additional support."
                )
            elif improvements == declines and (improvements > 0 or declines > 0):
                overall_message = (
                    "Overall, the student's performance fluctuated across grade levels. "
                    "Encourage consistent efforts and provide support to achieve steady progress."
                )
            else:
                overall_message = (
                    "Overall, there are no significant changes in the performance of the student on the subject. "
                    "Motivate the student to aim for higher achievement by setting challenging yet attainable goals and providing encouragement."
                )

            response = {
                "initial": initial,
                "trends": trends,
                "overall_message": overall_message
            }
            return jsonify(response), 200


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
        # Interpretation logic
        interpretation = ""

        # Add prediction or prediction-skipped message
        if prediction_made and predicted_grade is not None:
            prediction_message = f"Based on the previous grades, the predicted grade for the next quarter ({labels[-1]}) is {predicted_grade}. This suggests that the student {'will likely maintain an excellent academic performance in ' + subject_name if predicted_grade >= 85 else 'needs improvement in ' + subject_name}. To improve or maintain the performance in the subject, encourage the student to focus on studying harder."
        elif not prediction_made and missing_quarters:
            prediction_message = f"Prediction skipped: Missing grades for {', '.join(missing_quarters)}. Please provide more data for accurate predictions."
        else:
            prediction_message = ""

        # Overall summary with consistency analysis
        if len(bar_data) > 1:
            grade_differences = [
                bar_data[i] - bar_data[i - 1] for i in range(1, len(bar_data) - (1 if prediction_made else 0))
            ]

            all_positive_or_zero = all(diff >= 0 for diff in grade_differences)
            all_negative_or_zero = all(diff <= 0 for diff in grade_differences)
            all_zero_changes = all(diff == 0 for diff in grade_differences)

            if all_zero_changes:
                overall_message = (
                    "The student's grades have stayed the same across all the quarters which shows a consistent academic performance in subject.  "
                    "It might be helpful to encourage the student to pursue higher goals for continued growth."
                )
            elif all_positive_or_zero:
                overall_message = (
                    "The student's grades have improved each quarter, which is a great achievement for the student. "
                    "To keep this trend, encourage the student to maintain focus on studying while striving for improvement."
                )
            elif all_negative_or_zero:
                overall_message = (
                    "The student's grades have gone down each quarter. This could mean that the student is facing challenges. "
                    "Consider providing extra support and identify the specific lessons in " + subject_name + " where the student needs help."
                )
            else:
                overall_message = (
                    "The student's grades have been unstable across quarters. This shows inconsistent performance. "
                    "Helping the student build better study routines and monitoring progress can lead to steady improvement in the subject."
                )
        else:
            overall_message = "Not enough data is available to provide insights into the student's performance over time."


        # Combine all messages with the proper order
        interpretation = " ".join(filter(None, [prediction_message, overall_message]))

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
                "introduction": "No valid data available for the selected filters.",
                "trends": [],
                "conclusion": "Please check your data source.",
                "recommendation": ""
            }), 200

        # Helper functions
        def analyze_all_grades():
            trends = []
            max_gwa = max(bar_data)
            min_gwa = min(bar_data)
            max_gwa_index = bar_data.index(max_gwa)
            min_gwa_index = bar_data.index(min_gwa)

            trends.append(f"Highest GWA: {labels[max_gwa_index]} with an average GWA of {max_gwa} for a total of {student_counts[max_gwa_index]} students.")
            trends.append(f"Lowest GWA: {labels[min_gwa_index]} with an average GWA of {min_gwa} for a total of {student_counts[min_gwa_index]} students.")

            below_threshold = [
                f"The {student_counts[i]} students of {labels[i]} indicates a decline in performance as the average GWA {gwa} is lower than 80."
                for i, gwa in enumerate(bar_data)
                if gwa < 80
            ]

            if below_threshold:
                trends.extend(below_threshold)

            return {
                "introduction": "Based on the chart above, the following insights are identified:",
                "trends": trends,
                "conclusion": "Significant differences in performance exist among the grade levels.",
                "recommendation": "Focus on improving the learning strategies for grade levels with low performance through interventions like tutoring, mentoring, or enhanced teaching strategies."
            }

        def analyze_specific_grade():
            selected_gwa = bar_data[0]
            selected_students = student_counts[0] if student_counts else 0
            trends = [f"The {selected_students} students from {grade} achieved an average GWA of {selected_gwa}"]

            if selected_gwa < 80:
                conclusion = f"The {selected_students} students from {grade} in year {year} indicates a need for improvement."
                recommendation = f"Identifying the specific lessons for each subjects that the {selected_students} students had a hard time can enhance the learning strategies for the next {grade} students."
            else:
                conclusion = f"The {selected_students} students from {grade} in year {year} reflects good performance."
                recommendation = f"Maintaining or enhancing the learning strategies for the new {grade} students can sustain improvement of the grade level in academic performance."

            return {
                "introduction": f"Analysis for the performance of {grade} in year {year}:",
                "trends": trends,
                "conclusion": conclusion,
                "recommendation": recommendation
            }

        def analyze_trends():
            trends = []
            overall_trend = 0

            for i in range(1, len(bar_data)):
                diff = bar_data[i] - bar_data[i - 1]
                overall_trend += diff
                grade_from = labels[i - 1][:4]
                grade_to = labels[i][:4]
                student_from = student_counts[i - 1]
                student_to = student_counts[i]

                if abs(diff) > 0:  # Significant change
                    if diff > 0:
                        trends.append(f"An improvement from the {bar_data[i-1]} average GWA of {student_from} students from year {grade_from} to {bar_data[i]} average GWA of {student_to} students of year {grade_to}.")
                    elif diff < 0:
                        trends.append(f"A decline from the {bar_data[i-1]} average GWA of {student_from} students from year {grade_from} to {bar_data[i]} average GWA of {student_to} students of year {grade_to}.")
                    else:
                        trends.append(f"No significant changes between the average GWA of {student_from} students from year {grade_from} and average GWA of {student_to} students of year {grade_to}.")
            if trends:
                overall_message = (
                    "an improvement" if overall_trend > 0
                    else "a decline" if overall_trend < 0
                    else "no significant change"
                )
                return {
                    "introduction": f"Based on the chart above, the {grade} had significant changes such as:",
                    "trends": trends,
                    "conclusion": f"Overall, there is {overall_message} in performance.",
                    "recommendation": f"Investigate the causes of changes and maintain learning strategies to ensure consistent improvement."
                }
            else:
                return {
                    "introduction": f"Based on the chart above, no significant changes were observed for {grade}.",
                    "trends": [],
                    "conclusion": "Overall, performance remained consistent with no major fluctuations.",
                    "recommendation": "Continue monitoring performance trends while maintaining current learning strategies."
                }
        # Main logic
        if grade == "All":
            result = analyze_all_grades()
        elif year != "All" and grade != "All":
            result = analyze_specific_grade()
        else:
            result = analyze_trends()

        # Return structured response
        return jsonify(result)

    except Exception as e:
        return jsonify({
            "introduction": "An error occurred during analysis.",
            "trends": [],
            "conclusion": "Unable to process the request.",
            "recommendation": str(e)
        }), 500



if __name__ == '__main__':
    app.run(debug=True)
