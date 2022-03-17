"""
JSON validation class
"""
import json
import os
import jsonschema
from jsonschema import validate


class JSONValidation:
    """
    JSON Validation class to validate POST requests
    """
    def __init__(self, json_schema, json_to_validate):
        """
        Initialization func for JSON Validation obj.
        :param json_schema: schema used for validation - name of endpoint is enough!
        :type json_schema: str
        :param json_to_validate: from POST request to one of the endpoints
        :type json_to_validate: dict
        """
        self.json_schema = json_schema
        self.json_to_validate = json_to_validate

    def validate_json(self):
        """
        Running validation
        :return:
        :rtype: bool, str
        """
        schema_path = os.path.join(
            os.path.dirname(os.path.realpath(__file__)),
            f"{self.json_schema}_validation.json"
        )

        with open(schema_path) as json_file:
            schema = json.load(json_file)

        try:
            validate(instance=self.json_to_validate, schema=schema)
        except jsonschema.exceptions.SchemaError as e:
            return False, f"Schema Error: {e.message}"
        except jsonschema.exceptions.ValidationError as e:
            return False, f"Validation Error: {e.message}"
        return True, "JSON is valid."
