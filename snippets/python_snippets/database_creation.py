def local_deps():
  import sys

  if sys.platform == 'win32':
    sys.path.append(sys.path[0] + '\..\site-packages\windows')
    sys.path.append(sys.path[0] + '\..')
  elif sys.platform =='linux':
    sys.path.append(sys.path[0] + '/../site-packages/linux')
local_deps()


import random
import faker
from faker.providers import date_time
from datetime import datetime,timedelta
import os
import pprint
pp = pprint.PrettyPrinter(indent=2, compact=False, width=1)
import pytz
from sqlalchemy import create_engine
now = datetime.now(tz=pytz.timezone('UTC'))
few_months = now +  timedelta(days=(4*30))


fake = faker.Faker()
fake.add_provider(date_time)


connstring = "mssql+pyodbc://sa:wX.D}/n(ZNpzVr}@localhost:1433/windmillcode-mssql-database-0?driver=ODBC+Driver+17+for+SQL+Server"
sqlalchemy_0_engine = ""
sqlalchemy_0_conn = ""
def set_up_sql_conn():
    global sqlalchemy_0_engine
    sqlalchemy_0_engine = create_engine(connstring,pool_pre_ping=True)
    global sqlalchemy_0_conn
    sqlalchemy_0_conn = sqlalchemy_0_engine.connect()
set_up_sql_conn()



rows = []
def add_rows_to_windmillcodeballevents():
  for  i in range(20):
    rs = sqlalchemy_0_conn.execute("""
    SELECT teamID FROM Teams.TechPlusBall
    """)
    team_ids = [
      dict(row)["teamID"] for row in rs
   ]
    home_team_id = random.choice(team_ids)
    team_ids.remove(home_team_id)
    away_team_id = random.choice(team_ids)
    rows.append({
      "hometeamID":home_team_id,
      "awayteamID":away_team_id,
      "matchTime":fake.date_time_between_dates(now,few_months),
      "spreadFor":round(random.uniform(-10.5, 10.5), 2),
      "spreadAgainst":round(random.uniform(-10.5, 10.5), 2)
    })
  pp.pprint(rows)

def insert_rows_into_windmillcodeballevents():
  for row in rows:
    match_time = datetime.strftime(
      row["matchTime"],
      "%Y-%m-%d %H:%M:%S.%f %z"
    )
    print(match_time)

    sqlalchemy_0_conn.execute(
      """
      INSERT INTO Events.Niblsballevents(
        hometeamID,
        awayteamID,
        matchTime,
        spreadFor,
        spreadAgainst
      )
        VALUES
        ({},{},'{}',
        {},{})
      """.format(
        row["hometeamID"],
        row["awayteamID"],
        match_time,
        row["spreadFor"],
        row["spreadAgainst"]
      )
    )


add_rows_to_windmillcodeballevents()
insert_rows_into_windmillcodeballevents()
