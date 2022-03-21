"""
Unit tests for JSON validation script
"""
import os
import json
import unittest
import pandas as pd

from backend.model.model import ModelHandling


FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__))
)

with open(os.path.join(FIXTURE_DIR, "test_events", "sample_test_event.json")) as json_file:
    SAMPLE_EVENT = json.load(json_file)

with open(os.path.join(FIXTURE_DIR, "test_events", "predict_test_event.json")) as json_file:
    PREDICT_EVENT = json.load(json_file)


class ModelTestCase(unittest.TestCase):
    """
    Unit test class.
    WARNING: order of tests is important!
    """
    def __init__(self, *args, **kwargs):
        """
        Override __init__ of unittest.Testcase
        """
        super().__init__(*args, **kwargs)
        self.csv_path = os.path.join(FIXTURE_DIR, "..", "model", "samples_test.csv")
        self.model_path = os.path.join(FIXTURE_DIR, "..", "model", "naive_bayes_classifier_test.pkl")

    def clean_up(self):
        """
        Remove all created files
        :return:
        """
        if os.path.exists(self.csv_path):
            os.remove(self.csv_path)

        if os.path.exists(self.model_path):
            os.remove(self.model_path)

    def test_1_add_first_sample(self):
        """
        Add first sample to the database
        :return:
        """
        model_handling = ModelHandling(SAMPLE_EVENT["testEventValid"], True)
        model_handling.merge_data()

        if not os.path.exists(self.csv_path):
            raise AssertionError("sample_test.csv file not found.")

    def test_2_train_model(self):
        """
        Train model based on previously added data
        :return:
        """
        model_handling = ModelHandling(SAMPLE_EVENT["testEventValid"], True)
        status, message = model_handling.train_model()

        if not os.path.exists(self.model_path):
            raise AssertionError("naive_bayes_classifier_test.pkl file not found.")

        self.assertEqual(200, status)
        self.assertEqual("Success", message)

    def test_3_predict_dataset(self):
        """
        Add another batch of data to the dataset and calculate predicted value
        :return:
        """
        model_handling = ModelHandling(SAMPLE_EVENT["testEventValid"], True)
        status, message = model_handling.handle_sample_request()

        df = pd.read_csv(self.csv_path)

        if "PredictedAccountNumber" not in df.columns:
            raise AssertionError("Predictions were not made")

        self.assertEqual(200, status)
        self.assertEqual("Success", message)

    def test_4_predict_value(self):
        """
        Predict single value
        :return:
        """
        model_handling = ModelHandling(PREDICT_EVENT["testEventValid"], True)
        status, message = model_handling.handle_predict_request()

        self.assertEqual(200, status)
        self.assertEqual(len(message), 1)

    def test_5_monitor_handling(self):
        """
        Not enough data for monitoring
        :return:
        """
        model_handling = ModelHandling(None, True)
        status, message = model_handling.handle_monitor_request()

        self.assertEqual(400, status)
        self.assertEqual("Not enough data", message)

    def test_6_predict_value_missing_model(self):
        """
        Predict single value, but model is missing
        :return:
        """
        self.clean_up()

        model_handling = ModelHandling(PREDICT_EVENT["testEventValid"], True)
        status, message = model_handling.handle_predict_request()

        self.assertEqual(400, status)
        self.assertEqual("Model is missing", message)

    def test_7_monitor_handling(self):
        """
        Missing data for monitoring
        :return:
        """
        model_handling = ModelHandling(None, True)
        status, message = model_handling.handle_monitor_request()

        self.assertEqual(400, status)
        self.assertEqual("No data", message)


if __name__ == "__main__":
    unittest.main()
