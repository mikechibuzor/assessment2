<template>
  <div
    :class="props.gridClass"
    class="oveflow-hidden bg-gray-100 shadow-sm rounded-xl h-full w-full relative cursor-pointer"
  >
    <img class="object-cover h-full w-ful" alt="" />
    <div class="text absolute left-8 bottom-10 w-full z-30">
      <h3 cqlass="h-10" />
      <p class="location h-8 mt-1 text-white text-sm" />
    </div>
  </div>
</template>

<script setup>
// props
const props = defineProps({
  gridClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
h3 {
  width: 60%;
  height: 20px;
  margin-bottom: 4px;
  animation: pulse-bg 1s infinite;
}

p {
  width: 47%;
  height: 16px;
  animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}
</style>
