
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

      console.log(stocksymbol);

    stocksymbol.forEach((symbol) =>{
      selectDropdown
        .append("option")
        .text(symbol)
        .property("value", symbol);
    });

    //Sample Data needed to build the charts/plots
    var defaultdata = stocksymbol[0];
    createChart(defaultdata);
  });//end of d3
}//end of init function

//DROP DOWN EVENT CHANGE //
function optionChanged(stocksymbol){
  createChart(stocksymbol);
};

// need to get the data
//unction getData(stocksymbol)
//CREATE CHART FUNCTION
function createChart(stocksymbol){
  
  const url = "/getStatsData/"+`${stocksymbol}`;
  console.log(url);

  d3.json(url).then(function(response) {
    

    //let radioCalled = false;
    var radioSelected;
      //console.log(response)
      // use document . get element by id instead!
      d3.selectAll("input[name='flexRadioCorr']").on("change", function(){
        // event happened need to redraw
        // just need boolean to draw new chart with what have?
        // just need to do an UPDATE for the chart HERE?????
        // does it continue code from here on??? or get destroyed at top
        // can always great a boolean value to say if this was here or not
        console.log(this.value)
        radioSelected = this.value;
        updateChart(stocksymbol, data, radioSelected)
        //radioCalled = true;
        // create another map and pass data through here
      });
      console.log(radioSelected);

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
      


        //tempDatesArray (not needed here)
        // closePriceArray, volumesArray, tempMaxCArray
        //give scatter plot acceptable format 
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
        // "label": `${stocksymbol} Stock Volume`,
        // set up initial chart vars , radio button Volume
        LEGENDLABEL = 'Max Temp (C) vs Volume';
        YAXISKEY = 'financials.volume';
        CHARTTITLE = `Weather vs ${stocksymbol} Stock Volume`;
        XAXISTITLE = 'Temperature (C)';
        YAXISTITLE = 'Stock Volume';
        TICKERADJUST = '';
        // adjust the chart vars, radio button Price
        if (radioSelected === 'Price'){
          CHARTTITLE = `Weather vs ${stocksymbol} Close Price`;
          YAXISTITLE = 'Price';
          YAXISKEY = 'financials.closeprice';
          TICKERADJUST = '$ '
          console.log(CHARTTITLE);
        }

          

      // scatter plot
      // on drop down , destroy the instance
     // THIS IS WORKING TO DESTROY all instances: but need an update one as well
    // for when change in the radio button

    clearChart();

    var doc1 = document.getElementById("myChart");
    var ctx1 = doc1.getContext("2d");

      // myChart= new Chart(document.getElementById('myChart'), {   
      window.myNewChart1 = new Chart(ctx1,{
      type: 'scatter',
      data: {
          datasets: [
            {
              // shows as the title and legend
              label: LEGENDLABEL,
              borderColor: "#0dcaf0",
              backgroundColor: "#0dcaf0",
              borderWidth: 1,
              data: data,
              tension: 0.4,
              parsing: {
                xAxisKey: 'temp',
                yAxisKey: YAXISKEY

              },
            }
        ]
      }, // end of data
      options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              // is dispaying title here? NO it is not.
              text: CHARTTITLE
          }},  // end of plugins
          scales: {
                x:{
                  title:{
                    display: true,
                    text: XAXISTITLE

                  }},  //end of x
                y:{
                  title:{
                    display: true,
                    text: YAXISTITLE
                  },
                  ticks:{
                    //works to put on $ for y axis : still no label
                    // this works
                    callback: function(value,index,values){
                      return TICKERADJUST + value;
                    } }  // end of ticks
                 },  // end of y
            },  // end of scales 
        }   // end of chart options

    });  // end of chart


  // }); // end inner d3 of the radio button
  });   //end d3
  
  
}; // end function

function clearChart(){
  if(window.myNewChart1 != null){
    window.myNewChart1.destroy();
  }
};


function updateChart(stocksymbol, data, radioSelected){
  clearChart();

  LEGENDLABEL = 'Max Temp (C) vs Volume';
  YAXISKEY = 'financials.volume';
  CHARTTITLE = `Weather vs ${stocksymbol} Stock Volume`;
  XAXISTITLE = 'Temperature (C)';
  YAXISTITLE = 'Stock Volume';
  TICKERADJUST = '';
  // adjust the chart vars, radio button Price
  if (radioSelected === 'Price'){
    CHARTTITLE = `Weather vs ${stocksymbol} Close Price`;
    YAXISTITLE = 'Price';
    YAXISKEY = 'financials.closeprice';
    TICKERADJUST = '$ '
    console.log(CHARTTITLE);
  }

  var doc1 = document.getElementById("myChart");
  var ctx1 = doc1.getContext("2d");

  // Display new chart   
  window.myNewChart1 = new Chart(ctx1,{
  type: 'scatter',
  data: {
      datasets: [
        {
          // shows as the title and legend
          label: LEGENDLABEL,
          borderColor: "#0dcaf0",
          backgroundColor: "#0dcaf0",
          borderWidth: 1,
          data: data,
          tension: 0.4,
          parsing: {
            xAxisKey: 'temp',
            yAxisKey: YAXISKEY

          },
        }
    ]
  }, // end of data
  options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          // is dispaying title here? NO it is not.
          text: CHARTTITLE
      }},  // end of plugins
      scales: {
            x:{
              title:{
                display: true,
                text: XAXISTITLE

              }},  //end of x
            y:{
              title:{
                display: true,
                text: YAXISTITLE
              },
              ticks:{
                //works to put on $ for y axis : still no label
                // this works
                callback: function(value,index,values){
                  return TICKERADJUST + value;
                } }  // end of ticks
              },  // end of y
        },  // end of scales 
    }   // end of chart options

});  // end of chart

};


init();
