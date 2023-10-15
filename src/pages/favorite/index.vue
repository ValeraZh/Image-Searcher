<script setup lang="ts">
import { createApi } from 'unsplash-js';
import { ref, onMounted } from 'vue';

const photos = ref<any[]>([]);

const unsplash = createApi({
  accessKey: 'r4qv03iCqKk2ipZyk9UrdouZajlK2nIffXA2mY5SEEo',
});

const favoriteIds = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

async function fetchPhotosFromLocalStorage() {
  const requests = favoriteIds.value.map(async (id: string) => {
    try {
      const response = await unsplash.photos.get({ photoId: id });
      const data = await response.response;
      return data;
    } catch (error) {
      console.error('Error fetching photo with ID', id, ':', error);
      return null;
    }
  });

  const photosData = await Promise.all(requests);
  photos.value = photosData.filter((photo) => photo !== null);
}

function remove(id: string) {
  const index = favoriteIds.value.indexOf(id);

  if (index !== -1) {
    favoriteIds.value.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.value));
  }

  fetchPhotosFromLocalStorage()
}

onMounted(() => {
  fetchPhotosFromLocalStorage()
});
</script>

<template>
  <div class="w-full h-fit">
    <div class="container">
      <h1 class="py-[40px] text-center text-[60px] font-semibold">Избранное</h1>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="photo in photos" 
          :key="photo.id" 
          class="relative w-full cursor-pointer group"
        >
          <img 
            :src="photo.urls.full" 
            :alt="photo.alt_description" 
            class="h-[360px] w-full aspect-square object-cover rounded shadow z-10" 
          />
          <div class="hidden absolute max-h-[30%] p-3 group-hover:block top-0 left-0 right-0 text-center bg-white bg-opacity-80 z-30">
            <span class="text-black">{{ photo.alt_description }}</span>
          </div>
          <button @click="remove(photo.id)" class="hidden absolute bottom-0 left-0 right-0 py-3 font-medium group-hover:block bg-[red] bg-opacity-50">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>