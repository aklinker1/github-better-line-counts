<script lang="ts" setup>
import TokenPref from "./TokenPref.vue";
import ShowGeneratedCountPref from "./ShowGeneratedCountPref.vue";
</script>

<template>
  <ul class="space-y-4">
    <Suspense><TokenPref /></Suspense>
    <Suspense><ShowGeneratedCountPref /></Suspense>
  </ul>
</template>
