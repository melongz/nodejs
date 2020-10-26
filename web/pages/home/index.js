console.log('melongz');
fetch('/api/personInfo', {
  method: 'POST',
  body: JSON.stringify({name: 111, age: 222}),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})
  .then(res => res.json())
  .then(res => console.log(res))
