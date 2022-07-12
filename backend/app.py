"""
Using flask to define and initialize both endpoints
"""
import os
import json
from flask import Flask, Response, request, jsonify
from flask_cors import cross_origin
from model.model import ModelHandling
from validation.json_validation import JSONValidation

app = Flask('Online Learning API')


@app.route('/sample', methods=['POST'])
@cross_origin()
def sample():
    """
    Function to process sample - accepts only POST requests.
    :return:
    """
    request_data = request.get_data()
    try:
        json.loads(request_data)
    except ValueError as error:
        return Response(str(error), status=400)

    if len(request_data) == 0:
        return Response("Validation Error: Input is empty", status=400)

    for record in request_data:
        json_validation = JSONValidation("sample", record)
        status, message = json_validation.validate_json()
        if not status:
            return Response(message, status=400)

    model_handling = ModelHandling(request_data)
    status, message = model_handling.handle_sample_request()

    return Response(message, status=status)


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    """
    Function to process predictions - accepts only POST requests.
    :return:
    """
    request_data = request.get_json()

    json_validation = JSONValidation("predict", request_data)
    status, message = json_validation.validate_json()
    if not status:
        return Response(message, status=400)

    model_handling = ModelHandling(request_data)
    status, message = model_handling.handle_predict_request()

    if status == 200:
        return jsonify(message.tolist())

    return Response(message, status=status)


@app.route('/monitor', methods=['GET'])
@cross_origin()
def monitor():
    """
    Report the precision and recall of the last 1000 samples.
    Only after 10k samples, else returns error.
    :return:
    """
    model_handling = ModelHandling(None)
    status, message = model_handling.handle_monitor_request()

    if status == 200:
        return jsonify(message)

    return Response(message, status=status)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
