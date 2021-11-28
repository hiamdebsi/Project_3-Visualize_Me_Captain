from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

#import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/NYSE_Weather_db"
mongodb_client = PyMongo(app)


@app.route("/")
def home():
    # find the information
    pass
    #return render_template("index.html", data=stock_data)


@app.route("/StockWeather")
def getData():
    pass

@app.routw("/Stats")
def getDataStats():
    pass


if __name__ == "__main__":
    app.run(debug=True)
