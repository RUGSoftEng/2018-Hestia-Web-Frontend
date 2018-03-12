from flask import Flask, render_template, request
import requests
# from flask_restplus import Api

# api = Api()

app = Flask(__name__)
# api.init_app(app)

# from flask import Flask, render_template
# from flask_restplus import Api
# app = Flask(__name__)

# @app.route("/hello")
# def main():
# 	return "Hello World"
@app.route('/')
def main():
    return render_template('index.html')


@app.route('/request', methods=['POST'])
def hello():
    query = request.form['queryInput']
    method = request.form['methodInput']
    return routeRequest(method, query)


# def routeRequest(method, query):
# 	switcher = {
# 		"GET": requests.get(query, verify=False), # verify=False tells it to ignore the SSL certificate issue. TODO don't do this.
# 		"POST": requests.get(query, verify=False),
# 		"UPDATE": requests.get(query, verify=False),
# 		"DELETE": requests.get(query, verify=False),
# 		}
#     return switcher.get(method)
def routeRequest(method, query):
	switcher = {
		'GET': requests.get(query, verify=False).text,
		'POST': requests.post(query, verify=False).text,
		'PUT': requests.put(query, verify=False).text,
		'DELETE': requests.delete(query, verify=False).text,
	}
	return switcher.get(method, 'Invalid REST method');

# def contact():
#     if request.method == 'POST':
#         if request.form['submit'] == 'Do Something':
#             return "submit1"
#         elif request.form['submit'] == 'Do Something Else':
#             return "submit2"
#         else:
#         	return "submit3"
#     elif request.method == 'GET':
#         return hello()
