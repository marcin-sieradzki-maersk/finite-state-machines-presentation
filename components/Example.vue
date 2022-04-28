<script setup>
import { ref } from "vue";
const imageSrc = ref("");

const fetchRandomImage = async () => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${getRandomNumber()}`);
  const data = await response.json();
  imageSrc.value = data.image;
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * (1 - 100) + 100);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-bold">Rick & Morty pics</h1>
    <img v-if="imageSrc" :src="imageSrc" alt="Random image" class="w-52 h-36" />
    <button
      @click="fetchRandomImage()"
      type="button"
      class="rounded-md mt-2 bg-green-700 p-2 text-white font-bold hover:bg-green-600 transition-colors duration-300"
    >
      Fetch Image
    </button>
  </div>
</template>
