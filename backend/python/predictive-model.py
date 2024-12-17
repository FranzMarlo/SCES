from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import joblib
import pandas as pd
import random

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
        def get_random_improved_recommendation():
            recommendations = [
                "Collaborate with the student in setting specific academic goals to further reinforce and maintain the improvement of the student.",
                "Encourage the student to engage in additional learning resources to support consistent academic growth.",
                "Provide regular feedback and monitor progress to ensure the student stays on track with their academic goals.",
                "Suggest participation in group study sessions to enhance peer learning and reinforce concepts.",
                "Offer targeted exercises or enrichment activities to address areas where the student may need improvement.",
                "Celebrate the student's progress and encourage continued effort to sustain positive performance.",
                "Engage parents or guardians in supporting the student’s learning environment at home.",
                "Encourage the student to develop better time management and study habits to optimize performance.",
                "Provide mentorship or tutoring opportunities to reinforce the student's understanding of challenging subjects.",
                "Motivate the student to reflect on their academic achievements and identify strategies for continued improvement."
            ]

            return random.choice(recommendations)
        def get_random_decline_recommendation():
            recommendations = [
                "Maintain regular communication with the student to identify any challenges and provide timely interventions to monitor the progress of the student.",
                "Schedule frequent progress review meetings with the student to address difficulties and provide personalized guidance for improvement.",
                "Create a supportive feedback system where the student can share their challenges, and actionable advice can be given promptly.",
                "Work closely with the student to identify specific areas of concern and implement targeted strategies to address these issues.",
                "Regularly check in with the student to offer encouragement, track progress, and provide additional resources as needed.",
                "Encourage open communication between teachers, parents, and the student to collaboratively monitor progress and resolve challenges quickly.",
                "Establish periodic assessments to monitor the student's progress and make adjustments to interventions where necessary.",
                "Organize one-on-one discussions to provide the student with timely feedback and clarify concepts they find difficult.",
                "Implement a weekly tracking system to review the student’s academic progress and provide constructive support for improvement.",
                "Collaborate with the student in setting realistic goals and provide ongoing monitoring to ensure they stay on track toward their objectives."
            ]
            return random.choice(recommendations)

        def get_random_stable_recommendation():
            recommendations = [
                "Provide support to the student in setting higher academic goals to encourage the student to improve academic performance.",
                "Encourage the student to engage in group study sessions to enhance collaborative learning skills.",
                "Offer constructive feedback on areas where the student can improve and celebrate their achievements.",
                "Create a personalized learning plan tailored to the student's strengths and weaknesses.",
                "Motivate the student to participate in extracurricular activities to balance academics with personal development.",
                "Introduce new and challenging learning opportunities to keep the student engaged and motivated.",
                "Schedule regular check-ins to monitor the student’s progress and provide timely guidance.",
                "Promote active engagement in classroom discussions to improve critical thinking and confidence.",
                "Recommend additional resources, such as online tutorials or study materials, to support learning outside the classroom.",
                "Encourage the student to set short-term goals and reward themselves upon achieving them to build self-discipline and focus."
            ]
            return random.choice(recommendations)

        improvement_count = 0
        decline_count = 0
        stable_count = 0

        for i in range(1, len(gwa_values)):
            gwa_from = int(gwa_values[i - 1])
            gwa_to = int(gwa_values[i])
            diff = gwa_to - gwa_from

            if diff > 0:
                improvement_count += 1
                insights.append(
                    f"Improvement in GWA from {gwa_from} to {gwa_to} between {grade_levels[i - 1]} and {grade_levels[i]}."
                )
            elif diff < 0:
                decline_count += 1
                insights.append(
                    f"Decline in GWA from {gwa_from} to {gwa_to} between {grade_levels[i - 1]} and {grade_levels[i]}."
                )
            else:
                stable_count += 1
                insights.append(
                    f"No changes in GWA between {grade_levels[i - 1]} and {grade_levels[i]}."
                )

        # Determine the overall trend
        if improvement_count > decline_count and improvement_count > stable_count:
            overall_message = "The student's academic performance shows a notable improvement."
            recommendation = get_random_improved_recommendation()
            warning = 1
        elif decline_count > improvement_count:
            overall_message = "The student's academic performance shows a decline, indicating potential areas of difficulty."
            recommendation = get_random_decline_recommendation()
            warning = 0
        else:
            overall_message = "The student's academic performance has remained stable without significant changes."
            recommendation = get_random_stable_recommendation()
            warning = 2

        response = {
            "overall_message": overall_message,
            "insights": insights,
            "warning": warning,
            "recommendation": recommendation,
        }
        return jsonify(response)

    except Exception as e:
        # Handle exceptions
        return jsonify({"error": str(e)}), 500


