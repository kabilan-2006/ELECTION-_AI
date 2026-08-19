import os
import time
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai

# Load .env
load_dotenv()

app = Flask(__name__)

# Get Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError(
        "GEMINI_API_KEY environment variable not set in .env file."
    )

# Gemini client
client = genai.Client(api_key=api_key)

# ElectionInfo AI instructions
SYSTEM_INSTRUCTION = """
You are ElectionInfo AI, a domain-specific election information assistant.

Your job is to provide simple, clear and neutral information about:
- Elections
- Voter registration
- Voting eligibility
- EVM
- VVPAT
- NOTA
- Constituencies
- Election procedures
- Election terminology
- General election awareness

Do not promote or criticize any political party or candidate.

Do not invent election dates, election results, candidate information,
or polling station information.

For current or changing information, advise users to verify the
information with official election authorities.

If the user asks something completely outside the election-information
domain, politely explain that you specialize in election information.

Answer in simple English. If the user asks in Tamil, you can answer in Tamil.
"""

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({
            "reply": "Please enter an election-related question."
        }), 400

    try:

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=SYSTEM_INSTRUCTION + "\n\nUser Question:\n" + user_message
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:

        return jsonify({
            "reply": "Sorry, an error occurred: " + str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)