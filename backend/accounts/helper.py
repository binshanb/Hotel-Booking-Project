# helper.py
import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from dotenv import load_dotenv

load_dotenv()

# Initialize Twilio client
client = Client(os.environ['TWILIO_ACCOUNT_SID'], os.environ['TWILIO_AUTH_TOKEN'])
service = client.verify.services(os.environ['TWILIO_VERIFY_SERVICE_SID'])

# Function to send OTP to a phone number
def send_otp(phone):
    default_country_code = "+91"

    if phone.startswith("+"):
        formatted_phone = phone
    else:
        formatted_phone = default_country_code + phone

    try:
        service.verifications.create(to=formatted_phone, channel='sms')
        return True
    except TwilioRestException as e:
        print(f"Failed to send OTP: {e}")
        return False

# Function to verify OTP code for a phone number
def verify_otp(phone,code):
    try:
        result = service.verification_checks.create(to=phone,code=code)
        return result.status == 'approved'
    except TwilioRestException as e:
        print(f"TwilioRestException: {e}")
        return False
















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