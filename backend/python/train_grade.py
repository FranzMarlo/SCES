import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib


data_path = "grades.csv"
data = pd.read_csv(data_path)

data['quarter_order'] = data['quarter'].map({
    '1st': 1, '2nd': 2, '3rd': 3, '4th': 4
})
data = data.sort_values(by=['student_id', 'quarter_order'])

data['previous_grade'] = data.groupby(['student_id', 'subject'])['grade'].shift(1)

data = data.dropna(subset=['previous_grade'])
            
data['quarter_with_label'] = data['quarter'].astype(str) + ' Quarter'

label_encoders = {
    column: LabelEncoder() for column in ['subject', 'quarter_with_label']
}

for column, encoder in label_encoders.items():
    data[column] = encoder.fit_transform(data[column])

X = data[['subject', 'quarter_with_label', 'previous_grade']] 
y = data['grade']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

grade_model = RandomForestRegressor(n_estimators=100, random_state=42)
grade_model.fit(X_train, y_train)

grade_predictions = grade_model.predict(X_test)
mse = mean_squared_error(y_test, grade_predictions)
print("Grade Prediction MSE:", mse)

joblib.dump(grade_model, "grade_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")
