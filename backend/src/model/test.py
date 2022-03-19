import os
import pandas as pd

FIXTURE_DIR = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
)

df = pd.read_csv(os.path.join(FIXTURE_DIR, "./samples_zidan.csv"))
df[:10000].to_csv(os.path.join(FIXTURE_DIR, "./samples.csv"), index=False)
