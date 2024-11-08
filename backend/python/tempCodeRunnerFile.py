import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import joblib

# Sample GWA records data
gwa_records = [
    {"gwa": 85, "grade_section": "Grade 5 - Apple", "remarks": "Very Good"},
    {"gwa": 82, "grade_section": "Grade 4 - SSES", "remarks": "Good"},
    {"gwa": 79, "grade_section": "Grade 3 - SSES", "remarks": "Fair"},
    {"gwa": 90, "grade_section": "Grade 2 - SSES", "remarks": "Outstanding"},
    {"gwa": 87, "grade_section": "Grade 1 - SSES", "remarks": "Good"}
]

# Extract GWA values and remarks
gwa_values = [record["gwa"] for record in gwa_records]
remarks = [record["remarks"] for record in gwa_records]

# Encode remarks into numerical values
label_encoder = LabelEncoder()
remarks_encoded = label_encoder.fit_transform(remarks)

# Create lagged and cumulative features for GWA
lagged_gwa = [gwa_values[i - 1] if i > 0 else gwa_values[i] for i in range(len(gwa_values))]
cumulative_gwa = np.cumsum(gwa_values) / np.arange(1, len(gwa_values) + 1)
gwa_change = [gwa_values[i] - gwa_values[i - 1] if i > 0 else 0 for i in range(len(gwa_values))]

X = np.column_stack((gwa_values, lagged_gwa, remarks_encoded, cumulative_gwa, gwa_change))

# Targets for graduation, academic success rate, and next GWA
graduation_outcome = [1 if gwa >= 80 else 0 for gwa in gwa_values]
academic_success_rate = [
    gwa + (3 if remark == "Outstanding" else 1 if remark == "Very Good"
           else 0 if remark == "Good" else -2 if remark == "Fair" else -3)
    for gwa, remark in zip(gwa_values, remarks)
]
next_gwa_target = gwa_values[1:] + [gwa_values[-1]]  # Assuming the next GWA for the last record is same as the last GWA

# Convert targets to numpy arrays
y_grad = np.array(graduation_outcome)
y_success = np.array(academic_success_rate)
y_next_gwa = np.array(next_gwa_target)

# Split data into training and test sets
X_train, X_test, y_grad_train, y_grad_test, y_success_train, y_success_test, y_next_gwa_train, y_next_gwa_test = train_test_split(
    X, y_grad, y_success, y_next_gwa, test_size=0.2, random_state=42
)

# Graduation prediction model (Logistic Regression)
grad_model = LogisticRegression()
grad_model.fit(X_train, y_grad_train)

# Academic success model (Gradient Boosting Regressor)
success_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
success_model.fit(X_train, y_success_train)

# Next GWA prediction model (Gradient Boosting Regressor)
next_gwa_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
next_gwa_model.fit(X_train, y_next_gwa_train)

# Save models and label encoder
joblib.dump(grad_model, 'grad_model.pkl')
joblib.dump(success_model, 'success_model.pkl')
joblib.dump(next_gwa_model, 'next_gwa_model.pkl')
joblib.dump(label_encoder, 'remarks_label_encoder.pkl')

print("Training completed. Models and encoder saved.")
