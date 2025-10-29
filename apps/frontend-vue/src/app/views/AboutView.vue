<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { marked } from "marked";

const html = ref<string>("");

async function loadReadme() {
  const res = await axios.get("/README.md");

  if (!res?.data) return;

  html.value = await marked(res.data);
}

onMounted(loadReadme);
</script>

<template>
  <div class="about">
    <div v-html="html"></div>
  </div>
</template>

<style></style>
