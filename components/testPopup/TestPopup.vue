<template>
  <PopupContainer class="popup">
    <div class="popup__body">
      <VendorFilter
        :active-filter="filterBy"
        @changeFilter="handleFilterChanging"
      >
      </VendorFilter>
      <div class="popup__results">
        <div
          v-for="(column, index) in filteredArraySection"
          :key="index"
          class="popup__data-column"
        >
          <PhotosGroup
            v-for="sectionGroup in column"
            :key="sectionGroup.title"
            :photos="sectionGroup"
            @like="$emit('like', $event)"
          />
        </div>
      </div>
    </div>
  </PopupContainer>
</template>

<script>
import PopupContainer from "../core/PopupContainer";
import VendorFilter from "./VendorFitler";
import PhotosGroup from "./photos/PhotosGroup";
import { getArrWithSubArrays, sortArrByObjField } from "../../utils/helpers";
import filters from "./filters";
import LocalStorageApi from "../services/LocalStorageApi";

let getGroupedData = (items, titleFieldCallback) => {
  const sections = Object.values(
    items.reduce((acc, item) => {
      const field = titleFieldCallback(item);
      if (!acc[field]) {
        acc[field] = { title: field, data: [item] };
      } else {
        // Для удобства использования в попапе следует выводить не более 32-х альбомов.
        // Каждый из которых может содержать 5-10 элементов
        if (acc[field].data.length < 5) {
          acc[field].data.push(item);
        }
      }
      return acc;
    }, {})
  );
  return sections.sort(sortArrByObjField("title"));
};

const getGroupedDataByLetter = (items) =>
  getGroupedData(items, (item) => item.title[0].toUpperCase());

const getGroupedDataByAlbum = (items) =>
  getGroupedData(items, (item) => item.albumId);

export default {
  name: "TestPopup",
  components: { PhotosGroup, VendorFilter, PopupContainer },
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filterBy: filters.asc,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    filteredArraySection() {
      let result = [];
      switch (this.filterBy) {
        case filters.isFavourite: {
          const favourite = this.photos.filter((photo) => photo.isFavourite);
          result = getGroupedDataByLetter(favourite);
          break;
        }
        case filters.album: {
          result = getGroupedDataByAlbum(this.photos);
          break;
        }
        case filters.asc:
        default:
          result = getGroupedDataByLetter(this.photos);
      }

      return getArrWithSubArrays(result, 4);
    },
  },
  watch: {
    filterBy: {
      handler(newValue) {
        LocalStorageApi.setPhotosFilter(newValue);
      },
    },
  },
  mounted() {
    this.filterBy = LocalStorageApi.getPhotosFilter() || filters.asc;
  },
  methods: {
    handleFilterChanging(value) {
      this.filterBy = value;
    },
  },
};
</script>

<style scoped lang="scss">
@mixin scrollbar {
  &::-webkit-scrollbar {
    width: 5.5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f0f0f0;
    border-radius: 2px;
  }
}

.popup {
  &__body {
    width: 100%;
    max-width: 1300px;
    height: 600px;
    margin: auto;
    padding: 3.6rem 4.8rem 6rem;

    font-weight: 700;
    font-family: Open Sans, Roboto, sans-serif;
    font-size: 1.2rem;

    background: #ffffff;
    border-radius: 1.2rem;
    box-sizing: border-box;
  }

  &__results {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 44px;
    max-height: 480px;
    overflow-y: auto;
    @include scrollbar;
  }

  &__data-column {
    display: grid;
    grid-gap: 26px;
    align-self: baseline;
  }
}
</style>
