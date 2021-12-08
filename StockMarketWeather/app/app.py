from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from flask import jsonify

from flask_cors import CORS


app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/NYSE_Weather_db"
mongodb_client = PyMongo(app)

# To request from local server and avoid CORS error
CORS(app, support_credentials=True)

#First Main Page Route
@app.route("/")
def home():
    # load home page
    return render_template("index.html")

@app.route("/stats")
def getStats():
    # load home page
    return render_template("stats.html")

#Map Page Route
@app.route("/map")
def getMap():
    return render_template("map.html")

#Map Data Route
@app.route("/data")
def getData():
    # loop through here and append to list
    all_map_data = mongodb_client.db.stockGeoInfo.find()
    myData=[]
    for each in all_map_data:
        del each['_id']
        myData.append(each)
    #print(myData)
    #print("hello map")
    return (jsonify(myData))

#Stock and Weather Plots Route
@app.route("/stockweather")
def getPage():
    print('hello page')
    return render_template("stockweather.html")

#Dropdown Route
@app.route("/dropdown")
def getDropdownData():
    #print('dropdown')
    symbols = mongodb_client.db.StockList.find()
    stocksym=[]
    for sym in symbols:
        del sym['_id']
        stocksym.append(sym)
        
    print(stocksym)
    return (jsonify(stocksym))

#Stock and Weather Data Retrieval Route
@app.route("/stockweatherdata")
@app.route("/stockweatherdata/<stocksym>")
def getchartData(stocksym=None):
    print('hello')
    if not stocksym:
        stocksym = "ABR"
    print(stocksym)
    collect = str(stocksym)

    weather = mongodb_client.db.NYC_Weather
    stock = mongodb_client.db[collect]
    #print(stock)
    
    resultwe = weather.find({'date_time':{'$gte':"2018-01-01",'$lte':"2021-10-31"}})
    resultst = stock.find({'date':{'$gte':"2018-01-01",'$lte':"2021-10-31"}})

    #print(resultwe)
    #print(resultst)

    resultw=[]
    for each in resultwe:
        del each['_id']
        resultw.append(each)

    results=[]
    for each in resultst:
        del each['_id']
        results.append(each)

    fresultw=[]
    for day in resultw:
        for sday in results:
            if (day["date_time"] == sday["date"]):
                fresultw.append(day)
    
    print(fresultw)

    return (jsonify([fresultw,results]))


if __name__ == "__main__":
    app.run(debug=True)
