<script setup>
import { ref } from "vue";
const isEmpty = ref(true);
const isLoading = ref(false);
const hasLoaded = ref(false);
const hasError = ref(false);
const imageSrc = ref("");

const fetchRandomImage = async () => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${getRandomNumber()}`);
    const data = await response.json();
    imageSrc.value = data.image;
  } catch (e) {
    console.log(e);
  }
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * (1 - 20) + 20);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-bold">Rick & Morty pics</h1>
    <div class="animate-pulse bg-gray-800" v-if="!hasLoaded">
      <div
        class="w-52 h-36"
        :class="{
          'bg-gray-500': isEmpty,
          'bg-blue-500': isLoading,
          'bg-red-500': hasError,
        }"
      ></div>
    </div>
    <img v-if="imageSrc" :src="imageSrc" alt="Random image" class="w-52 h-36" />
    <p v-if="isEmpty" class="text-gray-200">Let's get the first random image!</p>
    <p v-if="hasError" class="text-red-500">Oh no! An error has occured while fetching the image. Please try again!</p>
    <button
      @click="fetchRandomImage()"
      type="button"
      class="rounded-md bg-green-700 p-2 text-white font-bold hover:bg-green-600 transition-colors duration-300"
    >
      Fetch Image
    </button>
  </div>
</template>
