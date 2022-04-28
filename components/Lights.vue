<script setup></script>

<template>
  <div class="trafficLight">
    <span class="red"></span>
    <span class="yellow"></span>
    <span class="green"></span>
  </div>
</template>
<style scoped>
.trafficLight {
  background-color: black;
  width: 50px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  border-radius: 10px;
}
.trafficLight span {
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: gray;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  /* animation: red 5s linear infinite */
  /* animation-fill-mode: forwards; */
}
.red {
  animation-name: red;
}
.yellow {
  animation-name: yellow;
}
.green {
  animation-name: green;
}

@keyframes red {
  0%,
  33% {
    background-color: red;
  }
  34%,
  100% {
    background-color: gray;
  }
}

@keyframes yellow {
  0%,
  33% {
    background-color: gray;
  }
  34%,
  66% {
    background-color: yellow;
  }
  67%,
  100% {
    background-color: gray;
  }
}

@keyframes green {
  0%,
  66% {
    background-color: gray;
  }
  67%,
  100% {
    background-color: green;
  }
}
</style>
