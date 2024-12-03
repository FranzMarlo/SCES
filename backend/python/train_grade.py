import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Step 1: Load the Data
data_path = "grades.csv"  # Use the updated CSV
data = pd.read_csv(data_path)

# Step 2: Sort Data and Create Features
# Sort the data by student_id and quarter to ensure the order of grades for each student
data['quarter_order'] = data['quarter'].map({
    '1st': 1, '2nd': 2, '3rd': 3, '4th': 4
})
data = data.sort_values(by=['student_id', 'quarter_order'])

# Step 3: Create a column for the previous grade for each student in each subject
data['previous_grade'] = data.groupby(['student_id', 'subject'])['grade'].shift(1)

# Drop rows where previous_grade is NaN (i.e., for the first quarter for each student)
data = data.dropna(subset=['previous_grade'])

# Step 4: Append Quarter to Quarter Feature
# Append quarter information as a string for model context (e.g., '1st', '2nd', etc.)
data['quarter_with_label'] = data['quarter'].astype(str) + ' Quarter'

# Step 5: Encode Categorical Features
label_encoders = {
    column: LabelEncoder() for column in ['subject', 'quarter_with_label']
}

# Apply encoding to each column
for column, encoder in label_encoders.items():
    data[column] = encoder.fit_transform(data[column])

# Step 6: Define Features and Target
# Use 'subject', 'quarter_with_label', and 'previous_grade' as features for prediction
X = data[['subject', 'quarter_with_label', 'previous_grade']]  # Input features
y = data['grade']  # Target for grade prediction

# Step 7: Split the Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 8: Train the Model
grade_model = RandomForestRegressor(n_estimators=100, random_state=42)
grade_model.fit(X_train, y_train)

# Step 9: Evaluate the Model
grade_predictions = grade_model.predict(X_test)
mse = mean_squared_error(y_test, grade_predictions)
print("Grade Prediction MSE:", mse)

# Step 10: Save the Model and Encoders
joblib.dump(grade_model, "grade_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")
