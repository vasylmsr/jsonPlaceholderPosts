<template>
  <TestPopup :photos="photos" @like="handleLikePhoto" />
</template>

<script>
import TestPopup from "../components/testPopup/TestPopup";
import PlaceholderApi from "../components/services/api/PlaceholderApi";
import LocalStorageApi from "../components/services/LocalStorageApi";

export default {
  components: { TestPopup },
  data() {
    return {
      photos: [],
    };
  },
  async mounted() {
    const savedPhotos = LocalStorageApi.getPhotos();
    if (savedPhotos instanceof Array) {
      this.photos = savedPhotos;
    } else {
      this.photos = await PlaceholderApi.getPhotos();
      this.saveInLocalStorage();
    }
  },
  methods: {
    handleLikePhoto(id) {
      const index = this.photos.findIndex((photo) => photo.id === id);
      const currentEl = this.photos[index];
      this.$set(this.photos, index, {
        ...currentEl,
        isFavourite: !currentEl.isFavourite,
      });
      this.saveInLocalStorage();
    },
    saveInLocalStorage() {
      LocalStorageApi.setPhotos(this.photos);
    },
  },
};
</script>

<style lang="scss">
body {
  background-image: url("../static/img/bg.jpg");
  margin: 0 10px;
}
</style>
