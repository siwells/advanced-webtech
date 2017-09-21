# coding: utf-8
# as per http://www.python.org/dev/peps/pep-0263/

import smtplib

from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email import Encoders

import os

def send(gmail_user, gmail_pwd, to, subject, text, attach=None):
    msg = MIMEMultipart("alternative")
    msg.set_charset("utf-8")
    
    msg['From'] = gmail_user
    msg['To'] = to
    msg['Subject'] = subject
    
    msg.attach(MIMEText(text, "plain", "utf-8"))

    if attach is not None:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(open(attach, 'rb').read())
        Encoders.encode_base64(part)
        part.add_header('Content-Disposition', 'attachment; filename="%s"' % os.path.basename(attach))
        msg.attach(part)
    
    print msg

    try:
        mailServer = smtplib.SMTP("smtp.gmail.com", 587)
        mailServer.ehlo()
        mailServer.starttls()
        mailServer.ehlo()
        mailServer.login(gmail_user, gmail_pwd)
        mailServer.sendmail(gmail_user, to, msg.as_string())
        # Should be mailServer.quit(), but that crashes...
        mailServer.close()
        return True
    except:
        # app.loggger.error("Couldn't send confirmation email: " + str(text)) - Causes crash
        # TODO: fix error logging here so that it doesn't cause a crash.
        pass

if __name__ == '__main__':

    send("gordonswan@me.com", "Hello from python!", "This is a email sent with python")
