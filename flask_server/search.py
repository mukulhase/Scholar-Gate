from flask import Flask
from flask import request, json
from index import *

app = Flask(__name__)

@app.route('/')
def hello():
	return 'Hello, World!'

@app.route('/search', methods=['GET','POST'])
def search():
	print (request.is_json)
	content = request.get_json()
	print(content)
	schema = create_schema()
	
	if not os.path.exists("indexdir"):
		os.mkdir("indexdir")
		static_index()

	ix = index.create_in("indexdir", schema)
	add_pdf(content['docid'], content['title'], content['abstract'])
	query = content['query']
	print(query)
	result = search(query,"title","abstract")
	if result is None:
		return json.dumps({"result":"No match found"})
	else:
		return json.dumps({"result":result})