const publicVapidKey = 'BLWiRT2mq01j4pe7bjmXqKQs2hkpJ0Mzgo1leVbCnCzostTGGRPIK11wioydw5nVbSslYAFrdf32t64ZaLVRjXo';

//Register service worker, register Push and Send push
const send = async () => {
  //Register Service worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('./worker.js');
  console.log('Service worker registered...');

  //Register Push
  console.log('Registering push..');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push registered');

  //Send Push
  console.log('Sending push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('push sent')
}

//Check for service worker
if('serviceWorker' in navigator){
  send().catch(err => console.error(err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
 