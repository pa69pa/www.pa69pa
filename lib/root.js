var dt={};
dt.params = (new URL(document.location)).searchParams;
console.log('START',dt.params.get("gallery"));

dt.gal=dt.params.get("gallery") || 'galleries/index.json';
//dt.gal='http://www.my-tour.ru/2021/20210708-altai/page2.htm';
//dt.gal='https://drive.google.com/file/d/1661yGbwDgB0Yyocg82xgyWM7gmFX40aB/view?usp=sharing';
//dt.gal='https://www.googleapis.com/drive/v3/files?q=%220B2ewWn6gxlugTTZrMzZiRTkzNTQ%22%20in%20parents&key='+API_KEY;
fetch(dt.gal/*,{
  method:'GET',
  headers:[["Content-Type","application/x-www-form-urlencoded"],["Content-Type","multipart/form-data"],["Content-Type","text/plain"]],
  mode:'no-cors'//,
//  redirect: 'follow'//,
 // credentials:"include"
}*/).then(r=>{console.log('r=',r);if(r.ok)return r.text()})
.then(g=>{console.log('G=',g);})
.catch(er=>{console.log('FETCH ERROR=',er);});


/*
var map = L.map('map').setView([51.505, -0.09], 13);
var imageUrl = 'http://www.my-tour.ru/2020/20200721-altai/foto2/source/DSCF7588-1.jpg',
    imageBounds = [[0, 0], [800, 800]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
*/
