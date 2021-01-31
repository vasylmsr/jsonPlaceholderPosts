<template>
  <div class="vendor-filter">
    <div class="vendor-filter__header">
      <div class="vendor-filter__title">
        Фильтр:
        <span
          v-for="filter in filters"
          :key="filter.label"
          :class="[
            'vendor-filter__name',
            {
              'vendor-filter__name--active': filter.value === activeFilter,
            },
          ]"
          @click="handleFilterClick(filter)"
          >{{ filter.label }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import filters from "./filters";

export default {
  props: {
    activeFilter: {
      type: String,
      required: true,
    },
  },

  computed: {
    filters() {
      return [
        { label: "По альбомам", value: filters.album },
        { label: "Избранное", value: filters.isFavourite },
      ];
    },
  },

  methods: {
    handleFilterClick(clickedFilter) {
      const newFilter =
        this.activeFilter === clickedFilter.value
          ? filters.asc
          : clickedFilter.value;
      this.$emit("changeFilter", newFilter);
    },
  },
};
</script>

<style lang="scss">
.vendor-filter {
  &__header {
    margin: 0 0 1.5rem;
  }

  &__title {
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 1.9rem;
  }

  &__name {
    margin: 0 0.5rem;
    text-decoration: underline;
    cursor: pointer;

    &--active {
      color: orange;
    }
  }
}
</style>
