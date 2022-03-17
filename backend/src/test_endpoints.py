import json
import pytest
from app import app


@pytest.fixture
def client():
    client = app.test_client()
    return client


# with open("./unit_tests/events/sample_test_event.json") as json_file:
#     sample_event = json.load(json_file)

# with open("./unit_tests/events/predict_test_event.json") as json_file:
#     predict_event = json.load(json_file)


def test_assert():
    assert True


def test_sample_valid_request(client):
    with open("server/hiring_app/sample_validation.json") as json_file:
        sample_event = json.load(json_file)

    mimetype = "application/json"
    headers = {
        "Content-Type": mimetype,
        "Accept": "*/*"
    }
    response = client.post("/sample", data=json.dumps(sample_event), headers=headers)

    print(response)

#
# class EndpointsTestCase(unittest.TestCase):
#     """
#     Test case for /predict endpoint
#     """
#     def test_sample_valid_request(self):
#         expected_output = {
#             "status": 200,
#             "message": "Success"
#         }
#
#         with app.test_client() as client:
#             result = client.post('/sample', sample_event["testEventValid"])
#             self.assertEqual(
#                 result.data,
#                 expected_output
#             )
#
#     def test_sample_invalid_request(self):
#         pass
#
#     def test_predict_valid_request(self):
#         pass
#
#     def test_predict_invalid_request(self):
#         pass

#
# if __name__ == "__main__":
#     EndpointsTestCase()
