
const url = "/stockweatherdata";
console.log(url);

d3.json(url).then(function(response) {
   var radioSelected;
    //console.log(response)
    //d3.select('input[name="flexRadioCorr"]:checked').node().value


    d3.selectAll("input[name='flexRadioCorr']").on("change", function(){
      console.log(this.value)
      radioSelected = this.value;
    });
    //radioSelected = d3.select('input[name="flexRadioCorr"]:checked')[0][0].value
    //console.log(radioSelected);

    weather = response[0];
    stock = response[1];

    // get the close prices
    let closePriceArray = stock.map(({ close }) => close);
    //console.log(closePriceArray);
    closePriceArray.sort(function(a, b){return a - b});

    let volumesArray = stock.map(({ volume }) => volume);
    console.log(volumesArray);
    // sorted ascending
    volumesArray.sort(function(a, b){return a - b});

    let tempDatesArray = weather.map(({ date_time }) => date_time);

    let tempMaxCArray = weather.map(({ maxtempC }) => maxtempC);
    // sort ascending
    tempMaxCArray.sort(function(a, b){return a - b});
  



    // closePriceArray
    // volumesArray
    // tempMaxCArray
    // tempDatesArray

    //gave in dictionary format already
    //TESTING creating a dictionary
    const data = tempMaxCArray.map((temp,index)=>{
      let dataObject ={};
      dataObject.temp = temp;
      //console.log(temp);
      dataObject.financials={};
      dataObject.financials.closeprice = closePriceArray[index];
      //console.log(closePriceArray[index]);
      dataObject.financials.volume = volumesArray[index];

      return dataObject;

    })
    console.log(data);

    //https://www.youtube.com/watch?v=WM5pWmKdj2M
    // need to map weather date_time 
    // into dictionary : stock



    // config 
    // const config = {
    //   type: 'bar',
    //   data,
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // };

    //  // render init block
    //  const myChart = new Chart(
    //   document.getElementById('myChart'),
    //   config
    // );

    // need to do a sort for the temperatures and the stock prices.



    // try scatter
  //new Chart(document.getElementById('myChart').getContext('2d'), {
  new Chart(document.getElementById('myChart'), {
  type: 'scatter',
  data: {
      //labels: temps,
      datasets: [
        {
          // shows as the title and legend
          label: 'Max Temp (C) vs Volume ',
          borderColor: "#0dcaf0",
          backgroundColor: "#0dcaf0",
          borderWidth: 1,
          data: data,
          tension: 0.4,
          parsing: {
            xAxisKey: 'temp',
            yAxisKey: 'financials.volume'

          },
          // title: {
          //   // not working
          //   display: true,
          //   text: 'IS THIS THE TITLE'
          // }
          //fill: false,
        }
      //   , 
      //   {
      //     label: 'Stock Volume',
      //     borderColor: "#ffc800",
      //     backgroundColor: "#ffc800",
      //     data: volumes,
      //     fill: false,
      // }
    ]

  },
  options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          // is dispaying title here? NO it is not.
          text: 'Weather vs [Stock] Volume'
      }

      },
      
      scales: {
            // title: {
            //   display: true,
            //   text: "Y or X axis or title?"

            // },
            x:{
              title:{
                display: true,
                text: "X axis label?"

              }
            },
            y:{
              title:{
                display: true,
                text: "Y axis label?"

              },
              ticks:{
                //works to put on $ for y axis : still no label
                
                // this works
                callback: function(value,index,values){
                  return '$' + value;
                }
              }
            },
            // goes to yAxis values adds more
            // yAxes:[
            //   {
            //     scaleLabel:{
            //       display: true,
            //       labelString: 'Hello y axis'
            //     }
            //   }

            // ],
            // xAxes: [{
            //   type: 'linear',
            //   position: 'bottom'
            // }]
      },
      // legend: {
      //   display: false,
      // }
      // tooltips: {
      //     intersect: false,
      //     mode: 'index',
      //     position: "nearest",
      //     callbacks: {
      //       label: function(tooltipItem, data){
      //         var label = data.labels[tooltipItem.index];
      //         return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')'; 
      //       }
      //     }
      
      // },
      // hover: {
      //     mode: 'index',
      //     intersect: true
      // },
      // scales: {
      //     xAxes: [
      //       {
      //         gridLines: {
      //           display: false
      //         },
      //         scaleLabel: {
      //           display: true,
      //           labelString: "Max Temp (Celcius)",
      //         },
      //         stacked: false,
      //         ticks: {
      //           autoSkip: true,
      //           beginAtZero: true
      //         }
      //       }],
      //       yAxes: [
      //         {
      //           gridLines: {
      //             display: true
      //           },
      //           scaleLabel: {
      //             display: true,
      //             labelString: "Price",
      //           },
      //           stacked: false,
      //           ticks: {
      //             autoSkip: true,
      //             beginAtZero: false
      //           }
      //         }],
      // }
  }
});
//}); // end inner d3 of the radio button
});   //end d3


