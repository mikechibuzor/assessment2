<template>
  <div
    :class="props.gridClass"
    class="oveflow-hidden relative cursor-pointer"
    @click="toggleModal"
  >
    <img
      :src="props.imageObject.urls.regular"
      class="object-cover z-10 relative h-full w-ful shadow-sm rounded-xl"
      alt=""
    />
    <div class="text absolute left-8 bottom-10 w-full z-30">
      <h3
        class="name text-white text-xl"
        :class="{
          'text-gray-800':
            props.imageObject.color.startsWith('#f') ||
            props.imageObject.color.startsWith('#d'),
        }"
      >
        {{ props.imageObject.name }}
      </h3>
      <p
        class="location text-white text-sm"
        :class="{
          'text-gray-800':
            props.imageObject.color.startsWith('#f') ||
            props.imageObject.color.startsWith('#d'),
        }"
      >
        {{ props.imageObject.location }}
      </p>
    </div>
    <!-- conditional tint overlay for white image -->
    <div
      class="tint-this rounded-xl"
      :class="{
        'tint-overlay':
          props.imageObject.color.startsWith('#f') ||
          props.imageObject.color.startsWith('#d'),
      }"
    ></div>

    <!-- image modal -->
    <image-modal
      :show-modal="showModal"
      :image-object="imageObject"
      @toggleModal="toggleModal"
    ></image-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ImageModal from "../modal/ImageModal.vue";
// props
const props = defineProps({
  imageObject: {
    type: Object,
    default: () => {
      return {};
    },
  },
  gridClass: {
    type: String,
    default: "",
  },
});

// reactive variables
const showModal = ref(false);

// methods
const toggleModal = () => {
  showModal.value = !showModal.value;
  // to prevent on-scroll when modal is open
  document.querySelector("body").classList.toggle("overflow-hidden");
};
</script>

<style scoped>
/* tint overlay for contrast for white color images */
.tint-overlay {
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
}

.overflow-hidden {
  position: fixed;
  height: 100vh;
  overflow: hidden;
}
</style>
