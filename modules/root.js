// .then(res => {
//     res.data.data.memes.forEach(meme => {
//         memesArray.push(meme)
//     })
// })
// .then(() => {
//     return 'memesArray'
// })

let axios = require('axios')

let addMemesInit = async () => {
    let memesArray = []
    let response = await axios.get('https://api.imgflip.com/get_memes')
    let memes = await response.data.data.memes

    memes.forEach(meme => {
        memesArray.push(meme)
    })

    return memesArray
}

let addMemes = async () => {
    let result = await addMemesInit()
    return result
}

module.exports = addMemes()