//DROPDOWN CREATION//
function init(){
  d3.select("#datalistOptions");
  const url1 = "/dropdown";
  console.log(url1)
  d3.json(url1).then(function(dropdown_values){
    console.log(dropdown_values)

    //Sample Data needed to build the charts/plots
    var defaultdata = dropdown_values[0];
    Dashboard(defaultdata);
  });//end of d3
}//end of init function

//If to select a new stock symbol
function optionChanged(dropdown_values){
  Dashboard(dropdown_values);
};

//Plot Function
function Dashboard(dropdown_values){
  //ADD MONGO CONNECTION HERE INSTEAD OF D3READING//
  const url2 = "/stockweatherdata";
  console.log(url2);

  d3.json(url2).then(function(response) {
      console.log(response)

      weather = response[0];
      stock = response[1];

      // console.log(stock[0]);
      // console.log(weather[0].maxtempC);

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
              "id": "y1",
              "label": "Max Temperature (C)",
                      "yAxisID":"left"
            },
            {
              "backgroundColor": "#ffc800",
              "borderColor": "#ffc800",
              "fill": false,
              "data": volumes,
              "id": "y2",
              "label": "IBM Stock Volume",
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
            "display": false
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
  });
}

init();