<template>
  <div class="photo">
    <img class="photo__img" :src="photo.url" :alt="photo.title" />

    <div class="photo__title">
      {{ photo.title | capitalize }}
    </div>

    <div class="photo__actions">
      <span
        :class="['photo__like', { 'photo__like--liked': photo.isFavourite }]"
        @click="handleLike"
        >&#10084;</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotosListItem",
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleLike() {
      this.$emit("like", this.photo.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../styles/variable";

$bgColor: #f7f8f9;
$baseRadius: 8px;

.photo {
  display: flex;
  align-items: center;
  padding: 4px;
  min-height: 40px;
  background: $bgColor;
  border-radius: $baseRadius;

  &:hover {
    opacity: 0.8;
  }

  &__img {
    $size: 32px;
    height: $size;
    width: $size;
    flex-shrink: 0;
    border-radius: $baseRadius;
  }

  &__title {
    margin-left: 11px;
    font-weight: 700;
    font-size: 12px;
    color: $dark;
  }

  &__actions {
    margin-left: auto;
  }

  &__like {
    padding: 0 5px;
    font-size: 20px;
    cursor: pointer;
    &--liked {
      color: $red;
    }
  }
}
</style>
