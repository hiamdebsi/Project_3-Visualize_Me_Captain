from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from flask import jsonify

from flask_cors import CORS


app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/NYSE_Weather_db"
mongodb_client = PyMongo(app)

# To request from local server and avoid CORS error
CORS(app, support_credentials=True)

@app.route("/")
def home():
    # load home page
    return render_template("index.html")


@app.route("/stockWeather")
def getData1():
    pass

@app.route("/stats")
def getDataStats():
    # find the information
    stock_data = mongodb_client.db.IBM.find_one()
    print(f'Hello: {stock_data}')
    return render_template("stats.html", data=stock_data)

@app.route("/map")
def getMap():
    return render_template("map.html")

@app.route("/data")
def getData():
    # loop through here and append to list
    all_map_data = mongodb_client.db.stockGeoInfo.find()
    myData=[]
    for each in all_map_data:
        del each['_id']
        myData.append(each)
    # print(myData)
    #print("hello map")
    return (jsonify(myData))

    
    

if __name__ == "__main__":
    app.run(debug=True)
