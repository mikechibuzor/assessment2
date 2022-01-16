<template>
  <teleport to="body">
    <div
      v-if="props.showModal"
      class="modal-overlay flex w-full items-center z-50"
    >
      <div
        class="modal-content relative h-[50%] lg:h-[70%] xl:h-[85%] rounded-2xl shadow-xl w-11/12 lg:w-10/12 xl:w-8/12 mx-auto bg-white"
      >
        <div class="img h-[80%] overflow-hidden">
          <img
            :src="props.imageObject.urls.full"
            class="object-cover object-center h-full w-full rounded-t-2xl"
            alt=""
          />
        </div>
        <div
          class="text h-[20%] px-4 lg:px-16 xl:px-20 pb-5 flex flex-col justify-center"
        >
          <h3 class="name text-gray-700 text-xl">
            {{ props.imageObject.name }}
          </h3>
          <p class="location text-gray-500 mt-2 text-sm">
            {{ props.imageObject.location }}
          </p>
        </div>
        <!-- close modal button -->
        <div
          class="close-modal absolute cursor-pointer -top-7 right-0 xl:-right-14"
          @click="emit('toggleModal')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 fill-gray-200 stroke-gray-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
// props
const props = defineProps({
  showModal: {
    tpye: Boolean,
    default: false,
  },
  imageObject: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

// emits
const emit = defineEmits(["toggleModal"]);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
}
</style>
