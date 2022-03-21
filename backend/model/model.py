"""
Sample Handling class
"""
import os
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import preprocessing as prep
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline, FeatureUnion, make_pipeline
from sklearn.metrics import precision_score, recall_score, accuracy_score
import dill
import numpy as np


FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
)


class ModelHandling:
    """
    Class to handle requests made to /sample endpoint.
    """
    def __init__(self, data, test=False):
        """
        Initialization of the SampleHandling class.
        :param data: data from /sample endpoint.
        """
        self.data = data

        if test:
            self.model_path = os.path.join(FIXTURE_DIR, "naive_bayes_classifier_test.pkl")
            self.csv_path = os.path.join(FIXTURE_DIR, "samples_test.csv")
        else:
            self.model_path = os.path.join(FIXTURE_DIR, "naive_bayes_classifier.pkl")
            self.csv_path = os.path.join(FIXTURE_DIR, "samples.csv")

        try:
            self.df_new_samples = pd.DataFrame.from_records(self.data)
        except (TypeError, ValueError):
            pass

    def merge_data(self):
        """
        Method to merge incoming samples with existing dataframe.
        """
        try:
            df = pd.read_csv(self.csv_path)
        except FileNotFoundError:
            self.df_new_samples.to_csv(self.csv_path, index=False)
            return

        df = pd.concat([df, self.df_new_samples], ignore_index=True)
        df.to_csv(os.path.join(self.csv_path), index=False)
        return

    def train_model(self):
        """
        Method that trains the model.
        :return: status code and messsage
        :rtype: dict
        """
        if not os.path.exists(self.csv_path):
            return 400, "Data is missing"

        np.random.seed(2302)

        data = pd.read_csv(self.csv_path)
        data['split'] = np.random.random(data.shape[0])
        train = data[data.split <= 0.5]
        Y_train = train.AccountNumber

        vectorizer = CountVectorizer(max_features=10000)

        amount_encoder = CountVectorizer(max_features=50)
        companyId_encoder = CountVectorizer(max_features=500)

        all_features = FeatureUnion([
            ['company', make_pipeline(self.column_selector('CompanyId'), companyId_encoder)],
            ['text', make_pipeline(self.column_selector('BankEntryText'), vectorizer)],
            ['amount', make_pipeline(self.column_selector('BankEntryAmount'), amount_encoder)],
        ])
        classifier = MultinomialNB()
        model = Pipeline([('features', all_features), ('nb', classifier)])

        model.fit(train, Y_train)

        dill.dump(model, open(self.model_path, 'wb'))

        return 200, "Success"

    @staticmethod
    def column_selector(column_name):
        """
        Lambda function
        """
        return prep.FunctionTransformer(
            lambda X: X[column_name], validate=False)

    @staticmethod
    def predict_dataset(loaded, row):
        """
        Lambda to run predictions on dataframe
        :param loaded: prediction model instance
        :param row: row in dataframe
        :return: prediction
        """
        data_to_predict = pd.DataFrame([row]).iloc[:, :-3]
        return loaded.predict(data_to_predict)[0]

    def handle_sample_request(self):
        """
        Method to handle /sample requests.
        :return: status, message
        :rtype: dict
        """
        try:
            loaded = dill.load(open(self.model_path, "rb"))
            df = pd.read_csv(self.csv_path)
        except FileNotFoundError:
            self.merge_data()
            status, message = self.train_model()
            return status, message

        if "PredictedAccountNumber" not in df.columns:
            self.merge_data()
            df["PredictedAccountNumber"] = df.apply(
                lambda row: self.predict_dataset(loaded, row),
                axis=1
            )
            df.to_csv(os.path.join(self.csv_path), index=False)
        else:
            self.df_new_samples["PredictedAccountNumber"] = self.df_new_samples.apply(
                lambda row: self.predict_dataset(loaded, row),
                axis=1
            )
            self.merge_data()

        status, message = self.train_model()

        return status, message

    def handle_predict_request(self):
        """
        Method to handle /predict requests.
        :return: status, message
        :rtype: dict
        """
        try:
            with open(self.model_path, "rb") as model_file:
                loaded = dill.load(model_file)
        except FileNotFoundError:
            return 400, "Model is missing"

        predicted = loaded.predict(pd.DataFrame([self.data]))

        return 200, predicted

    def handle_monitor_request(self):
        """
        Method to handle /monitor requests.
        :return: status, message
        :rtype: dict
        """
        try:
            df = pd.read_csv(self.csv_path)
        except FileNotFoundError:
            return 400, "No data"

        nr_rows = len(df)

        if nr_rows < 10000 or "PredictedAccountNumber" not in df.columns:
            return 400, "Not enough data"

        df = df.tail(1000)

        model_statistics = {
            "rows": nr_rows,
            "precision_score": precision_score(
                df["AccountNumber"],
                df["PredictedAccountNumber"],
                average="micro"
            ),
            "recall_score": recall_score(
                df["AccountNumber"],
                df["PredictedAccountNumber"],
                average="micro"
            ),
            "accuracy_score": accuracy_score(
                df["AccountNumber"],
                df["PredictedAccountNumber"]
            )
        }

        return 200, model_statistics
