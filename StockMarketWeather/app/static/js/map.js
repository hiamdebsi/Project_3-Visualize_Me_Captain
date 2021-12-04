// Creating the map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Load in data from url
const url = "/data";
console.log(url);

d3.json(url).then(function(response) {
  console.log(response);
  // Create a new marker cluster group.
  //var cluster = new L.MarkerClusterGroup()
  var markers = new L.markerClusterGroup();
  for (let i = 0; i < response.length; i++) {

    // Set the data location property to a variable.
    let coord = response[i].location;
    console.log(coord);
    console.log(response[i].Symbol);

    // Check for the location property.
    if (coord) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([coord[1], coord[0]])
        .bindPopup(response[i].Symbol));
    }

  }

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

});



