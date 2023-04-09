copy this template rename the folder to your name and write your instructions here so we can thank you


[Microsoft Graph user.send mail](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0&tabs=http)

[Microsoft graph interactive playground](https://developer.microsoft.com/en-us/graph/graph-explorer)

email w/ attachment
```py

      {​
  "message": {​
    "subject": "Meet for lunch?",
    "body": {​
      "contentType": "Text",
      "content": "The new cafeteria is open."    }​,
    "toRecipients": [
      {​
        "emailAddress": {​
          "address": "meganb@contoso.onmicrosoft.com"        }​
      }​
    ],
    "attachments": [
      {​
        "@odata.type": "#microsoft.graph.fileAttachment",
        "name": "attachment.txt",
        "contentType": "text/plain",
        "contentBytes": "SGVsbG8gV29ybGQh"      }​
    ]
  }​
}​





```


## Twilio sendgrid send mail

```py
customer_req_body =  generate_twillio_sendgrid_email_req_body(from_email,to_emails,personalizations_subject,email_template)
sg.client.mail.send.post(request_body=customer_req_body)
```
