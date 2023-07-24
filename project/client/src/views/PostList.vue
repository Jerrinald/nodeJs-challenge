<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue';

const posts = ref([]);

async function getPosts() {
  const filters = { ...remoteFilters };
  for (let key in filters) {
    if (filters[key] === '') {
      delete filters[key];
    }
  }
  const response = await fetch(
    'http://localhost:5000/posts?' + new URLSearchParams(filters).toString()
  );
  posts.value = await response.json();
}

onMounted(() => {
  return getPosts();
});

const isPublished = ref(false);

const filteredPosts = computed(() => {
  console.log('compute filteredPosts');
  return posts.value.filter((post) => post.published === isPublished.value);
});

const remoteFilters = reactive({
  author: ''
});

console.log(filteredPosts);

//const isThrottled = ref(false);
//watch(remoteFilters, () => {
//  if (isThrottled.value) {
//    return;
//  }
//  isThrottled.value = true;
//  setTimeout(() => {
//    getPosts().then(() => {
//      isThrottled.value = false;
//    });
//  }, 500);
//});

const isDebounced = ref(false);
watch(remoteFilters, () => {
  if (isDebounced.value) {
    clearTimeout(isDebounced.value);
  }
  isDebounced.value = setTimeout(() => {
    getPosts().then(() => {
      isDebounced.value = false;
    });
  }, 500);
});
</script>

<template>
  <div>
    <h3>Local filters</h3>
    <label for="published">is Published ?</label>
    <input id="published" type="checkbox" v-model="isPublished" />
  </div>
  <div>
    <h3>Remote filters</h3>
    <label for="author">Author</label>
    <input id="author" type="text" v-model="remoteFilters.author" />
  </div>
  <ul>
    <li v-for="post in filteredPosts" :key="post.id">{{ post.title }} - {{ post.author }}</li>
  </ul>
</template>
