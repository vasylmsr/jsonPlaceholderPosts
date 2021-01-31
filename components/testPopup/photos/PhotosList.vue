<template>
  <div class="list">
    <PhotosListItem
      v-for="photo in photos"
      :key="photo.id"
      :photo="photo"
      class="item"
      @like="$emit('like', $event)"
    />
  </div>
</template>

<script>
import PhotosListItem from "./PhotosListItem";
export default {
  name: "PhotosList",
  components: { PhotosListItem },
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  display: grid;
  grid-gap: 8px;
}
</style>
