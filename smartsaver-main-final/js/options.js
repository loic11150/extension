const submit = document.getElementById('submit')
submit.addEventListener('click', (e) => {
  e.preventDefault()
  submit.style.background = 'white'
  submit.style.color = 'blue'
  let delay = document.getElementById('delay').value
  chrome.storage.local.set({'delay': delay})
})