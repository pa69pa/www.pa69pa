var Y_CLIENT_ID = '478de809920e4a4fb75a057203d7fc22';

// handle auth
//window.location='https://oauth.yandex.ru/authorize?response_type=token&client_id='+Y_CLIENT_ID

function fetchYandexFiles(dir){
fetch('https://cloud-api.yandex.net/v1/disk/public/resources?public_key='+dir+'')
.then(r=>{console.log('Yr=',r);if(r.ok)return r.json()})
.then(y=>{console.log('Yf=',y);})
.catch(er=>{console.log('FETCH ERROR=',er);});

}

fetchYandexFiles(encodeURI('https://disk.yandex.ru/d/ijAXqzxFy9WH9Q'))
