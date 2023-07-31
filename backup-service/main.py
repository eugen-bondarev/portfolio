from flask import Flask
import os

app = Flask(__name__)

def exec(cmd: str):
  return os.popen(cmd).read()

@app.route("/")
def hello_world():
  return exec('php wp-cli.phar --allow-root db export ./my-db.sql')
  # output = os.popen("ls").read()
  # return output

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0', port=8080)