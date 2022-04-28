<script setup>
import { useMachine } from "@xstate/vue";
import { imageMachine } from "../machines/imageMachine";
import { delay, getRandomNumber } from "../utils";
const { state, send } = useMachine(imageMachine);

const fetchRandomImage = async () => {
  try {
    send("FETCH_IMG");
    await delay(300);

    const response = await fetch(`https://rickandmortyapi.com/api/character/${getRandomNumber()}`);
    const data = await response.json();
    console.log(data.image);
    send("FETCH_IMG_SUCCESS", { imageSrc: data.image });
  } catch (e) {
    send("FETCH_IMG_ERROR");
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-bold">Rick & Morty pics</h1>
    <div class="animate-pulse bg-gray-800" v-if="!state.matches('hasLoaded')">
      <div
        class="w-52 h-36"
        :class="{
          'bg-gray-500': state.matches('empty'),
          'bg-blue-500': state.matches('isLoading'),
          'bg-red-500': state.matches('hasError'),
        }"
      ></div>
    </div>
    <img v-if="state.matches('hasLoaded')" :src="state.context.imageSrc" alt="Random image" class="w-52 h-36" />
    <p v-if="state.matches('empty')" class="text-gray-200 mt-2">Let's get the first random image!</p>
    <p v-if="state.matches('hasError')" class="text-red-500 mt-2">
      Oh no! An error has occured while fetching the image. Please try again!
    </p>
    <button
      @click="fetchRandomImage()"
      type="button"
      :disabled="state.matches('isLoading')"
      class="rounded-md bg-green-700 p-2 mt-2 text-white font-bold hover:bg-green-600 transition-colors duration-300"
    >
      Fetch Image
    </button>
  </div>
</template>
