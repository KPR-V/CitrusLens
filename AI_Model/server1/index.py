from flask import Flask, request, jsonify
from model import predict_anomaly
import joblib
import pandas as pd
import os

app = Flask(__name__)

# Try to use flask_cors, fall back to manual CORS
try:
    from flask_cors import CORS
    CORS(app)
except ImportError:
    @app.after_request
    def add_cors_headers(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response

# Load model and scaler
model = joblib.load('isolation_forest_model.joblib')
scaler = joblib.load('scaler.joblib')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid input format"}), 400
        
        features = pd.DataFrame([data])
        result = predict_anomaly(features, model, scaler)
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "CitrusLens AI Model"
    })

# For local development
if __name__ == '__main__':
    app.run(debug=True, port=5000)

# For Vercel serverless
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"status": "healthy"}).encode())
        
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            features = pd.DataFrame([data])
            result = predict_anomaly(features, model, scaler)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
