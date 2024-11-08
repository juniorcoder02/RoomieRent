// Initialize the OpenLayers map using the passed latitude and longitude
var map = new ol.Map({
  target: "map", // The 'map' div ID
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(), // Use OpenStreetMap tiles
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([longitude, latitude]), // Center the map based on the city's coordinates
    zoom: 10, // Adjust zoom level based on your needs
  }),
});

// Optional: Add a marker at the location
var marker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
});

var vectorSource = new ol.source.Vector({
  features: [marker],
});

var markerLayer = new ol.layer.Vector({
  source: vectorSource,
});

map.addLayer(markerLayer);
