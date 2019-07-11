import config from './config'

const apiKey = config.apiKey;
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

export default function getArtists(country) {
  const URL_COUNTRY = URL.replace(':country', country)

  return fetch(URL_COUNTRY)
    .then(res => res.json())
    .then(json => json.topartists.artist)
}
