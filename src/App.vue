<template lang="pug">
  #app
    img.logo(src='./../dist/logo.png' alt="Logo")
    h1.title PlatziMusic

    a.api(href="https://www.last.fm/es/home" target="_blank")
      img(src="./../dist/lastfm-logo.jpg" )

    select.countrys(v-model="selectedCountry")
      option(v-for="country in countries" :value="country.value") {{ country.name }}

    spinner(v-show="loading")

    ul.artists
      artist(v-for="artist in artists" :artist="artist" :key="artist.mbid")
</template>

<script>
import Artist from "./components/Artist";
import Spinner from "./components/Spinner";
import getArtists from "./api";

export default {
  name: "app",
  data() {
    return {
      artists: [],
      countries: [
        { name: "Argentina", value: "argentina" },
        { name: "Colombia", value: "colombia" },
        { name: "España", value: "spain" },
        { name: "México", value: "mexico" }
      ],
      selectedCountry: "argentina",
      loading: true
    };
  },

  methods: {
    refreshArtist() {
      this.loading = true;
      this.artists = [];

      const _this = this;
      getArtists(this.selectedCountry).then(function(artistsApi) {
        _this.artists = artistsApi;
        _this.loading = false;
      });
    }
  },

  components: {
    artist: Artist,
    spinner: Spinner
  },

  mounted() {
    this.refreshArtist();
  },

  watch: {
    selectedCountry() {
      this.refreshArtist();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

.logo {
  width: 200px;
  margin: 0px auto;
}

.api {
  text-align: center;
  margin-bottom: 32px;
  text-align: center;

  & img {
    width: 120px;
  }
}

.title {
  text-align: center;
  color: #42b983;
}

.countrys {
  margin: 0 auto;
}

.artists {
  justify-self: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 32px;
  margin: 48px 64px;
}
</style>
