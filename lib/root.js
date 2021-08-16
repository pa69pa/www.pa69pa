var dt={};
dt.params = (new URL(document.location)).searchParams;
console.log('START',dt.params.get("gallery"));

var CLIENT_ID = '835156765013-22ls03782a3tt90qnqhi503flqbusb3h.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDmwXJHYCpCIpMLObplGJexDCpwEVEKzJ8';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.photos.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
console.log('handleClientLoad START');
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listFiles();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
dt.gal=dt.params.get("gallery") || 'galleries/index.json';
//dt.gal='http://www.my-tour.ru/2021/20210708-altai/page2.htm';
//dt.gal='https://drive.google.com/file/d/1661yGbwDgB0Yyocg82xgyWM7gmFX40aB/view?usp=sharing';
//dt.gal='https://www.googleapis.com/drive/v3/files?q=%220B2ewWn6gxlugTTZrMzZiRTkzNTQ%22%20in%20parents&key='+API_KEY;
fetch(dt.gal,{
  method:'GET',
  headers:[["Content-Type","application/x-www-form-urlencoded"],["Content-Type","multipart/form-data"],["Content-Type","text/plain"]],
  mode:'no-cors'//,
//  redirect: 'follow'//,
 // credentials:"include"
}).then(r=>{console.log('r=',r);if(r.ok)return r.text()})
.then(g=>{console.log('G=',g);})
.catch(er=>{console.log('FETCH ERROR=',er);});


function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    }).then(function(response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
}

/*
var map = L.map('map').setView([51.505, -0.09], 13);
var imageUrl = 'http://www.my-tour.ru/2020/20200721-altai/foto2/source/DSCF7588-1.jpg',
    imageBounds = [[0, 0], [800, 800]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
*/
