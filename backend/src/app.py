"""
Using flask to define and initialize both endpoints
"""
from flask import Flask, Response, request
# from json_validation import JSONValidation
from json_validation import JSONValidation

app = Flask('Online Learning API')
samples_path = "model/samples.csv"


@app.route('/sample', methods=['POST'])
def sample():
    """
    Function to process sample - accepts only POST requests.
    :return:
    """
    try:
        request_data = eval(request.get_data())
    except BaseException as error:
        return Response(str(error), status=400)

    # step 1: validate input
    for record in request_data:
        json_validation = JSONValidation("sample", record)
        status, message = json_validation.validate_json()
        if not status:
            return Response(message, status=400)

    # step 2: append data to samples.csv

    return Response("Success", status=200)


@app.route('/predict', methods=['POST'])
def predict():
    """
    Function to process predictions - accepts only POST requests.
    :return:
    """
    request_data = request.get_json()

    # step 1: validate input
    json_validation = JSONValidation("predict", request_data)
    status, message = json_validation.validate_json()
    if not status:
        return Response(message, status=400)

    # step 2: run predction

    return Response("Success", status=200)


@app.route('/monitor', methods=['GET'])
def monitor():
    """
    Report the precision and recall of the last 1000 samples.
    Only after 10k samples, else returns error.
    :return:
    """
    return "monitor"


app.run(port=5000)
