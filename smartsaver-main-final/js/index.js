const button = document.getElementById('button')
const key = 'isActivated'
let timer = 2
let isActivated = false
//cleaner than %
let color = document.getElementById("color");
let power = document.getElementById("power");
let carbon = document.getElementById("carbon");
let energy = document.getElementById("energy");
let total = document.getElementById("total");
let json;

function modifie(json){
    if(json.state != ""){
        color.style.background = json.state.startsWith('Cleaner than') ? "green" : "red";
    }else{
        color.style.background = 'white'
    }
    
    power.innerHTML = json.power;
    carbon.innerHTML = json.CO2;
    energy.innerHTML = json.state;
    total.innerHTML = json.total;
}
chrome.tabs.query({
  active: true,
  lastFocusedWindow: true
}, function(tabs) {
  // and use that tab to fill in out title and url
  var tab = tabs[0];
  fetch('http://localhost/workshop/index.php?URL='+tab.url)
.then((response) => response.json())
.then((data)=> modifie(data))
  // alert(tab.url);
});

// modify the option delay
chrome.storage.local.get('delay', (result) => {
  if(result['delay']) timer = result['delay']
})

// manage the close tabs button
button.addEventListener('click', () => {
  isActivated = !isActivated
    if (isActivated) {
      button.style.background = 'blue'
      button.style.color = 'white'
      button.textContent = 'Activated'
      function setTime() {
        timer -= 1
    }
    const interval = setInterval(function(){
      setTime();
      if (timer === 0){
        chrome.tabs.query({}, function(tabs) {
            chrome.tabs.query({ active: false }, function(tabs) {
                tabs.forEach(element => {
                    chrome.tabs.remove(element.id);
        
                });
            });
        });
        clearInterval(interval);
      }
    }, 1000);
    } else {
      button.style.background = 'grey'
      button.textContent = 'Deactivated'
    }
});
/*
if (isActivated) {
  // close tabs extension with the timer
  function setTime() {
      timer -= 1
  }
  const interval = setInterval(function(){
    setTime();
    if (timer === 0){
      chrome.tabs.query({}, function(tabs) {
          chrome.tabs.query({ active: false }, function(tabs) {
              tabs.forEach(element => {
                  chrome.tabs.remove(element.id);
      
              });
          });
      });
      clearInterval(interval);
    }
  }, 1000);
}
*/
// manage emails
const openEmail = document.getElementById('open-email')
openEmail.addEventListener('click', () => {
  const input = document.querySelector('#input-email')
  let tab = ''
  if (input.value) {
    tab = input.value
    chrome.tabs.create({
      'url': tab
    });
  } else {
     input.style.border = '2px solid red'
  }
})

// open options page
const options = document.getElementById('options')
options.addEventListener('click', () => {
  chrome.runtime.openOptionsPage(() => {
    console.log('yes')
  })
})