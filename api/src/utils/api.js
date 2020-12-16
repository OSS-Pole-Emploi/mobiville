import config from 'config'
import axios from 'axios'
import { csvToArrayJson } from './csv'
import {readFile, readFileSync} from 'fs'
import slugify from 'slugify'
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
import stripHtml from 'string-strip-html'

export function getAllCities() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/cities-france.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  })
}

export function getAllTensions() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/cities-tension.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data))
      }
    })
  }).then(list => (list.map(c => ({...c, bassin_id: c.bassin}))))
}

export function getAllBassins() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/lexique-bassins.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data, {delimiter: ','}))
      }
    })
  }).then(list => (list.map(c => ({...c, code_commune: c.ccommune, nom_com: c.nomcom, bassin_id: c.be19, bassin_name: c.nombre19}))))
}

export function getFranceShape() {
  let rawdata = readFileSync(__dirname + '/../assets/datas/france-shape-side-sea.geo.json')
  return JSON.parse(rawdata).features[0].geometry.coordinates.flat(2)
}

export function getFrenchWeatherStation() {
  return new Promise((resolve, reject) => {
    readFile(__dirname + '/../assets/datas/french-weather-station-list.csv', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(csvToArrayJson(data, {delimiter: ','}))
      }
    })
  })
}

export function loadWeatherFile(stationId) {
  return axios.get(config.weatherFile(stationId)).then(data => data.data.split('\r\n'))
}

export const wikipediaSearchCity = (cityName) => {
  const cityNameSlug = slugify(cityName)

  return axios.get(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${cityNameSlug}`).then((response) => {
    if(response.data && response.data.query && response.data.query.search) {
      return response.data.query.search
    }

    return []
  })
}

export const wikipediaDetails = (pageName) => axios.get(`https://fr.wikipedia.org/w/api.php?action=parse&prop=text&format=json&utf8=true&page=${pageName}`).then((response) => {
  if(response.data && response.data.parse && response.data.parse.text && response.data.parse.text['*']) {
    const html = entities.decode(response.data.parse.text['*']).replace(/\\n/, '')
    // const found = html.match(/<p(.*?)>(.*?)<\/p>/gm) // regex doesn't works ! encoding pb? 
    const split = html.split('<p')

    for(let i = 1; i < split.length; i++) {
      const value = split[i]
      const indexP = value.indexOf('</p>')
      if(indexP !== -1) {
        const description = stripHtml(value.substring(1, indexP)).result.trim()
        if(description.toLowerCase().indexOf(pageName.toLowerCase()) !== -1) {
          return description
        }
      }
    }
  }

  return null
})

export const getAllRegions = () => {
  let rawdata = readFileSync(__dirname + '/../assets/datas/anciennes-nouvelles-regions.json')
  return JSON.parse(rawdata).regions.map(r => ({...r.fields}))
}