from django.core.mail import EmailMessage
# import threading
import os

class Util:
  @staticmethod
  def send_email(data):
    email = EmailMessage(
      subject=data['subject'],
      body=data['body'],
      from_email=os.environ.get('EMAIL_FROM'),
      to=[data['to_email']]
    )
    email.send()
















# class EmailThread(threading.Thread):

#     def __init__(self, email):
#         self.email = email
#         threading.Thread.__init__(self)

#     def run(self):
#         self.email.send()

# class Util:
#     @staticmethod
#     def send_email(data):
#         email = EmailMessage(
#             subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
#         EmailThread(email).start()

# class EmailUtils:
#     @staticmethod
#     def send_password_reset_email(email_subject, email_body, to_email):
#         email = EmailMessage(
#             subject=email_subject,
#             body=email_body,
#             to=[to_email]
#         )
#         EmailThread(email).start()