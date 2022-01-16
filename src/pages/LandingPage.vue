<template>
  <div class="wrapper">
    <!-- header -->
    <header
      class="bg-gray-300 px-8 md:px-16 lg:px-24 xl:px-32 py-8 md:py-12 xl:py-20"
    >
      <!-- search form and search result box -->
      <div class="search-form-search-result">
        <!-- search form -->
        <form v-if="searchState === 'initial'" @submit.prevent="submitSearch">
          <div class="form-element w-full relative flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for photo"
              v-model="search"
              class="px-16 py-3.5 placeholder:text-gray-800 custom-breakpoint:py-5 rounded-md outline-none border-none shadow-sm w-full"
            />
            <button type="submit" class="absolute left-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="custom-breakpoint:h-6 custom-breakpoint:w-6 h-5 w-5 stroke-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
        <!-- searching for -->
        <div v-if="searchState === 'searching'" class="searching-for">
          <h2 class="text-2xl md:text-4xl font-normal text-gray-800">
            Searching for <span class="opacity-60">"{{ search }}"</span>
          </h2>
        </div>
        <div v-if="searchState === 'search-successful'" class="searching-for">
          <h2 class="text-xl font-bold text-gray-600">
            Search Results for <span class="opacity-60">"{{ search }}"</span>
          </h2>
        </div>
      </div>
    </header>
    <!-- main content -->
    <main
      class="flex xl:-ml-8 -mt-3 md:-mt-6 px-3 pb-10 md:px-16 lg:px-24 xl:px-32 items-center justify-center my-10"
    >
      <!-- if data gets loaded display this guy -->
      <div v-if="state.unsplashData" class="grid-box gap-x-8 gap-y-8 w-10/12">
        <single-image
          v-for="(data, index) in state.unsplashData"
          :key="data.id"
          :grid-class="'box' + (index + 1)"
          :image-object="data"
        ></single-image>
      </div>
      <!-- else lazy-load a skeletal frame of the guy up there -->
      <div v-else class="grid-box gap-x-8 gap-y-8 w-10/12">
        <single-image-skeleton
          v-for="x in 7"
          :key="x"
          :grid-class="'box' + x"
        ></single-image-skeleton>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import SingleImage from "../components/single-image/SingleImage.vue";
import SingleImageSkeleton from "../components/single-image/SingleImageSkeleton.vue";

// access key
const accessKey = "pn09t6RYhAxyIldi1O0ksHkPCiFj6lqDP5PUkuEnAUs";

// url
const url =
  "https://api.unsplash.com/search/photos/?query=african&page=1&per_page=7";

// reactive variable
const state = reactive({
  unsplashData: null,
});
const search = ref("");
const searchState = ref("initial");

// methods
const submitSearch = async () => {
  // return if input is invalid
  if (!search.value) {
    return;
  }
  // new url becomes
  const searchUrl = `https://api.unsplash.com/search/photos/?query=${search.value}&page=1&per_page=7`;
  // sets state.unsplashData to null to lazy load and prepare for new data
  state.unsplashData = null;
  // current search state
  searchState.value = "searching";

  // handles fetch --- this block of code should be in a function though, used onMounted also
  const { data } = await axios.get(searchUrl, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      Authorization: `Client-ID ${accessKey}`,
    },
  });
  searchState.value = "search-successful";
  state.unsplashData = data.results.map((res) => {
    return {
      name: res.user.name,
      location: res.user.location,
      urls: res.urls,
      color: res.color,
    };
  });
  // after 1 seconds have elapsed, return search to original state
  setTimeout(() => {
    searchState.value = "initial";
  }, 1000);
};

// lifecycle hook
onMounted(async () => {
  const { data } = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      Authorization: `Client-ID ${accessKey}`,
    },
  });
  state.unsplashData = data.results.map((res) => {
    return {
      name: res.user.name,
      location: res.user.location,
      urls: res.urls,
      color: res.color,
    };
  });
});
</script>

<style scoped></style>
