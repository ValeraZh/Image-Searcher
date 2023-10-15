<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const searchQuery = ref<string>('');
const router = useRouter();
const route = useRoute();

function pushWithQuery() {
  router.push({
    name: '',
    query: { search: searchQuery.value },
  })
}

onMounted(() => {
  const searchParam = route.query.search;
  if (searchParam) {
    searchQuery.value = searchParam as string;
  }
});
</script>

<template>
  <div class="w-full h-fit flex flex-row items-center pr-5 bg-white rounded">
    <input v-model="searchQuery" @keypress.enter="pushWithQuery()" placeholder="Поиск" class="w-full py-4 px-6 border-none outline-none bg-white rounded placeholder:text-black" />
    <SearchIcon class="w-fit h-fit stroke-black" />
  </div>
</template>
