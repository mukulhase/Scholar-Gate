from flask import Flask
from flask import request, json
from index import *

app = Flask(__name__)

@app.route('/')
def hello():
	return 'Hello, World!'