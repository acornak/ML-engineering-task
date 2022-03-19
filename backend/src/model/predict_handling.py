"""
Predict Handling class
"""
import os
import pandas as pd
import dill


FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
)


class PredictHandling:
    """
    Class to handle requests made to /predict endpoint
    """
    def __init__(self, data):
        """
        Initialization func for PredictHandling class.
        :param data: data from /predict endpoint.
        :type data: dict.
        """
        self.data = data

    def handle_predict(self):
        """
        Handle prediction using created classifier
        :return: status, message
        :rtype: dict
        """
        model_path = os.path.join(FIXTURE_DIR, "naive_bayes_classifier.pkl")

        try:
            loaded = dill.load(open(model_path, "rb"))
        except FileNotFoundError:
            return 400, "Model is missing"

        predicted = loaded.predict(pd.DataFrame([self.data]))

        return 200, predicted


if __name__ == "__main__":
    data = {
        "CompanyId": "int:a055470",
        "BankEntryDate": "2016-02-29",
        "BankEntryText": "str:6cd08e4 int:49fed34",
        "BankEntryAmount": "> -1000"
    }
    predict_handling = PredictHandling(data)
    status, message = predict_handling.handle_predict()

    print(status, message)