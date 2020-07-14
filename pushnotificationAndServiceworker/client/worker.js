console.log('Service worker loading...')

self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: 'Notified by Fantastic Genius',
    icon: 'http://logo.clearbit.com/spotify.com'
  })
});

console.log('push sent')