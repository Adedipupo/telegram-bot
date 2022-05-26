let { createClient } = require('pexels')
let Jimp = require('jimp')
const fs = require('fs')
let { facts } = require('./facts')


async function generateImage(imagePath) {
  let fact = randomFact()
  let photo = await getRandomImage(fact.animal)
  await editImage(photo, imagePath, fact.fact)
}


function randomFact() {
  let fact = facts[randomInteger(0, (facts.length - 1))]
  return fact
}


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function getRandomImage(animal) {
  try {
    const client = createClient(process.env.PEXELS_API_KEY)
    const query = animal
    let image

    await client.photos.search({ query, per_page: 10 }).then(res => {
      let images = res.photos
      image = images[randomInteger(0, (images.length - 1))]

    })

    return image

  } catch (error) {
    console.log('error downloading image', error)
    getRandomImage(animal)
  }
}