<script setup lang="ts">
import { createApi } from 'unsplash-js';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const unsplash = createApi({
  accessKey: 'r4qv03iCqKk2ipZyk9UrdouZajlK2nIffXA2mY5SEEo',
});

const photos = ref<any>([]);
const route = useRoute();

const param = ref(route.query.search)

async function fetchPhotos(params: string) {
  try {
    const response = await unsplash.photos.getRandom({
      query: params,
      count: 9,
    });

    const data = await response.response;
    photos.value = data;
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

watch(
  () => route.query.search,
  async (newResult: any) => {
    await fetchPhotos(newResult);
  }
);

onMounted(() => {
  fetchPhotos(String(param.value));
});
</script>

<template>
  <main class="w-full h-fit">
    <div class="container">
      <div class="grid grid-cols-1 gap-4 py-20 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="photo in photos" 
          :key="photo.id" 
          @click="$router.push(`/detail/${photo.id}`)" 
          class="relative w-full cursor-pointer group"
        >
          <img 
            :src="photo.urls.full" 
            :alt="photo.alt_description" 
            class="h-[360px] w-full aspect-square object-cover rounded-md z-10" 
          />
          <div class="hidden absolute max-h-[30%] p-3 group-hover:block inset-0 text-center bg-white bg-opacity-80 z-30">
            <span class="text-black">{{ photo.alt_description }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>