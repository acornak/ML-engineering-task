"""
Model handling
"""
import pandas as pd
import os
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import preprocessing as prep
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline, FeatureUnion, make_pipeline
import dill

import numpy as np
np.random.seed(2302)

FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
)


class ModelHandling:
    """
    Class to handle everything around the model.
    """
    def __init__(self, predict_data):
        """
        Initialization func for ModelHandling class.
        """
        self.predict_data = predict_data

    def train_model(self):
        """
        Function that trains the model.
        :return: status code and messsage
        :rtype: dict
        """
        if not os.path.exists(os.path.join(FIXTURE_DIR, "samples.csv")):
            return 400, "Data is missing"

        # initialize dataset
        data = pd.read_csv(os.path.join(FIXTURE_DIR, "samples.csv"))
        data['split'] = np.random.random(data.shape[0])
        test = data[data.split > 0.5]
        train = data[data.split <= 0.5]
        Y_test = test.AccountNumber
        Y_train = train.AccountNumber

        # let's build classifiers
        # bag of words for the text feature
        vectorizer = CountVectorizer(max_features=10000)

        # we need a few OneHotEncoders - but I don't like the interface for that and this has the same effect
        # bag of words when all texts are max of one word => one-hot encoding
        amount_encoder = CountVectorizer(max_features=50)
        companyId_encoder = CountVectorizer(max_features=500)

        # combine before doing the regression - feature union requires all features to have the same interface,
        # so to make this work we need to project onto a single column first for each
        all_features = FeatureUnion([
                ['company', make_pipeline(self.column_selector('CompanyId'), companyId_encoder)],
                ['text', make_pipeline(self.column_selector('BankEntryText'), vectorizer)],
                ['amount', make_pipeline(self.column_selector('BankEntryAmount'), amount_encoder)],
            ])
        classifier = MultinomialNB()
        # pipeline the whole thing
        model = Pipeline([('features', all_features), ('nb', classifier)])

        # now train the classifier
        model.fit(train, Y_train)

        print(model.score(test, Y_test))

        dill.dump(model, open(os.path.join(FIXTURE_DIR, 'naive_bayes_classifier.pkl'), 'wb'))

        return 200, "Success"

    def predict(self):
        try:
            loaded = dill.load(open('naive_bayes_classifier.pkl', 'rb'))
        except FileNotFoundError:
            return 400, "Model is missing"

        predicted = loaded.predict(pd.DataFrame([self.predict_data]))
        print(predicted)

        return 200, predicted

    @staticmethod
    def column_selector(column_name):
        return prep.FunctionTransformer(
            lambda X: X[column_name], validate=False)


# if __name__ == "__main__":
#     data = {
#         "CompanyId": "int:a055470",
#         "BankEntryDate": "2016-02-29",
#         "BankEntryText": "str:6cd08e4 int:49fed34",
#         "BankEntryAmount": "> -1000"
#     }
#     model_handling = ModelHandling(data)
#     model_handling.train_model()
#     model_handling.predict()
