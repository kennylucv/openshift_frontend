
# control Chorme with selenium
import sys
from selenium import webdriver

# e.g. python3 test-frontend.py spam_num env

# set number of spams
try:
    spam_num = int(sys.argv[1])
except:
    spam_num = 6

# set envrionment
try:
    env = sys.argv[2]
except:
    env = "prod"


for i in range(spam_num):
    driver = webdriver.Chrome()
    # open browser and go to Google.ca
    driver.get('http://frontend-' + env + '-env.52.233.32.176.nip.io')