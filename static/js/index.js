console.log('melongz');

fetch('/api/userInfo', {
  method: 'POST',
  body: JSON.stringify({userName: 'melongz', password: '123456'}),
  headers: {
    'content-type': 'application/json',
  }
})
  .then(res => res.json())
  .then(res => console.log(res));
