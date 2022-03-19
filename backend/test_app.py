"""
Unit test
"""
import json
import os
from app import app
import pandas as pd
import unittest

FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__))
)


with open(os.path.join(FIXTURE_DIR, "test_events", "sample_test_event.json")) as json_file:
    SAMPLE_EVENT = json.load(json_file)

with open(os.path.join(FIXTURE_DIR, "test_events", "predict_test_event.json")) as json_file:
    PREDICT_EVENT = json.load(json_file)


class SampleTestCase(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        """
        Override __init__ of unittest.Testcase
        """
        super(SampleTestCase, self).__init__(*args, **kwargs)
        self.csv_path = os.path.join(FIXTURE_DIR, "model", "samples.csv")
        self.model_path = os.path.join(FIXTURE_DIR, "model", "naive_bayes_classifier.pkl")
        self.csv_path_renamed = os.path.join(FIXTURE_DIR, "model", "samples_.csv")
        self.model_path_renamed = os.path.join(FIXTURE_DIR, "model", "naive_bayes_classifier_.pkl")

    def prepare_folder(self):
        """
        Rename samples and model to make sure, they won't be a part of unit testing
        :return:
        """
        try:
            os.rename(self.csv_path, self.csv_path_renamed)
        except FileNotFoundError:
            pass

        try:
            os.rename(self.model_path, self.model_path_renamed)
        except FileNotFoundError:
            return

        return

    def cleanup_folder(self):
        """
        Rename samples and model back to their original state
        :return:
        """
        if os.path.exists(self.csv_path):
            os.remove(self.csv_path)

        try:
            os.rename(self.csv_path_renamed, self.csv_path)
        except FileNotFoundError:
            pass

        if os.path.exists(self.model_path):
            os.remove(self.model_path)

        try:
            os.rename(self.model_path_renamed, self.model_path)
        except FileNotFoundError:
            return

        return

    def test_sample_valid(self):
        """
        First test, needs to use prepare_folder() method!
        Test valid sample
        :return:
        """
        self.prepare_folder()

        tester = app.test_client(self)
        data = json.dumps(SAMPLE_EVENT["testEventValid"])
        response = tester.post("/sample", data=data, content_type="application/json")

        if not os.path.exists(self.csv_path):
            raise AssertionError("Samples.csv file was not created.")

        if not os.path.exists(self.model_path):
            raise AssertionError("Model file was not created.")

        self.cleanup_folder()

        self.assertEqual(200, response.status_code)
        self.assertEqual("Success", response.data.decode())

    def test_sample_invalid(self):
        """

        :return:
        """
        tester = app.test_client(self)
        data = json.dumps(SAMPLE_EVENT["testEventInvalid"])
        response = tester.post("/sample", data=data, content_type="application/json")

        self.assertEqual(400, response.status_code)
        self.assertEqual(
            "Validation Error: 'AccountTypeName' is a required property",
            response.data.decode()
        )

    def test_predict_valid(self):
        """

        :return:
        """
        tester = app.test_client(self)
        data = json.dumps(PREDICT_EVENT["testEventValid"])
        response = tester.post("/predict", data=data, content_type="application/json")

        self.assertEqual(200, response.status_code)
        self.assertEqual(json.dumps("[9900]\n"), json.dumps(response.data.decode()))
    #

    def test_predict_invalid(self):
        """

        :return:
        """
        tester = app.test_client(self)
        data = json.dumps(PREDICT_EVENT["testEventInvalid"])
        response = tester.post("/predict", data=data, content_type="application/json")

        self.assertEqual(400, response.status_code)
        self.assertEqual(
            "Validation Error: Additional properties are not allowed ('AccountName' was unexpected)",
            response.data.decode()
        )

    # def test_monitor(self):
    #     """
    #
    #     :return:
    #     """
    #     tester = app.test_client(self)
    #     response = tester.get("/monitor", content_type="application/json")
    #
    #     self.assertEqual(200, response.status_code)
    #     self.assertEqual("Success", response.data.decode())

    @staticmethod
    def sample_cleanup():
        """

        :return:
        """
        csv_path = os.path.join(FIXTURE_DIR, "model", "samples.csv")

        try:
            df = pd.read_csv(csv_path)
        except FileNotFoundError:
            return

        df.drop(df.index[df["CompanyId"] == "test"], inplace=True)

        if len(df) == 0:
            os.remove(csv_path)
            return

        df.to_csv(csv_path, index=False)

        return


if __name__ == '__main__':
    unittest.main()
