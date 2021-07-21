let memeCanvas = document.querySelector('.image')
let targets = Object.values(document.querySelectorAll('.target'))
let templateButton = document.querySelector('.template')
let textButton = document.querySelector('.text')
let saveButton = document.querySelector('.save')
let textTab = document.querySelector('.text-tab')
let newText = document.querySelector('.text-tab .new-text')
let size = document.querySelector('.text-tab .size')
let color = document.querySelector('.text-tab .color')
let done = document.querySelector('.done')
let del = document.querySelector('.text-tab .delete')
let fontSizeSubtab = document.querySelector('.font-size-subtab')
let sizeAmount = document.querySelector('.font-size-subtab input')
let colorSubTab = document.querySelector('.color-subtab')
let colorSubTabColors = document.querySelectorAll('.color-subtab span')

// apply the movement bahivour in the texts

targets.forEach(target => {
    move(target, () => textTab.classList.add('text-tab-active'))
})

// template button to go to the home page

templateButton.addEventListener('click', () => {
    location = "/"
})

// text button to open all text properties in text-tab

textButton.addEventListener('click', () => {
    textTab.classList.toggle('text-tab-active')

})

// a propertie of text-tab to generate new text

newText.addEventListener('click', () => {
    let textContent = prompt('What is the content of the text ?')
    let memeText = document.createElement('div')
    memeText.classList.add('target')
    memeText.innerText = textContent
    memeCanvas.appendChild(memeText)
    targets.push(memeText)
    move(memeText, () => textTab.classList.add('text-tab-active'))
})

// a propertie of text-tab to open all text-size (font-size) properties tab

size.addEventListener('click', () => {
    if (textTab.classList.contains('text-tab-active')) {
        colorSubTab.classList.remove('sub-tabs-active')
        fontSizeSubtab.classList.toggle('sub-tabs-active')
    }
})

if (!textTab.classList.contains('text-tab-active')) {
    fontSizeSubtab.classList.remove('sub-tabs-active')
}

// a propertie of text-tab => font-size-tab to increase or decrease the text font size 

sizeAmount.addEventListener('input', () => {
    targets.forEach(target => {
        target.style.fontSize = `${sizeAmount.value}px`
    })
})

//  a propertie of text-tab to open all color properties tab

color.addEventListener('click', () => {
    if (textTab.classList.contains('text-tab-active')) {
        fontSizeSubtab.classList.contains('sub-tabs-active')
        colorSubTab.classList.toggle('sub-tabs-active')
    }
})

if (!textTab.classList.contains('text-tab-active')) {
    colorSubTab.classList.remove('sub-tabs-active')
}

colorSubTabColors.forEach(color => {
    color.addEventListener('click', () => {
        targets.forEach(target => {
            target.style.color = window.getComputedStyle(color).backgroundColor
        })
    })
})



del.addEventListener('click', () => {
    let permission = confirm('Are u sure ? All the texts will be deleted')
    if (permission) {
        document.querySelectorAll('.moveable-control-box').forEach(box => {
            box.parentElement.removeChild(box)
        })
        targets.forEach(target => {
            target.parentElement.removeChild(target)
        })
    }
})


saveButton.addEventListener('click', () => {
    domtoimage.toJpeg(memeCanvas, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-lame-meme.jpeg';
            link.href = dataUrl;
            link.click();
        });
})
