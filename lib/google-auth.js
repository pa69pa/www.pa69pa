function handleClientLoad2() {
console.log('handleClientLoad2 START');
    gapi.load('client:auth2', authClient);
}
var G_CLIENT_ID = '835156765013-22ls03782a3tt90qnqhi503flqbusb3h.apps.googleusercontent.com';
var G_API_KEY = 'AIzaSyDmwXJHYCpCIpMLObplGJexDCpwEVEKzJ8';
var G_DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var G_SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly';

function authClient(){
const config =  {
  response_type: 'permission',
  scope: G_SCOPES,
  client_id: G_CLIENT_ID,
  login_hint: 'pa69pa@gmail.com',
  promt: 'none',
}
gapi.auth2.authorize(config, function(response) {
  // No need to `setToken`, it's done for you by auth2.
  let calConfig = {G_DISCOVERY_DOCS} // only of google calendar
  gapi.client.init(calConfig).then(function() {
    // then execute a calendar call:
    //gapi.client.calendar.events.list({'calendarId': 'primary'})
    fetchGoogleFiles('0B2ewWn6gxlugTTZrMzZiRTkzNTQ')
  })
})
}
// https://developers.google.com/drive/api/v3/reference/files/list
function fetchGoogleFiles(dir,tok=''){
    console.log('fetchFiles');
    fetch('https://content.googleapis.com/drive/v3/files?q=%27'+dir+'%27%20in%20parents&orderBy=name&key='+G_API_KEY+tok
    ,{method:'GET'
    ,referrer:'https://pa69pa.github.io/www.pa69pa/index.html'
    ,referrerPolicy:'unsafe-url'})
    .then(r=>{console.log('Fr=',r);if(r.ok)return r.json()})
    .then(f=>{console.log('Fs=',f);if(f.nextPageToken)fetchFiles(dir,'&pageToken='+f.nextPageToken)})
    .catch(er=>{console.log('FETCH FILES ERROR=',er);});
}

/*

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
console.log('handleClientLoad START');
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
         apiKey: API_KEY
        ,clientId: CLIENT_ID
        ,discoveryDocs: DISCOVERY_DOCS
        ,scope: SCOPES
        //,referer : 'https://pa69pa.github.io'
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        let sin=gapi.auth2.getAuthInstance().isSignedIn.get();
        updateSigninStatus(sin);
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
        //listFiles();
        //retrieveAllFiles(cb)
        fetchFiles()
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}
function cb(res){console.log('CB() res=',res);}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}



function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}
function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(0B2ewWn6gxlugTTZrMzZiRTkzNTQ, Ural2017)"
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

function retrieveAllFiles(callback) {
    var retrievePageOfFiles = function (request, result) {
        request.execute(function (resp) {
            result = result.concat(resp.items);
            console.log('resp.items',resp.items);
            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.drive.files.list({
                    'pageToken': nextPageToken
                });
                retrievePageOfFiles(request, result);
            } else {
                callback(result);
            }
        });
    };

    var initialRequest = gapi.client.drive.files.list({
        q : "'0B2ewWn6gxlugTTZrMzZiRTkzNTQ' in parents"
    });
    retrievePageOfFiles(initialRequest, []);
}
*/
