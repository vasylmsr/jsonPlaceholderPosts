<template>
  <div class="group">
    <div class="group__title">{{ photos.title }}</div>
    <PhotosList :photos="photos.data" @like="$emit('like', $event)" />
  </div>
</template>

<script>
import PhotosList from "./PhotosList";
export default {
  name: "PhotosGroup",
  components: { PhotosList },
  props: {
    photos: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../styles/variable";

.group {
  &__title {
    margin-left: 12px;
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    color: $dark;
  }
}
</style>
