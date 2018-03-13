from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)
@app.route('/')
def main():
    return render_template('index.html')

@app.route('/request', methods=['POST'])
def hello():
    json = request.get_json()
    url = json["query"]
    method = json["method"]
    payload = json["payload"]
    print(payload["required_info"]["name"])
    return jsonify(json)

def routeRequest(method, query):
	switcher = {
		'GET': requests.get(query, verify=False).text,
		'POST': requests.post(query, verify=False).text,
		'PUT': requests.put(query, verify=False).text,
		'DELETE': requests.delete(query, verify=False).text,
	}
	return switcher.get(method, 'Invalid REST method');
