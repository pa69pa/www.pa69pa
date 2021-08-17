function handleClientLoad2() {
console.log('handleClientLoad2 START');
    gapi.load('client:auth2', authClient);
}
function authClient(){
const config =  {
  response_type: 'permission',
  scope: SCOPES,
  client_id: CLIENT_ID,
  login_hint: 'pa69pa@gmail.com',
  promt: 'none',
}
gapi.auth2.authorize(config, function(response) {
  // No need to `setToken`, it's done for you by auth2.
  let calConfig = {DISCOVERY_DOCS} // only of google calendar
  gapi.client.init(calConfig).then(function() {
    // then execute a calendar call:
    //gapi.client.calendar.events.list({'calendarId': 'primary'})
    fetchFiles()
  })
})
}
