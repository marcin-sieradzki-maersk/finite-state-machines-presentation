---
# try also 'default' to start simple
theme: seriph
# apply any windi css classes to the current slide
class: "text-center"
background: https://cdn.pixabay.com/photo/2016/09/01/13/52/steampunk-1636156_960_720.png
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# persist drawings in exports and build
drawings:
  persist: false
---

# Finite state machines using XState

---

# Developing stateful UI is hard

<div class="mt-24 flex gap-4 w-full items-center justify-center">
  <img src="/error-success.jpg" class="h-72 w-72 rounded-lg" />
  <img src="/no-keyboard.jpg" class="h-72 w-72 rounded-lg" />
</div>

---

<Center>
  <img src="/happy-path.jpg" class="h-full rounded-lg" />
</Center>
---

<CenterHeading>
<div class="flex">
<img src="/story.png" class="h-6 mt-2 mr-2"/> 
<span>As a user I would like to be able to fetch a random image, so that I can look at it.</span>
</div>
</CenterHeading>

---

```js {all|3|5-9|15|12-24}
<script setup>
import { ref } from "vue";
const imageSrc = ref("");

const fetchRandomImage = async () => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/1`);
  const data = await response.json();
  imageSrc.value = data.image;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-bold">Rick & Morty pics</h1>
    <img v-if="imageSrc" :src="imageSrc" alt="Random image" class="w-52 h-36" />
    <button
      @click="fetchRandomImage()"
      type="button"
      class="rounded-md bg-green-700 p-2 text-white font-bold hover:bg-green-600 transition-colors duration-300"
    >
      Fetch Image
    </button>
  </div>
</template>

```

---

<Example/>

---

<Example/>
<div class="w-full h-full flex justify-center items-center mt-[-10%]">
  <ul class="bg-gray-700 p-4 rounded-lg">
    <li>Image fetch fails?</li>
    <li>Loading indicator</li>
    <li>error message</li>
    <li>empty state</li>
    <li>disable button when fetching</li>
  </ul>
</div>

---

# boolean flags to the rescue!

```js
const isEmpty = ref(true);
const isLoading = ref(false);
const hasLoaded = ref(false);
const hasError = ref(false);
...

```

---

```js {all|3-5|11,12|14,16}
const fetchRandomImage = async () => {
  try {
    isLoading.value = true;
    hasLoaded.value = false;
    hasError.value = false;

    const response = await fetch(`https://rickandmortyapi.com/api/character/${getRandomNumber()}`);
    const data = await response.json();
    imageSrc.value = data.image;

    hasLoaded.value = true;
    isEmpty.value = false;
  } catch (e) {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};
```

---

```js{all|3-12|13-15|19}
  <div class="flex flex-col items-center justify-center">
    <h1 class="leading-8 text-3xl font-bold mb-4">Rick & Morty pics</h1>
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
    <img v-if="hasLoaded" :src="imageSrc" alt="Random image" class="w-52 h-36" />
    <p v-if="isEmpty" class="text-gray-200">Let's get the first random image!</p>
    <p v-if="hasError" class="text-red-500">Oh no! An error has occured while fetching the image.</p>
    <button
      @click="fetchRandomImage()"
      type="button"
      :disabled="isLoading"
      class="mt-4 rounded-md bg-green-700 p-2
      text-white font-bold hover:bg-green-600
      transition-colors duration-300"
    >
      Fetch Image
    </button>
  </div>

```

---

<FlagsSolved/>

---

<div class="flex gap-4 w-full items-center justify-center h-full">
  <img src="/example-short.PNG" class="h-full rounded" />
  <img src="/example-long.PNG" class="h-full rounded" />
</div>

---

<h1>Bottom up approach</h1>
<div >
  <ul class="p-4 w-fit">
    <li>Quick to start coding</li>
    <li>Easy to write</li>
    <li>Works</li>
  </ul>
</div>

---

<h1>Bottom up approach</h1>
<div >
  <ul class="p-4 w-fit">
    <li>Difficult to test</li>
    <li>Difficult to understand</li>
    <li>Error/bug prone</li>
    <li>Difficult to enhance</li>
    <li>Adding extra feature makes it worse</li>
  </ul>
</div>

---

<CenterHeading>
  Finite State Machines
  <br>
  (Deterministic Finite Automata)
</CenterHeading>

---

<Center>
  <div class="flex">
    <div class="text-3xl mr-5">
    <span>Deterministic</span>
    <br>
    <span>Finite</span>
    <br>
    <span>Automata</span>
    </div>
    <img src="/lights.png" class=" rounded" />
  </div>
</Center>
---

<Center>
  <div class="flex">
    <div class="text-3xl mr-5">
    <span>Deterministic</span>
    <br>
    <span class="font-bold text-green-500">Finite</span>
    <br>
    <span>Automata</span>
    </div>
    <img src="/finite.png" class=" rounded" />
  </div>
</Center>

---

<Center>
  <div class="flex">
    <div class="text-3xl mr-5">
    <span>Deterministic</span>
    <br>
    <span>Finite</span>
    <br>
    <span class="font-bold text-green-500" >Automata</span>
    </div>
    <img src="/automata.png" class=" rounded" />
  </div>
</Center>

---

<Center>
  <div class="flex">
    <div class="text-3xl mr-5">
    <span class="font-bold text-green-500">Deterministic</span>
    <br>
    <span>Finite</span>
    <br>
    <span>Automata</span>
    </div>
    <img src="/deterministic.png" class=" rounded" />
  </div>
</Center>

---

# Other attributes

 <ul class="p-4 w-fit">
  <li>Can be in exactly one of a finite number of states at any given time</li>
  <li>Can change from one state to another in response to an action(transition)</li>
  <li>Has predefined set of actions that trigger transitions</li>
</ul>

---

# Other attributes

 <ul class="p-4 w-fit">
  <li>Can be in exactly one of a finite number of states at any given time</li>
  <li>Can change from one state to another in response to an action(transition)</li>
  <li>Has predefined set of actions that trigger transitions</li>
</ul>
<div class="h-72">
  <img src="/dog.jpg" class="h-full aspect-square rounded-lg" />
</div>

---

<CenterHeading>
  Designing State Machines
</CenterHeading>

---

<Center>
  <div class="h-[80%]">
  <img src="/20.PNG" class="h-full rounded-lg" />
  <span class="mt-2 text-xs">Source: https://www.youtube.com/watch?v=VU1NKX6Qkxc</span>
  </div>
</Center>

---

<Center>
  <div class="h-[80%]">
  <img src="/21.PNG" class="h-full rounded-lg" />
  <span class="mt-2 text-xs">Source: https://www.youtube.com/watch?v=VU1NKX6Qkxc</span>
  </div>
</Center>

---

<Center>
  <div class="h-[80%]">
  <img src="/22.PNG" class="h-full rounded-lg" />
  <span class="mt-2 text-xs">Source: https://www.youtube.com/watch?v=VU1NKX6Qkxc</span>
  </div>
</Center>

---

<Center>
  <div class="h-[80%]">
  <img src="/23.PNG" class="h-full rounded-lg" />
  <span class="mt-2 text-xs">Source: https://www.youtube.com/watch?v=VU1NKX6Qkxc</span>
  </div>
</Center>

---

# XState

<ul class="p-4 w-fit">
  <li>Library for creating state machines and state charts</li>
  <li>Framework agnostic</li>
  <li>Offers framework bindings for ease of use</li>
</ul>

---

<CenterHeading>
  Let's code something!
</CenterHeading>

---

<StateMachine/>

---

<CenterHeading>
  Thank you!
</CenterHeading>
