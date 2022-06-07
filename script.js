// Establish elements
let imageDisplayDiv = document.getElementById('displayAllImages')
let selectMemeButton = document.getElementById('memeSelection')
let closeMemeButton = document.getElementById('closeMemeSelection')
let userInputFields = document.getElementById('userMemeInputParentID')
let miniMemeDisplay = document.getElementById('miniMemeDisplay')
let submitMemeData = document.getElementById('submitMemeData')
let canvasParentDiv = document.getElementById('canvasParentID')
let memeCanvas = document.getElementById('memeImageCanvas')
let topTextValue = document.getElementById('topText')
let bottomTextValue = document.getElementById('bottomText')

async function fetchMemes() {
    let memeDataAsJSON = (await fetch('https://api.imgflip.com/get_memes')).json() // inline to JSON
    return memeDataAsJSON
}

async function fillDisplayDiv() {
    let memeData = await fetchMemes()

    // iterate through JSON data, create image for each meme
    for (i=0; i<memeData.data.memes.length; i++) {
        let memeImageElement = document.createElement('img')
        memeImageElement.setAttribute('src', memeData.data.memes[i].url)
        memeImageElement.setAttribute('value', i)
        memeImageElement.setAttribute('id', `image-${i}`)
        memeImageElement.style.height = '100px'
        memeImageElement.style.width = '100px'
        imageDisplayDiv.appendChild(memeImageElement)
        let memeImage = document.getElementById(`image-${i}`)

        // hide meme selector, display image, display user input fields, display input button, set image source
        memeImage.addEventListener('click', function() {
            closeMemes()
            selectMemeButton.hidden = true
            userInputFields.style.display = ''
            miniMemeDisplay.src = memeImage.src
        })
    }

    // draw image to canvas, add text
    let ctx = memeCanvas.getContext('2d')
    submitMemeData.addEventListener('click', function() {
        userInputFields.style.display = 'none'
        canvasParentDiv.style.display = ''
        ctx.drawImage(miniMemeDisplay,0,0,400,400) // source established on line 37
        ctx.font = '60px Arial'
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'black'
        // may need to figure out text-wrap to long input values
        ctx.fillText(topTextValue.value, (memeCanvas.height/2)-150, 70)
        ctx.strokeText(topTextValue.value, (memeCanvas.height/2)-150, 70)
        ctx.fillText(bottomTextValue.value, (memeCanvas.height/2)-150, 370)
        ctx.strokeText(bottomTextValue.value, (memeCanvas.height/2)-150, 370)
    })
}

// call fillDisplayDiv while also handling visibility 
selectMemeButton.addEventListener('click',  function() {
    imageDisplayDiv.hidden = false
    selectMemeButton.hidden = true
    closeMemeButton.hidden = false
    fillDisplayDiv()
})

// Close meme images
function closeMemes() {
    imageDisplayDiv.hidden = true
    selectMemeButton.hidden = false
    closeMemeButton.hidden = true
}

closeMemeButton.addEventListener('click', closeMemes)
