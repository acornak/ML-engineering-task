"""
Unit test
"""
import os
import unittest
import json

from app import app

FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__))
)


with open(os.path.join(FIXTURE_DIR, "test", "test_events", "sample_test_event.json")) as json_file:
    SAMPLE_EVENT = json.load(json_file)

with open(os.path.join(FIXTURE_DIR, "test", "test_events", "predict_test_event.json")) as json_file:
    PREDICT_EVENT = json.load(json_file)


class SampleTestCase(unittest.TestCase):
    """
    Unit test class
    More tests should be added, however mocking is needed.
    """
    def test_sample_valid_error(self):
        """
`       Test JSON validation for /sample endpoint
        """
        tester = app.test_client(self)
        data = json.dumps(SAMPLE_EVENT["testEventInvalid"])
        response = tester.post("/sample", data=data, content_type="application/json")

        self.assertEqual(400, response.status_code)
        self.assertEqual(
            "Validation Error: 'AccountTypeName' is a required property",
            response.data.decode()
        )

    def test_sample_empty_input(self):
        """
`       Test JSON validation for /sample endpoint
        """
        tester = app.test_client(self)
        data = json.dumps([])
        response = tester.post("/sample", data=data, content_type="application/json")

        self.assertEqual(400, response.status_code)
        self.assertEqual(
            "Validation Error: Input is empty",
            response.data.decode()
        )

    def test_predict_valid_error(self):
        """
        Test JSON validation for /predict endpoint
        """
        tester = app.test_client(self)
        data = json.dumps(PREDICT_EVENT["testEventInvalid"])
        response = tester.post("/predict", data=data, content_type="application/json")

        self.assertEqual(400, response.status_code)
        self.assertEqual(
            "Validation Error: Additional properties are not allowed ('AccountName' was unexpected)",
            response.data.decode()
        )


if __name__ == '__main__':
    unittest.main()
