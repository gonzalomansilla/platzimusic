//********* Este archivo se "encargara" de hacer los "Request" *********
import config from './config'

const apiKey = config.apiKey;
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

// Crear una funcion que haga los "Request"
/*** export default: Necesario para exportar la funcion al importar el archivo ***/
export default function getArtists(country) {
  const URL_COUNTRY = URL.replace(':country', country)
  //    Modulo fetch que viene en el navegador <-- Devuelve una Promise
  return fetch(URL_COUNTRY)
    //   La Promise recibira una respuesta(rest) del servidor
    //   Luego se "retornara" otra promise (json)
    .then(res => {
      var resJson = res.json()
      return resJson
    })
    //   json() retorna otra Promise. De esa hay que obtener los datos de los artistas(Array) (SE RETORNA)
    .then(json => json.topartists.artist)
}
