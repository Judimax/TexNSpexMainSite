import json

from events import get_events_from_eventbrite,generate_twillio_sendgrid_email_req_body,admin_email_template
from configs import CONFIGS
from six import PY2



access_token = "A"


def test_get_events(client,monkeypatch):
  def fake_get_events_from_eventbrite():
    class Result():
      def json(self):
        return {
          "events":"A list of events"
        }
    return Result()
  monkeypatch.setattr("events.get_events_from_eventbrite",fake_get_events_from_eventbrite)
  response = client.post("events/get_events")

  resp_body = response.json
  assert response.status_code == 200
  assert resp_body["data"] == {
      "events":"A list of events"
    }


def test_purchase_ticket_events(client,monkeypatch,mocker):

  class FakeSendGridAPIClientClientMailSend():
    request_bodies = []
    def post(self,request_body):
      self.request_bodies.append(request_body)
  class FakeSendGridAPIClientClientMail():
    send= FakeSendGridAPIClientClientMailSend()
  class FakeSendGridAPIClientClient():
    mail =FakeSendGridAPIClientClientMail()
  class FakeSendGridAPIClient():
    def __init__(self, api_key=""):
      None
    client = FakeSendGridAPIClientClient()

  def fake_uuid4():
    return "12345"

  my_request_body ={
    'data': {
      "email":"KimbeOtunde@gmail.com",
      "event_title":"Event Title",
      "name":"Kimbe Otunde",
      "ticket_metadata":"metadata",
      "ticket_quantity":3
    }
  }

  fake_admin_email_template = "{}"

  monkeypatch.setattr("sendgrid.SendGridAPIClient",FakeSendGridAPIClient)
  monkeypatch.setattr("uuid.uuid4",fake_uuid4)
  monkeypatch.setattr("events.admin_email_template",fake_admin_email_template)
  post_mock = mocker.patch("sendgrid.SendGridAPIClient.client.mail.send.post")
  generate_twillio_sendgrid_email_mock = mocker.patch("events.generate_twillio_sendgrid_email_req_body")

  # mock file open
  class Mocked_email_template_info_read():
    def read(self):
      return "{} {} {} {}"
  class Mocked_email_template_info():
    def __init__(self, filename,encoding):
        self.filename = filename
        self.encoding = encoding
    def __enter__(self):

        return Mocked_email_template_info_read()

    def __exit__(self,a,b,c):
        None

  builtin_open = "__builtin__.open" if PY2 else "builtins.open"
  monkeypatch.setattr(builtin_open, Mocked_email_template_info)
  client.post("events/purchase_ticket",json=my_request_body)
  assert post_mock.call_count == 2
  assert generate_twillio_sendgrid_email_mock.call_count == 2
  admin_from_email =CONFIGS.windmillcode_service_acct[0]["email"]
  admin_to_emails = [
    CONFIGS.windmillcode_service_acct[0]["email"],
    "DashawnBledsoe@WINDMILLCODEInc771.onmicrosoft.com"
  ]

  customer_from_email =CONFIGS.windmillcode_service_acct[0]["email"]
  customer_to_emails =[
    my_request_body['data']['email']
  ]
  customer_personalizations_subject = "Event Confirmation {}".format(my_request_body['data']["event_title"])
  call_list =[
    mocker.call(
    admin_from_email,
    admin_to_emails,
    "Ticket Purchased Confirmation ID 12345",
    fake_admin_email_template.format(
                    json.dumps(my_request_body["data"], indent=4)
                    .replace(" ", "&nbsp;")
                    .replace("\n", "<br>")
                )
    ),
    mocker.call(
      customer_from_email,
      customer_to_emails,
      customer_personalizations_subject,
      "{} {} {} {}".format(my_request_body['data']["name"], my_request_body['data']["email"], my_request_body['data']["ticket_quantity"], "12345")
    ),
  ]

  for idx,test_call in enumerate(generate_twillio_sendgrid_email_mock.call_args_list):

    assert test_call.args == call_list[idx].args
  assert generate_twillio_sendgrid_email_mock.call_args_list == call_list


def test_generate_twillio_sendgrid_email_req_body():
  # arrange
  from_email ="sample@gmail.com"
  to_emails = [
    "a@gmail.com",
    "b@gmail.com",
  ]
  personalizations_subject="Test Subject"
  email_template = "my template"

  # act
  sg_body = generate_twillio_sendgrid_email_req_body(from_email,to_emails,personalizations_subject,email_template)

  # assert
  assert sg_body == {
    "personalizations":[{
      "to":[{"email":email} for email in to_emails],
      "subject":personalizations_subject
    }],
    "from":{"email":from_email},
    "content":[
      {
        "type": "text/html",
        "value": email_template
      }
    ]
  }


def test_get_events_from_eventbrite(client,requests_mock):
    # arrange
    url = "https://www.eventbriteapi.com/v3/organizations/{}/events".format(
        CONFIGS.eventbrite["organization_id"]
    )
    headers = {
        "Authorization": "Bearer {}".format(CONFIGS.eventbrite["priviate_oauth_token"])
    }
    requests_mock.get(url, headers=headers)

    # act
    get_events_from_eventbrite()
    # assert
    assert requests_mock.called == True
    assert requests_mock.call_count ==1

