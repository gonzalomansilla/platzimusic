<template lang="pug">
    li.artist
      img.artist__img(:src="artist.image[2]['#text']")
      h2.artist__name: a(:href="artist.url" target="_blank") {{ artist.name }}
</template>

<script>
export default {
  name: "artist",
  props: ["artist"]
};
</script>

<style lang="scss" scoped>
.artist {
  margin: 0;
  text-align: center;
  border-radius: 6px;
  box-shadow: 0px 2.5px 6px 2px hsla(0, 0%, 65%, 0.25);
  padding: 16px 32px;

  .artist__img {
    border-radius: 100%;
    border: 2.5px solid hsl(153, 47%, 50%);
  }

  .artist__name {
    & a {
      color: #35495e;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
