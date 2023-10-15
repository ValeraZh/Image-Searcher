<script setup lang="ts">
import { createApi } from 'unsplash-js';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const photo = ref<any>();
const isAdded = ref<boolean>(false);
const route = useRoute();

const unsplash = createApi({
  accessKey: 'r4qv03iCqKk2ipZyk9UrdouZajlK2nIffXA2mY5SEEo',
});

async function fetchPhoto() {
  try {
    const response = await unsplash.photos.get({ photoId:  String(route.params.id)})
    const data = await response.response;
    photo.value = data;
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
}

function downloadFile() {
  fetch(photo?.value?.links?.download, {
    method: 'GET',
  })
    .then((response) => response.blob())
    .then((blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      const fileLink = document.createElement('a');

      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'name');
      document.body.appendChild(fileLink);

      fileLink.click();
    })
    .catch((err) => {
      console.log(err)
    });
};

function addToFavorite(id: string) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites.push(id);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  isAdded.value = true
}

const isFavorite = computed(() => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.includes(route.params.id);
})

onMounted(() => {
  fetchPhoto()
})
</script>

<template>
  <div class="relative w-full h-full">
    <img 
      :src="photo?.urls?.full" 
      :alt="photo?.urls?.full" 
      class="w-full h-[70vh] hidden absolute top-0 right-0 left-0 object-cover backdrop-blur-sm grayscale sm:block"
    >
    <div class="container">
      <div class="flex justify-center items-center">
        <div class="w-full h-fit">
          <div class="relative flex flex-row items-center justify-between py-8 z-20">
            <div class="flex flex-row gap-x-5">
              <img 
                :src="photo?.user?.profile_image.medium" 
                :alt="photo?.user?.name" 
                class="h-[56px] w-[56px] object-cover rounded"
              >
              <div class="flex flex-col">
                <span class="text-black sm:text-white">{{ photo?.user?.name }}</span>
                <span class="text-black text-opacity-30 sm:text-white">@{{ photo?.user?.username }}</span>
              </div>
            </div>
            <div class="flex flex-row gap-5">
              <button 
                @click="addToFavorite(photo.id)"
                :disabled="isFavorite || isAdded"
                class="h-[50px] w-[50px] flex items-center justify-center p-3 bg-white rounded-md shadow disabled:cursor-not-allowed"
              >
                <HeartIcon 
                  class="stroke-black"
                  :class="{'stroke-[red]' : isFavorite || isAdded}"
                />
              </button>
              <button @click="downloadFile()" class="w-fit flex flex-row items-center justify-center gap-x-4 py-3 px-4 bg-[#FFF200] rounded-[8px] shadow-2xl sm:px-5">
                <DownloadIcon />
                <span class="hidden sm:block">Downloand</span>
              </button>
            </div>
          </div>
          <img :src="photo?.urls?.full" alt="" class="relative max-h-[300px] w-full object-cover rounded shadow-2xl z-10 sm:max-h-[65vh]">
        </div>
      </div>
    </div>
  </div>
</template>