import my_util

import pandas as pd

my_dataframe = pd.DataFrame({'Yes': [50, 21], 'No': [131, 2]})
# print(my_dataframe) 

my_series = pd.Series([30, 35, 40], index=['2015 Sales', '2016 Sales', '2017 Sales'], name='Product A')
# print(my_series)

pd.set_option('display.max_rows', 4)
big_dataframe = pd.read_csv("cities.csv")

print(big_dataframe.state)