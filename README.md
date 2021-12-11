# The "STOCK" Network: NYSE Analysis
Please refer to the [report](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/Project%203%20-%20Report.pdf) and [presentation](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/Project%203%20-%20Presentation.pdf) for a thorough explanation of this project. Below you will find the analysis steps and links to the relevant folders and files.

## Motivation
A gentle breeze, a bit of rain… We don’t mind this. Although, when it comes to a full downpour of rain or a large snow storm, this inclement weather may devastate a life, damage a property, or close off an internet connection. Did some climatic event affect your financial situation? Let’s investigate if daily weather has some effect on stock markets.

## Project Objective
### Hypothesis:
Maximum temperature correlates to the local Headquarters of the NYC stock exchanges between January 2018 and October 2021.

### Questions to answer:
* Is there a trend between the daily max temperature (C) and stock volume over time?
* Is there a trend between the daily max temperature (C) and stock closing price over time?
* Is there a relationship between the daily max temperature (C) and stock volume?
* Is there a relationship between the daily max temperature (C) and stock closing price?


To answer these questions and to confirm our hypothesis, we extracted data for NYC’s daily weather and stock information for 23 stock markets within NYC between January 2018 and October 2021. Ultimately, we had to map the daily max temperature with the daily stock volume and closing prices for each stock market on days the NYSE was open.

# Methods
## Data Sources Used:
  * NYC Daily Weather Data: [World Weather Online API](https://www.worldweatheronline.com/developer/api/docs/historical-weather-api.aspx)
  * Stock Information: [Alphavantage API](https://www.alphavantage.co/documentation/#avc-price)
  * Geo Information: Google Maps and Geopy
  * [Data CSV and Json Files](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/tree/main/StockMarketWeather/app/data)

## Final Production Database: 
 * MongoDB

## Javascript Libraries Used: 
  * Visualizations for Analysis and Correlation: [Chart.js](https://www.chartjs.org/)
  * To get access to our routed data: D3
  * To create our interactive webpage: [Bootstrap 5.0 template](https://startbootstrap.com/previews/agency)


# Web Page Breakdown
### [Home Page:](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/StockMarketWeather/app/templates/index.html)
Our landing page is where you will find our motivation, hypothesis, and steps taken to gather needed data for the following pages. In addition, it displays the results we obtained from the data analysis and correlation performed.
### [Analysis Page:](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/StockMarketWeather/app/templates/stockweather.html)
In here, we find two multi y-axis graphs that demonstrate the trend of stock volumes, stock closing prices, and max temperature over time (between January 2018 - October 2021).
There is a dropdown menu which allows you to switch between 23 stock markets within NYC, and see their trend respectively.
Both graphs are interactive, and you can get the exact values of each point by just clicking on it.
There is also the option to only display one of the two y variables on each graph. For instance, if you only want the stock volume to appear on the first graph, you simply click on the Max Temperature line in the legend, and it will automatically cross it out and remove temperature data from the graph.
### [Correlation Page:](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/StockMarketWeather/app/templates/stats.html)
In this page, we find an interactive scatter plot which can be manipulated by two things: the stock symbol selected through the dropdown, and two radio buttons to display the volume or price for the stock chosen. The result is a scatter plot of Max Temp vs Close Price or Max Temp vs Volume. Additionally, the Pearson r<sup>2</sup> value is calculated, to help determine the fit of the correlation for the chart.

### [Map Page:](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/StockMarketWeather/app/templates/map.html)
The map page shows an interactive map displaying the stock HQs of 23 stock markets within NYC. There is a ‘zoom in’ feature which allows you to look into the map areas. When clicking on a particular marker, a popup shows up displaying the following about the HQ marker chosen:

* Stock Symbol and Full Company Name
* HQ Address
* Sector
* Industry

# Code Highlight
* ### [ETL Process](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/Project%203%20-%20Report.pdf)
* ### [Flask App Queries](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/blob/main/StockMarketWeather/app/app.py)
* ### [HTML Templates](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/tree/main/StockMarketWeather/app/templates)
* ### [Javascripts](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/tree/main/StockMarketWeather/app/static/js)
* ### [Styling Files](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/tree/main/StockMarketWeather/app/static/css)
* ### [Clean Data for Reference](https://github.com/hiamdebsi/Project_3-Visualize_Me_Captain/tree/main/StockMarketWeather/app/data)

# Research Analysis
Our analysis focused on three main variables: daily max temperature, stock volume, and stock closing price. 
* The stock closing price is the last price at which a financial investment with monetary value (or better known as security) is traded during the regular trading day. A security’s closing price is the standard benchmark used by investors to track its performance over time.[(1)](https://www.investopedia.com/terms/c/closingprice.asp)
* Stock volume on the other hand is the number of shares of a security traded during a given period of time. Generally, securities with a higher daily volume are more liquid than those without given that they are more active. Volume can help indicate relative significance of a market move.[(2)](https://www.investopedia.com/terms/v/volume.asp)

In Figures 1.0 and 1.1, we can see a sinusoidal trend for the max temperature across time, which is justified by the change in seasons. As for the stock volume, there seems to be a linear trend that is mostly consistent over time. Between the max temperature and stock volume, there does not appear to be a particular trend. This same observation is applicable to the second figure. 
In order to confirm this further, we created a regression model for each stock variable being analyzed vs the max temperature, to see if there is any relationship between the two (Figures 1.2 and 1.3).
The strength of a correlation between the Maximum Temperature and a Stock Closing Price or Transaction Volume data is measured using the Pearson r<sup>2</sup> values: 
  * Weak relationship: r<sup>2</sup> < 0.5
  * Moderate relationship: 0.5<  r<sup>2</sup> < 0.7
  * Strong relationship:  r<sup>2</sup> >= 0.7

As one reviews the scatter plots, one can notice some correlations by viewing the Pearson ‘r-squared’ value. The daily maximum temperature presents a strong possibility of a correlation with the stock close prices, given that the r<sup>2</sup> value is greater than 0.9. As well, there is a moderate possibility of a correlation with the maximum temperature and volume, with an r<sup>2</sup> value greater than 0.5. However, these correlations may adjust slightly depending on the stock that is chosen.

We do have to note that Pearson’s r-squared correlation uses a linear regression model. Some of the plots for the data appear non-linear and an alternative correlation method could be used for accuracy.

# Conclusions
Based on the findings obtained, we accept the null hypothesis declared of Weather (Max Temp) correlates to the local HQs of NYC stock exchanges during January 2018 to October 2021. 

When a regression analysis is performed, the daily maximum temperature presents a strong possibility of a correlation with the stock close prices (for IBM the r<sup>2</sup>=0.96884). As well, there is a moderate possibility of a correlation with the maximum temperature and volume, with an r<sup>2</sup> value of greater than 0.52819 for IBM. 

## Notes on Conclusions

Obviously maximum temperature does not dictate the stock closing price or transaction volume. There are many other factors that affect the stock market, and this result can be very controversial. The analysis observed is just showing the trends observed. 


