//DROPDOWN CREATION//
function init(){
  var selectDropdown = d3.select("#selDataset");
  const url1 = "/dropdown";
  console.log(url1)
  d3.json(url1).then(function(dropdown_values){
    console.log(dropdown_values)

    let stocksymbol = [];
      for (var i=0; i < dropdown_values.length; i++){
          stocksymbol.push(dropdown_values[i].AB);
      };

      // console.log(`My temps:${temps}`);
      console.log(stocksymbol);

    stocksymbol.forEach((symbol) =>{
      selectDropdown
        .append("option")
        .text(symbol)
        .property("value", symbol);
    });


    //Sample Data needed to build the charts/plots
    var defaultdata = stocksymbol[0];
    Pagecontent(defaultdata);
  });//end of d3
}//end of init function

//If to select a new stock symbol
function optionChanged(stocksymbol){
  Pagecontent(stocksymbol);
};

//Plot Function
function Pagecontent(stocksymbol){
  const url2 = "/stockweatherdata/"+`${stocksymbol}`;
  console.log(url2);
  
      d3.json(url2).then(function(response) {
          console.log(response)
  
          weather = response[0];
          stock = response[1];
  
          let temps = [];
          for (var i=0; i < weather.length; i++){
              temps.push(weather[i].maxtempC);
          };
  
          // console.log(`My temps:${temps}`);
          console.log(temps);
  
          let volumes = [];
          for (var i=0; i < stock.length; i++){
              volumes.push(stock[i].volume);
          };
          console.log(volumes);

          let prices = [];
          for (var i=0; i < stock.length; i++){
              prices.push(stock[i].close);
          };
          console.log(prices);
  
          let labels = []
          for (var i=0; i<weather.length;i++){
              labels.push(weather[i].date_time);
          };
          console.log(labels);
          
          var data = {
            "datasets": [
              {
                "backgroundColor": "#0dcaf0",
                "borderColor": "#0dcaf0",
                "fill": false,
                "data": temps,
                "id": "amount",
                "label": "Max Temperature (C)",
                "yAxisID":"left"
              },
              {
                "backgroundColor": "#ffc800",
                "borderColor": "#ffc800",
                "fill": false,
                "data": volumes,
                "id": "amount",
                "label": `${stocksymbol} Stock Volume`,
                "yAxisID":"right"

              }
            ],
            "labels": labels
          };
          var options = {
            "elements": {
              "rectangle": {
                "borderWidth": 2
              }
            },
            "layout": {
              "padding": 0
            },
            "legend": {
              "display": true,
              "labels": {
                "boxWidth": 16
              }
            },
            "maintainAspectRatio": false,
            "responsive": true,
            "scales": {
              "xAxes": [
                {
                  "gridLines": {
                    "display": false
                  },
                  "scaleLabel": {
                    "display": true,
                    "labelString": "Date"
                  },
                  "stacked": false,
                  "ticks": {
                    "autoSkip": true,
                    "beginAtZero": true
                  }
                }
              ],
              "yAxes": [
                {
                  "scaleLabel": {
                    "display": true,
                    "labelString": "Max Temperature (C)"
                  },
                  "id": "left",
                  "stacked": false,
                  "ticks": {
                    "beginAtZero": true
                  }
                },
                {
                  "scaleLabel": {
                    "display": true,
                    "labelString": "Stock Volume"
                  },
                  "id": "right",
                  "position": "right",
                  "stacked": false,
                  "ticks": {
                    "beginAtZero": true
                  }
                }
              ]
            },
            "title": {
              "display": true,
              "text":`${stocksymbol} Stock Volume and Max Temperature between January 2018 to October 2021`
            },
            "tooltips": {
              "intersect": false,
              "mode": "index",
              "position": "nearest",
              "callbacks": {}
            }
          }
          var type = "line";

          var myChart = new Chart(document.getElementById("myChart").getContext('2d'), {options, data, type});

          var myChart2 = new Chart(document.getElementById("myChart2").getContext('2d'), {
          options: {
            ...options,
            scales: {
              ...options.scales,
              yAxes: [
                  {
                    "scaleLabel": {
                      "display": true,
                      "labelString": "Max Temperature (C)"
                    },
                    "id": "left",
                    "stacked": false,
                    "ticks": {
                      "beginAtZero": true
                    }
                  },
                  {
                    "scaleLabel": {
                      "display": true,
                      "labelString": "Stock Closing Price (USD)"
                    },
                    "id": "right",
                    "position": "right",
                    "stacked": false,
                    "ticks": {
                      "beginAtZero": true,
                      "callback": function(value, index, values){
                          return `$` + value;
                      }
                    }
                  }
              ]
            },
            "title": {
              "display": true,
              "text":`${stocksymbol} Stock Volume and Max Temperature between January 2018 to October 2021`
          },
          },
          data:{
            "datasets": [
              {
              "backgroundColor": "#0dcaf0",
              "borderColor": "#0dcaf0",
              "fill": false,
              "data": temps,
              "id": "y1",
              "label": "Max Temperature (C)",
              "yAxisID":"left"
              },
              {
              "backgroundColor": "#ffc800",
              "borderColor": "#ffc800",
              "fill": false,
              "data": prices,
              "id": "y2",
              "label": `${stocksymbol} Stock Closing Prices (USD)`,
              "yAxisID":"right"
      
              }
            ],
            "labels": labels
          },
          type
          });
  });
}

init();