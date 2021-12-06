//https://stackoverflow.com/questions/28381303/start-date-and-end-date-in-bootstrap

const url = "/stockweatherdata";
console.log(url);

d3.json(url).then(function(response) {
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
        labels.push(weather[i].maxtempC);
    };
    console.log(labels);

 
    new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Weather',
              borderColor: "#0dcaf0",
              backgroundColor: "#0dcaf0",
              data: temps,
              fill: false,
          }, {
              label: 'Stocks',
              // borderColor: "#ffc800",
              // backgroundColor: "#ffc800",
              data: stock,
              fill: false,
          }]
      },
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Weather vs Stock, custom info in tooltip'
          },
          tooltips: {
              mode: 'index',
              callbacks: {
                  title: (tooltipItem, data) => data.labels[tooltipItem[0].index],
                  footer: (tooltipItems, data) => {
                      var sum = 0;
                      tooltipItems.forEach(function(tooltipItem) {
                          sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                      });
                      return 'Sum: ' + sum;
                  },
              },
              footerFontStyle: 'normal'
          },
          hover: {
              mode: 'index',
              intersect: true
          },
          scales: {
              xAxes: [{
                  display: true,
                  scaleLabel: {
                      show: true,
                      labelString: 'Date'
                  }
              }],
              yAxes: [{
                title: {
                  display: true,
                  text: 'Stock Value',
                  font: {
                      size: 15
                  }
                }
                  // display: true,
                  // scaleLabel: {
                  //     show: true,
                  //     labelString: 'Stock Value'
                  // }
              }]
          }
      }
  });
});




