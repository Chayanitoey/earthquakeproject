
/*global L*/
/*global fetch*/



let map = L.map("map").setView([10, 10], 3);

var LeafIcon = L.Icon.extend({
    options: {
      iconSize:     [38, 95],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
    }
});



L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attribution/">CartoDB</a>',
    subdomains: "abcd",
    maxZoom: 35
}).addTo(map);

fetch("significant_month.geo.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {  // Add GeoJSON layer to the map once the file is loaded
        L.geoJSON(data, {onEachFeature: onEachFeature })
        .addTo(map);
    })

fetch("20biggest.geo.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {  // Add GeoJSON layer to the map once the file is loaded
        L.geoJSON(data, { onEachFeature:popUp, icon: icon})
        .addTo(map);
    })


 

// function icon(feature,layer) {
//       var hue_min = 5;
//             var hue_max = 0;
//             var hue =
//               (feature.properties.mag / 10) * (hue_max - hue_min) + hue_min;
//               return  layer.CircleMarker(feature, {
//         	radius: 50, 
//             color: 'red'
//             //   fillColor: "hsl(" + hue + ", 100%, 50%)",
//             });
//     };


function icon(data) {
  var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
    L.marker( data,{icon: greenIcon})
};


function onEachFeature(feature, layer) {
    layer.bindPopup('Earthquake Location : ' + feature.properties.place +'</b><br />'+ 'Magnitude : ' + feature.properties.mag)
}



function popUp(feature, layer) {
    


    layer.bindPopup('Earthquake Location : ' + feature.properties.place +'</b><br />'+ 'Magnitude : ' + feature.properties.mag + '</b><br/>'+
              '<a href="' + feature.properties.url + '">Discover the impact...</a>')
     
}