@app.route('/interpret-grades', methods=['POST'])
def interpret_grades():
    try:
        def get_random_all_decent_recommendation(label):
            recommendations = [
                f"Provide additional support to the student on {label} by holding a consultation and identifying the specific lessons that the student had difficulties with.",
                f"Encourage the student to review foundational concepts in {label} and provide supplementary materials to strengthen their understanding.",
                f"Organize a peer tutoring session in {label} to allow the student to learn collaboratively and address areas of difficulty.",
                f"Design an interactive learning activity focused on {label} to boost the student's engagement and understanding of challenging topics.",
                f"Discuss the student's performance in {label} during a parent-teacher meeting to explore ways to support them at home.",
                f"Recommend additional practice exercises in {label} to help the student improve their skills and confidence in the subject.",
                f"Introduce multimedia resources, such as videos or games, to make learning {label} more engaging and accessible for the student.",
                f"Set short-term, achievable goals in {label} for the student to regain confidence and track progress effectively.",
                f"Schedule a one-on-one session with the student to address specific challenges they face in {label} and develop a personalized learning plan.",
                f"Monitor the student’s progress in {label} closely and provide regular feedback to encourage continuous improvement."
            ]
            return random.choice(recommendations)
        def get_random_all_decline_recommendation(label):
            recommendations = [
                f"Provide focused support to the student for {label} by identifying the specific lessons that the student had difficulties.",
                f"Consider scheduling additional tutoring sessions for {label} to address identified weaknesses.",
                f"Encourage the student to review past topics in {label} to build a stronger foundation.",
                f"Integrate interactive learning materials to make {label} more engaging and easier to understand.",
                f"Work with the student to create a detailed study plan tailored to improving their performance in {label}.",
                f"Conduct regular assessments in {label} to track progress and adjust the learning approach as needed.",
                f"Offer additional resources, such as videos or practice problems, to help the student master {label}.",
                f"Provide positive reinforcement to motivate the student to continue improving in {label}.",
                f"Collaborate with the student's teachers to address specific challenges faced in {label}.",
                f"Encourage group study or peer learning sessions focused on {label} to foster collaborative improvement.",
            ]
            return random.choice(recommendations)
        def generate_subject_improvment_recommendation():
            recommendations = [
                "Continue to foster effective learning environments and recognize the student's efforts, while introducing advanced learning opportunities to sustain improvement.",
                "Motivate the student by setting challenging yet attainable goals to encourage consistent progress and build confidence.",
                "Provide personalized learning plans to address specific weaknesses and build upon the student's strengths for continued growth.",
                "Encourage the student to engage in collaborative projects or activities to enhance learning and build teamwork skills.",
                "Recognize and celebrate small achievements to keep the student motivated and focused on long-term goals.",
                "Offer additional support through tutoring or extra materials to strengthen understanding in areas of difficulty.",
                "Encourage active participation in class discussions and activities to boost engagement and comprehension.",
                "Introduce a rewards system for meeting specific academic milestones to maintain enthusiasm and drive.",
                "Collaborate with parents or guardians to ensure the student receives consistent support at home and in school.",
                "Focus on developing critical thinking and problem-solving skills to prepare the student for advanced academic challenges."
            ]
            return random.choice(recommendations)
        def generate_subject_decline_recommendation():
            recommendations = [
                "Focus closely on the student to identify underlying issues and implement strategies for improvement, such as personalized learning plans or additional support.",
                "Encourage the student to actively participate in discussions and group activities to enhance engagement and understanding.",
                "Provide additional practice exercises or tutoring sessions for areas where the student demonstrates difficulty.",
                "Set specific, achievable goals for the student to help track progress and maintain motivation.",
                "Regularly communicate with parents or guardians to build a support system and share strategies for improvement.",
                "Use creative and interactive teaching methods to make learning more engaging and tailored to the student's needs.",
                "Monitor the student's progress closely and adjust learning strategies based on performance trends.",
                "Offer rewards or recognition for the student’s efforts to foster a positive learning environment and encourage improvement.",
                "Create a structured study plan that focuses on challenging topics while reinforcing existing strengths.",
                "Work collaboratively with other educators to identify and implement best practices for supporting the student's academic growth."
            ]
            return random.choice(recommendations)
        def get_subject_unstable_recommendation():
            recommendations = [
                "Encourage consistent efforts and provide support to achieve steady progress.",
                "Motivate the student to set clear goals and work diligently toward achieving them.",
                "Provide regular feedback to help the student focus on areas for improvement.",
                "Foster a positive learning environment to build the student's confidence.",
                "Offer additional resources or tutoring to strengthen understanding in challenging areas.",
                "Celebrate small successes to keep the student motivated and engaged.",
                "Work with the student to develop a structured study plan for better results.",
                "Encourage collaboration with peers to enhance learning through group activities.",
                "Help the student identify and overcome obstacles that may hinder progress.",
                "Support the student with personalized learning strategies to address individual needs."
            ]
            return random.choice(recommendations)
        def get_subject_nochanges_recommendation():
            recommendations = [
                "Motivate the student to aim for higher achievement by setting challenging yet attainable goals and providing encouragement.",
                "Encourage the student to participate in group activities or study groups to foster collaborative learning and gain new insights.",
                "Provide personalized feedback to the student to help them understand their strengths and areas for improvement.",
                "Introduce creative and engaging learning methods to keep the student motivated and interested in the subject matter.",
                "Celebrate the student’s small victories to build their confidence and reinforce positive behaviors.",
                "Work with the student to create a study plan tailored to their needs, ensuring balanced preparation and progress tracking.",
                "Identify specific challenges the student is facing and provide targeted resources or assistance to address these areas.",
                "Encourage the student to set clear academic goals and periodically review their progress to maintain focus and motivation.",
                "Provide opportunities for the student to explore advanced topics or enrichment activities to sustain their curiosity and drive.",
                "Help the student balance their academic efforts with relaxation and hobbies to maintain mental well-being and prevent burnout."
            ]
            return random.choice(recommendations)
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
            
            max_index = bar_data.index(max(bar_data))
            min_index = bar_data.index(min(bar_data))
            strength = f"{labels[max_index]}"
            weakness = f"{labels[min_index]}"
            if max_index == min_index:
                interpretation = ("Unable to identify strength and weakness subject of the student")
                recommendation = ("Please provide more data to analyze the student's performance.")
                warning = 0
                strength = 0
                weakness = 0
            if min(bar_data) < 80:
                warning = 0
                interpretation = ("The student has an average grade below 80 for subject.")
                recommendation = get_random_all_decline_recommendation(labels[min_index])
                
            else:
                warning = 1
                interpretation = ("The student's average grades on all subject are decent.")
                recommendation = get_random_all_decent_recommendation(labels[min_index])
                
            return jsonify({
                "interpretation": interpretation,
                "recommendation": recommendation,
                "warning" : warning,
                "strength" : strength,
                "weakness" : weakness,
                }), 200

        else:
            if not bar_data:
                # No grade data available for the specific subject
                return jsonify({
                    "interpretation": "No grade data is available for this subject.",
                    "trends": [],
                    "recommendation": "Please insert grades of the student in the system if source is available.",
                    "warning" : 0
                }), 200

            if len(bar_data) == 1:
                # Only one grade is available for the specific subject
                single_grade = bar_data[0]
                return jsonify({
                    "interpretation": f"The student has only one grade ({single_grade}) available for analysis in the subject.",
                    "trends": [],
                    "recommendation": "Please insert grades of the student in the system if source is available.",
                    "warning" : 0
                }), 200

            # Rest of the logic for multiple grades continues below
            if quarter_filter == "All":
                initial = "Student's Grade on subject:"
            else:
                initial = f"Student's Grade on subject every {quarter_filter} Quarter:"

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
                    trends.append(f"Improvement of grades from {score_from} to {score_to} in {grade_to}.")
                elif diff < 0:
                    declines += 1
                    trends.append(f"Decline of grades from {score_from} to {score_to} in {grade_to}.")
                else:
                    no_changes += 1
                    trends.append(f"No changes in grades between {score_from} in {grade_from} and {score_to} in {grade_to}.")

            # Determine overall message based on trend counts
            if improvements > declines:
                interpretation = (
                    "The student showed an improvement in performance on the subject. "
                )
                recommendation = generate_subject_improvment_recommendation()
                warning = 1
            elif declines > improvements:
                interpretation = (
                    "The student showed a decline in performance on the subject. "
                )
                recommendation = generate_subject_decline_recommendation()
                warning = 0
            elif improvements == declines and (improvements > 0 or declines > 0):
                interpretation = (
                    "The student's performance fluctuated across grade levels. "
                )
                recommendation =  get_subject_unstable_recommendation()
                warning = 0
            else:
                interpretation = (
                    "There are no significant changes in the performance of the student on the subject. "
                )
                recommendation = get_subject_nochanges_recommendation()
                warning = 0
                
            response = {
                "interpretation": interpretation,
                "trends": trends,
                "recommendation": recommendation,
                "warning": warning,
                "initial": initial,
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

        recommendations = [
            "Identify the specific lessons or topics in {subject} that the student has difficulties with.",
            "It might help to focus on reviewing the core concepts of {subject} to improve understanding.",
            "Consider providing extra study resources for the student in {subject} to strengthen their foundation.",
            "Offering additional tutoring sessions in {subject} could provide the student with the necessary support.",
            "Provide the student with practice exercises in {subject} to reinforce learning and improve grades.",
            "Encourage the student to seek help on specific topics in {subject} they find challenging.",
            "Consider organizing group study sessions or peer learning in {subject} to improve performance.",
            "It may be helpful to break down the lessons in {subject} into smaller, manageable parts for the student.",
            "Suggest using online resources or tutorials for additional practice and better understanding in {subject}.",
            "Working on consistent review sessions in {subject} could greatly benefit the student's progress."
        ]
        
        def generate_recommendation(subject_name):
            recommendation = random.choice(recommendations).format(subject=subject_name)
            return recommendation
        
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

        # Initialize separated messages
        prediction_message = ""
        recommendation = ("No actions required as the student's grade are above 80.")
        low_grades = ""

        # Check for unusual grades (grades or predicted grades below 80)
        if any(grade < 80 for grade in bar_data) or (predicted_grade is not None and predicted_grade < 80):
            # Collect grades and their corresponding quarters below 80
            low_grades = [
                f"{labels[i]}: {grade}" for i, grade in enumerate(bar_data) if grade < 80
            ]
                
            recommendation = generate_recommendation(subject_name)
                
        if prediction_made and predicted_grade is not None:
            prediction_message = f"Based on the previous grades, the predicted grade for the next quarter ({labels[-1]}) is {predicted_grade}. This suggests that the student {'will likely maintain an excellent academic performance in ' + subject_name if predicted_grade >= 85 else 'needs improvement in ' + subject_name}."
        elif not prediction_made and missing_quarters:
            prediction_message = f"Prediction skipped: Missing grades for {', '.join(missing_quarters)}. Please provide more data for accurate predictions."

        

        # Return JSON with separated interpretation messages
        return jsonify({
            "prediction_message": prediction_message,
            "recommendation": recommendation,
            "grades": bar_data,
            "labels": labels,
            "predicted_grade": predicted_grade,
            "next_quarter": labels[-1],
            "low_grades" : low_grades
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
                "initial": "",
                "trends": [],
                "interpretation": "No data found for the selected filter",
                "recommendation": "Please insert data if source is available",
                "warning": 0
            }), 200

        def get_learning_strategy_recommendation():
            recommendations = [
                "Focus on improving the learning strategies for grade levels with low performance through interventions like tutoring, mentoring, or enhanced teaching strategies.",
                "Identify specific subjects or topics causing difficulty and address them with tailored review sessions and supplementary materials.",
                "Implement interactive teaching techniques to engage the students and clarify challenging concepts in low-performing areas.",
                "Encourage consistent practice and reinforcement for subjects where the students has struggled to build confidence and competence.",
                "Introduce peer tutoring programs to allow the students learn from their classmates who excel in areas of difficulty.",
                "Conduct regular check-ins to monitor progress and adapt teaching methods for subjects where performance has been historically low.",
                "Collaborate with the students to set realistic improvement goals and provide resources to help them achieve better outcomes.",
                "Use visual aids, such as charts or diagrams, to simplify complex concepts in subjects where students shows low performance.",
                "Integrate technology, like educational apps or online courses, to provide innovative solutions for improving weak grade levels.",
                "Encourage the students to reflect on their learning habits and develop better study routines for challenging subjects."
            ]
            return random.choice(recommendations)
        
        def get_specific_improvement_recommendation(selected_students, grade):
            recommendations = [
                f"Identifying the specific lessons for each subject that the {selected_students} students had a hard time can enhance the learning strategies for the next {grade} students.",
                f"Providing focused support for struggling topics among the {selected_students} students will help improve their understanding in preparation for the next {grade} students.",
                f"Reviewing quizzes and assessments to pinpoint weak areas for the {selected_students} students can enhance future learning outcomes for {grade} students.",
                f"Offering additional practice materials on difficult topics for the {selected_students} students will better prepare {grade} students for similar challenges.",
                f"Organizing consultations and reviews for the subjects where the {selected_students} students struggled will benefit the learning process for {grade} students.",
                f"Providing targeted tutoring sessions on challenging lessons for the {selected_students} students can optimize their performance and benefit future {grade} students.",
                f"Conducting workshops to address the lessons that posed difficulties for the {selected_students} students will create a stronger foundation for the next {grade} students.",
                f"Analyzing subject-specific challenges encountered by the {selected_students} students can refine teaching methods for {grade} students.",
                f"Creating tailored lesson plans to address weak points identified among the {selected_students} students will ensure better results for the upcoming {grade} students.",
                f"Encouraging collaborative learning among the {selected_students} students on difficult subjects can promote peer-driven improvement for the next {grade} students."
            ]
            return random.choice(recommendations)
        
        def get_specific_decent_recommendation(grade):
            recommendations = [
                f"Maintaining or enhancing the learning strategies for the new {grade} students can sustain improvement of the grade level in academic performance.",
                f"Focusing on interactive activities for {grade} students can further boost engagement and improve learning outcomes.",
                f"Providing additional support to {grade} students in challenging subjects will help maintain steady progress.",
                f"Encouraging collaborative learning among {grade} students can enhance their problem-solving skills and academic success.",
                f"Identifying and addressing the learning gaps of {grade} students can ensure consistent academic growth.",
                f"Implementing targeted revision sessions for {grade} students can reinforce understanding of key topics.",
                f"Offering personalized feedback to {grade} students will help them recognize strengths and areas for improvement.",
                f"Promoting a positive learning environment for {grade} students can contribute to higher academic achievements.",
                f"Introducing new teaching strategies for {grade} students can keep them engaged and motivated in their studies.",
                f"Monitoring the academic progress of {grade} students regularly will ensure early intervention where needed."
            ]
            
            return random.choice(recommendations)
        
        def get_trend_recommendation():
            recommendations = [
                "Investigate the causes of changes and maintain learning strategies to ensure consistent improvement.",
                "Encourage regular study habits and review lessons to address areas of weakness.",
                "Provide additional support for challenging topics to strengthen understanding.",
                "Focus on consistent practice and clarify doubts through consultations or tutoring.",
                "Analyze the students' progress and create a specialized learning plan for classes.",
                "Highlight strengths while addressing areas for improvement through targeted exercises.",
                "Encourage students to set achievable goals and monitor progress regularly.",
                "Provide constructive feedback to motivate and guide students toward improvement.",
                "Reinforce learning strategies by revisiting concepts where difficulties persist.",
                "Identify specific lessons or skills that require focus and allocate additional study time."
            ]
            return random.choice(recommendations)
        
        def analyze_all_grades():
            trends = []
            max_gwa = max(bar_data)
            min_gwa = min(bar_data)
            max_gwa_index = bar_data.index(max_gwa)
            min_gwa_index = bar_data.index(min_gwa)
            warning = 1
            interpretation = ("No grade levels indicated a decline in performance.")

            below_threshold = [
                f"{labels[i]}: {gwa}, Students: {student_counts[i]}"
                for i, gwa in enumerate(bar_data)
                if gwa < 80
            ]
            
            if below_threshold:
                trends.extend(below_threshold)
                warning = 0
                interpretation = ("Significant decline in performance exist among the grade levels.")
                
            recommendation = get_learning_strategy_recommendation()
            return {
                "initial": "Average GWA below threshold:",
                "warning": warning,
                "trends": trends,
                "interpretation": interpretation,
                "recommendation": recommendation,
                "highest": (f"{labels[max_gwa_index]}: {max_gwa}, Students: {student_counts[max_gwa_index]}"),
                "lowest": (f"{labels[min_gwa_index]}: {min_gwa}, Students: {student_counts[min_gwa_index]}")
            }

        def analyze_specific_grade():
            selected_gwa = bar_data[0]
            selected_students = student_counts[0] if student_counts else 0
            trends = [f"The {selected_students} students from {grade} achieved an average GWA of {selected_gwa}"]

            if selected_gwa < 80:
                interpretation = f"The {selected_students} students from {grade} in year {year} indicates a need for improvement."
                recommendation = get_specific_improvement_recommendation(selected_students, grade)
                warning = 0
            else:
                interpretation = f"The {selected_students} students from {grade} in year {year} reflects good performance."
                recommendation = get_specific_decent_recommendation(grade)
                warning = 1
                
            return {
                "initial": f"Yearly Average GWA of {grade}:",
                "trends": trends,
                "warning": warning,
                "interpretation": interpretation,
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

                if abs(diff) > 0:
                    if diff > 0:
                        trends.append(f"Improvement from {bar_data[i-1]} average GWA of {student_from} students from year {grade_from} to {bar_data[i]} average GWA of {student_to} students of year {grade_to}.")
                    elif diff < 0:
                        trends.append(f"Decline from {bar_data[i-1]} average GWA of {student_from} students from year {grade_from} to {bar_data[i]} average GWA of {student_to} students of year {grade_to}.")
                    else:
                        trends.append(f"No significant changes between average GWA of {student_from} students from year {grade_from} and average GWA of {student_to} students of year {grade_to}.")
            if trends:
                overall_message = (
                    "an improvement" if overall_trend > 0
                    else "a decline" if overall_trend < 0
                    else "no significant change"
                )
                warning = (1 if overall_trend > 0
                    else 1
                )
                return {
                    "initial": f"{grade} Average GWA:",
                    "trends": trends,
                    "warning": warning,
                    "interpretation": f"There is {overall_message} in performance of {grade} in the last school years.",
                    "recommendation": get_trend_recommendation()
                }
            else:
                return {
                    "initial": f"{grade} Average GWA:",
                    "trends": [],
                    "warning": warning,
                    "conclusion": f"The performance of {grade} students remained consistent with no major fluctuations in the last school years.",
                    "recommendation": get_trend_recommendation()
                }
        # Main logic
        if grade == "All":
            result = analyze_all_grades()
        elif year != "All" and grade != "All":
            result = analyze_specific_grade()
        else:
            result = analyze_trends()

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
