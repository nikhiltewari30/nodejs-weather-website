console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const address = input.value;
    const url = "http://localhost:3000/weather?address="+address

    messageOne.textContent = 'loading...'

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            messageOne.textContent = data.error
        else{    
            messageOne.textContent = data.location 
            messageTwo.textContent = data.message
        } 
    })
})


})