from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    """Homepage"""

    return 'Homepage user sign in'

if __name__ == '__main__':

    app.debug = True

    app.run()