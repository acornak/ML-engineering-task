"""
Unit tests for JSON validation script
"""
import os
import unittest
import json

from backend.validation.json_validation import JSONValidation

FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__))
)


with open(os.path.join(FIXTURE_DIR, "test_events", "sample_test_event.json")) as json_file:
    SAMPLE_EVENT = json.load(json_file)

with open(os.path.join(FIXTURE_DIR, "test_events", "predict_test_event.json")) as json_file:
    PREDICT_EVENT = json.load(json_file)


class JSONValidationTestCase(unittest.TestCase):
    """
    Unit test class
    """
    def test_sample_valid(self):
        """
`       Test valid JSON for /sample endpoint
        """
        json_validation = JSONValidation("sample", SAMPLE_EVENT["testEventValidSingle"])
        status, message = json_validation.validate_json()

        self.assertEqual(True, status)
        self.assertEqual("JSON is valid", message)

    def test_sample_valid_error(self):
        """
`       Test invalid JSON for /sample endpoint
        """
        json_validation = JSONValidation("sample", SAMPLE_EVENT["testEventInvalidSingle"])
        status, message = json_validation.validate_json()

        self.assertEqual(False, status)
        self.assertEqual("Validation Error: 'AccountTypeName' is a required property", message)

    def test_predict_valid(self):
        """
`       Test valid JSON for /predict endpoint
        """
        json_validation = JSONValidation("predict", PREDICT_EVENT["testEventValid"])
        status, message = json_validation.validate_json()

        self.assertEqual(True, status)
        self.assertEqual("JSON is valid", message)

    def test_predict_valid_error(self):
        """
`       Test invalid JSON for /predict endpoint
        """
        json_validation = JSONValidation("predict", PREDICT_EVENT["testEventInvalid"])
        status, message = json_validation.validate_json()

        self.assertEqual(False, status)
        self.assertEqual(
            "Validation Error: Additional properties are not allowed ('AccountName' was unexpected)",
            message
        )

    def test_missing_schema(self):
        """
`       Test missing schema
        """
        json_validation = JSONValidation("non_existing", SAMPLE_EVENT["testEventValidSingle"])
        status, message = json_validation.validate_json()

        self.assertEqual(False, status)
        self.assertEqual("Schema Error: Schema file not found", message)

    def test_invalid_schema(self):
        """
`       Test invalid schema
        """
        json_validation = JSONValidation("invalid", SAMPLE_EVENT["testEventValidSingle"])
        status, message = json_validation.validate_json()

        self.assertEqual(False, status)
        self.assertEqual("Schema Error: 'invalid' is not valid under any of the given schemas", message)


if __name__ == "__main__":
    unittest.main()
