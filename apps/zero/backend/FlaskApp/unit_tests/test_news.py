
import math
from urllib.parse import urlencode
from configs import CONFIGS



def test_get_news(client,requests_mock):


  totalResults = 21
  news_api_req_body = {
    "status": "ok",
    "totalResults": totalResults ,
    "articles": [
        {
        "source": {
            "id": "espn",
            "name": "ESPN"
          },
        "author": "Jake TrotterESPN Staff Wri ter ",
        "title": "Cleveland Browns RB Nick Chubb admits scoring late touchdown vs. New York Jets -  'It cost us the game'",
        "description": "Browns running back Nick Chubb on Tuesday admitted he made a mistake in Week 2 when he scored a touchdown late in the fourth quarter, which gave the Jets a chance to stage their improbable comeback.",
        "url": "http://espn.go.com/nfl/story/_/id/34631088/cleveland-browns-rb-nick-chubb-admits-scoring-late-td-vs-new-york-jets-cost-us-game",
        "urlToImage": "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0920%2Fr1064657_1296x729_16%2D9.jpg",
        "publishedAt": "2022-09-20T17:44:00Z",
        "content": "BEREA, Ohio -- Cleveland Browns running back Nick Chubb took the blame for Sunday's loss to the New York Jets, saying he should've gone down instead of scoring in the final 2 minutes.\r\nChubb's 12-yar… [+2262 chars]"
      } for i in list(range(1,5))
    ]
  }

  page = 2
  pageSize = 5
  query_string = urlencode({'page': page, 'pageSize': pageSize,'apiKey':CONFIGS.NEWSAPI_APIKEY,'sources':'ESPN'})
  # arrange
  requests_mock.get(url="{}?{}".format(CONFIGS.NEWSAPI_ENDPOINT,query_string),json=news_api_req_body)



  req_body = {
    "data":{
      "page":page
    }
  }
  # act
  response = client.post("/news",json=req_body)
  
  assert response.json["data"]["data"] == news_api_req_body["articles"]
  assert response.json["data"]["pageNum"] == page
  assert response.json["data"]["pageSize"] == pageSize
  assert response.json["data"]["totalPages"] == math.ceil(totalResults /pageSize)

