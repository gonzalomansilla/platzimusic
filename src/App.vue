<template lang="pug">
  #app
    img.logo(src='../dist/logo.png' alt="Logo")
    h1.title PlatziMusic

    select.countrys(v-model="selectedCountry")
      option(v-for="country in countries" v-bind:value="country.value") {{ country.name }}
    spinner(v-show="loading")
    ul.artists
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
// Hay que indicarle a la Vista(View) los componentes que tendra y utilizara
import Artist from "./components/Artist";
import Spinner from "./components/Spinner";
import getArtists from "./api";

// View
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
      // El spinner se ejecutara cuando inicia y se cambia de pais
      this.loading = true;
      // De esta forma, los artistas no se ven mientras carga
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

  // Una vez "Montado"(ciclo de vida de un componente) el elemento, se hace un request a la API last.fm para obtener los datos y mostrar la respuesta en la pantalla
  mounted() {
    // Se jecuta codigo despues de "crear" el componente, es decir en la "montura" del mismo en el DOM... EN ESTE caso, se quiere obtener los artists
    this.refreshArtist();
  },

  /*
    Este objeto, sirve para 'escuchar' cambios sobre algun "atributo".
    En este caso, cada vez seleccionado un pais, se debe ejecutar un funcion que haga un "request"
  */
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
  grid-gap: 16px;
  margin: 48px 0;
}
</style>
