import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import joblib

csv_file = "SCES DataCSV.csv"
df = pd.read_csv(csv_file)

df.columns = df.columns.str.strip().str.lower()
df['gwa'] = pd.to_numeric(df['gwa'], errors='coerce')
df.dropna(subset=['gwa'], inplace=True)

gwa_values = df['gwa'].tolist()
features = []
for i in range(1, len(gwa_values)):
    recent_gwa = gwa_values[i]
    cumulative_gwa = np.mean(gwa_values[:i + 1])
    gwa_trend = gwa_values[i] - gwa_values[0]
    features.append([recent_gwa, cumulative_gwa, gwa_trend])

labels_next_gwa = gwa_values[1:]  # Predict the next GWA
labels_success_rate = [np.mean(gwa_values[:i + 1]) for i in range(1, len(gwa_values))]

features_df = pd.DataFrame(features, columns=["recent_gwa", "cumulative_gwa", "gwa_trend"])
features_df["next_gwa"] = labels_next_gwa
features_df["success_rate"] = labels_success_rate

X = features_df[["recent_gwa", "cumulative_gwa", "gwa_trend"]]
y_next_gwa = features_df["next_gwa"]
y_success_rate = features_df["success_rate"]

X_train_gwa, X_test_gwa, y_train_gwa, y_test_gwa = train_test_split(X, y_next_gwa, test_size=0.2, random_state=42)
X_train_sr, X_test_sr, y_train_sr, y_test_sr = train_test_split(X, y_success_rate, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_sr_scaled = scaler.fit_transform(X_train_sr)  
X_test_sr_scaled = scaler.transform(X_test_sr) 

gwa_model = LinearRegression()
gwa_model.fit(X_train_gwa, y_train_gwa)
y_pred_gwa = gwa_model.predict(X_test_gwa)


print("GWA Prediction Model")
print("MSE:", mean_squared_error(y_test_gwa, y_pred_gwa))
print("R^2:", r2_score(y_test_gwa, y_pred_gwa))


success_rate_model = XGBRegressor(
    n_estimators=100,        
    learning_rate=0.1,      
    max_depth=5,            
    random_state=42,        
    objective='reg:squarederror',
)

success_rate_model.fit(X_train_sr_scaled, y_train_sr)
y_pred_sr = success_rate_model.predict(X_test_sr_scaled)


print("\nSuccess Rate Prediction Model (XGBoost)")
print("MSE:", mean_squared_error(y_test_sr, y_pred_sr))
print("R^2:", r2_score(y_test_sr, y_pred_sr))


joblib.dump(gwa_model, "gwa_model.pkl")
joblib.dump(success_rate_model, "success_rate_model.pkl")
joblib.dump(scaler, "scaler.pkl")  

print("\nModels saved: gwa_model.pkl, success_rate_model.pkl, scaler.pkl")
