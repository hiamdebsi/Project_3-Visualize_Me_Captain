
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
    
    var defaultdata = stocksymbol[0];
    createChart(defaultdata);
  });//end of d3
}//end of init function

//DROP DOWN EVENT CHANGE //
function optionChanged(stocksymbol){
  createChart(stocksymbol);
};


//CREATE CHART FUNCTION
function createChart(stocksymbol){
  
  const url = "/stockweatherdata/"+`${stocksymbol}`;
  console.log(url);

  d3.json(url).then(function(response) {
  
    var radioSelected = "";
    //console.log(response)
    // use document . get element by id instead!
    d3.selectAll("input[name='flexRadioCorr']").on("change", function(){
      
      radioSelected = this.value;
      updateChart(stocksymbol, data, radioSelected, corrClosePrice, corrVolume)
      
    });
   
    // Check last radio selection
    console.log ("my radio selected may be null here");
    console.log(radioSelected);
    if (radioSelected == null || radioSelected === '') {
      console.log("in radio selected == null");
      // get the last selected value
      if (document.getElementById('flexRadioCorr1').checked) {
        radioSelected = document.getElementById('flexRadioCorr1').value;
      }
      else {
          radioSelected = document.getElementById('flexRadioCorr2').value;
        } 
      
    }
    

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

    //let tempDatesArray = weather.map(({ date_time }) => date_time);

    let tempMaxCArray = weather.map(({ maxtempC }) => maxtempC);
    // sort ascending
    tempMaxCArray.sort(function(a, b){return a - b});


    // CORRELATION MATH
    // get the correlation for both the price and volume with maxTempC
    corrVolume = pearsonCorrelation([tempMaxCArray, volumesArray],0,1);
    corrClosePrice = pearsonCorrelation([tempMaxCArray,closePriceArray],0,1);
   
    //give scatter plot acceptable format 
    const data = tempMaxCArray.map((temp,index)=>{
      let dataObject ={};
      dataObject.temp = temp;
      dataObject.financials={};
      dataObject.financials.closeprice = closePriceArray[index];
      dataObject.financials.volume = volumesArray[index];

      return dataObject;

    })
    //console.log(data);
    // set up initial chart vars , radio button Volume
    LEGENDLABEL = 'Max Temp (C) vs Volume';
    YAXISKEY = 'financials.volume';
    CHARTTITLE = `Maximum Daily Temperature vs ${stocksymbol} Stock Volume between Jan 2018 - Oct 2021`;
    XAXISTITLE = 'Maximum Temperature (C)';
    YAXISTITLE = 'Stock Volume';
    TICKERADJUST = '';
    // adjust the chart vars, radio button Price
    if (radioSelected === 'Price'){
      LEGENDLABEL = 'Max Temp (C) vs Price';
      CHARTTITLE = `Maximum Daily Temperature vs ${stocksymbol} Close Price between Jan 2018 - Oct 2021`;
      YAXISTITLE = 'Price';
      YAXISKEY = 'financials.closeprice';
      TICKERADJUST = '$ '
      console.log(CHARTTITLE);
      // put correlation price to view
      displayCorr(corrClosePrice);

    }
    else{
      // put the volume corr price to view
      displayCorr(corrVolume);
    }

        

    // scatter chart
    clearChart();

    var doc1 = document.getElementById("myChart");
    var ctx1 = doc1.getContext("2d");

 
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
                    callback: function(value,index,values){
                      return TICKERADJUST + value;
                    } }  // end of ticks
                  },  // end of y
            },  // end of scales 
        }   // end of chart options

    });  // end of chart

    });   //end d3

  
}; // end function create chart

function clearChart(){
  if(window.myNewChart1 != null){
    window.myNewChart1.destroy();
  }
};


function updateChart(stocksymbol, data, radioSelected, corrClosePrice, corrVolume){
  clearChart();


  LEGENDLABEL = 'Max Temp (C) vs Volume';
  YAXISKEY = 'financials.volume';
  CHARTTITLE = `Maximum Daily Temperature vs ${stocksymbol} Stock Volume between Jan 2018 - Oct 2021`;
  XAXISTITLE = 'Maximum Temperature (C)';
  YAXISTITLE = 'Stock Volume';
  TICKERADJUST = '';
  // adjust the chart vars, radio button Price
  if (radioSelected === 'Price'){
    LEGENDLABEL = 'Max Temp (C) vs Price';
    CHARTTITLE = `Maximum Daily Temperature vs ${stocksymbol} Close Price between Jan 2018 - Oct 2021`;
    YAXISTITLE = 'Price';
    YAXISKEY = 'financials.closeprice';
    TICKERADJUST = '$ '
    console.log(CHARTTITLE);
    // put correlation price to view
    displayCorr(corrClosePrice);

  }
  else{
    // put the volume corr price to view
    displayCorr(corrVolume);
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
                callback: function(value,index,values){
                  return TICKERADJUST + value;
                } }  // end of ticks
              },  // end of y
        },  // end of scales 
    }   // end of chart options

 });  // end create chart

}; // end of update chart function

function displayCorr(corrValue){
  // returns r and want to see r2
  if (corrValue){
    var den2 = Math.pow(corrValue,2);
    // five decimal places at the most  num.toString();
    den2= den2.toFixed(5);
    document.getElementById('lblRValue').innerHTML = den2.toString();

  }
};  // end of displayCorr



init();
