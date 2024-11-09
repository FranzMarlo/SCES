# train_models.py (Optional utilities for encoding, not required for main functionality)
from sklearn.preprocessing import LabelEncoder
import joblib

# Sample remarks categories to encode
remarks = ["Outstanding", "Very Good", "Good", "Fair", "Failed"]

# Initialize and save the label encoder for potential reuse
label_encoder = LabelEncoder()
label_encoder.fit(remarks)
joblib.dump(label_encoder, 'remarks_label_encoder.pkl')

print("Label encoder saved.")
