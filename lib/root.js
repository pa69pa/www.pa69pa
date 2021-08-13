console.log('START');
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=375f16deb04a447c88a2efbe598ab32f',{
	attribution: 'Maps &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	maxZoom: 22
  }).addTo(map);
