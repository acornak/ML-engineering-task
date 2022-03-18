"""
Sample Handling class
"""
import pandas as pd
import os

FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
)


class SampleHandling:
    """
    Class to handle requests made to /sample endpoint
    """
    def __init__(self, data):
        """
        Initialization func for SampleHandling class.
        :param data: data from /sample endpoint
        :type data: list[dict]
        """
        self.data = data
        pass

    def merge_data(self):
        """
        Function to merge incoming samples with existing dataframe.
        :return:
        """
        csv_path = os.path.join(FIXTURE_DIR, "./samples.csv")
        df_new_samples = pd.DataFrame.from_records(self.data)

        try:
            df = pd.read_csv(csv_path)
        except FileNotFoundError:
            df_new_samples.to_csv(csv_path, index=False)
            return

        df = pd.concat([df, df_new_samples], ignore_index=True)
        df.to_csv(os.path.join(csv_path), index=False)
        return

    def train_model(self):
        pass


# if __name__ == "__main__":
#     data = [
#         {
#             "CompanyId": "int:a055470",
#             "BankEntryDate": "2016-02-29",
#             "BankEntryText": "str:6cd08e4 int:49fed34",
#             "BankEntryAmount": "> -1000",
#             "AccountName": "str:1e82557",
#             "AccountNumber": "9900",
#             "AccountTypeName": "Balance"
#         },
#         {
#             "CompanyId": "int:a055470",
#             "BankEntryDate": "2016-02-29",
#             "BankEntryText": "str:6cd08e4 int:49fed34",
#             "BankEntryAmount": "> -1000",
#             "AccountName": "str:9ce853c",
#             "AccountNumber": "3115",
#             "AccountTypeName": "Profit and Loss"
#         }
#     ]
#
#     sample_handling = SampleHandling(data)
#     sample_handling.merge_data()
