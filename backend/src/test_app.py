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


class AppTestCase(unittest.TestCase):
    def test_sample_valid(self):
        tester = app.test_client(self)
        data = json.dumps(SAMPLE_EVENT["testEventValid"])
        response = tester.post("/sample", data=data, content_type="application/json")

        self.sample_cleanup()

        self.assertEqual(200, response.status_code)
        self.assertEqual("Success", response.data.decode())

    def test_sample_invalid(self):
        tester = app.test_client(self)
        data = json.dumps(SAMPLE_EVENT["testEventInvalid"])
        response = tester.post("/sample", data=data, content_type="application/json")

        self.assertEqual(400, response.status_code)
        self.assertEqual(
            "Validation Error: 'AccountTypeName' is a required property",
            response.data.decode()
        )

    def test_predict_valid(self):
        tester = app.test_client(self)
        data = json.dumps(PREDICT_EVENT["testEventValid"])
        response = tester.post("/predict", data=data, content_type="application/json")

        self.assertEqual(200, response.status_code)
        self.assertEqual(json.dumps("[\"Balance\"]\n"), json.dumps(response.data.decode()))

    def test_predict_invalid(self):
        tester = app.test_client(self)
        data = json.dumps(PREDICT_EVENT["testEventInvalid"])
        response = tester.post("/predict", data=data, content_type="application/json")

        self.assertEqual(400, response.status_code)
        self.assertEqual(
            "Validation Error: Additional properties are not allowed ('AccountName' was unexpected)",
            response.data.decode()
        )

    def test_monitor(self):
        tester = app.test_client(self)
        response = tester.get("/monitor", content_type="application/json")

        self.assertEqual(200, response.status_code)
        self.assertEqual("Success", response.data.decode())

    @staticmethod
    def sample_cleanup():
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
