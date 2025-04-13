from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load Q&A from file
def load_faq():
    with open('gfg_data.txt', 'r') as f:
        data = {}
        for line in f:
            if '::' in line:
                q, a = line.strip().split('::')
                data[q.lower()] = a
        return data

faq_data = load_faq()

def chatbot_response(user_input):
    return faq_data.get(user_input.lower(), "Sorry, I don't have an answer for that.")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tutorials")
def tutorials():
    return render_template("tutorials.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    response = chatbot_response(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
