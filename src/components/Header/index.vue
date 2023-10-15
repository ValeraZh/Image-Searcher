<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const isOpen = ref<boolean>(false)
const route = useRoute();

const toggleSearchBar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header 
    :class="{ 'border-[#C4C4C4] border-b-8': isOpen }" 
    class="h-fit w-full"
  >
    <nav class="h-fit w-full bg-black">
      <div class="container">
        <div class="w-full flex flex-row justify-between items-center py-2 text-white">
          <RouterLink to="/">
            <Logo class="max-w-[130px] max-h-[72px] aspect-auto" />
          </RouterLink>
          <div class="flex flex-row gap-x-10">
            <div 
              v-if="route.fullPath.includes('home')" 
              @click="toggleSearchBar()" 
              :class="{ 'underline underline-offset-4': isOpen }" 
              class="flex flex-row items-center gap-x-3 text-white text-lg cursor-pointer select-none group"
            >
              <SearchIcon 
                :class="{ 'stroke-white': isOpen }" 
                class="w-[30px] h-[30px] aspect-auto stroke-slate-700 group-hover:stroke-slate-500" 
              />
              <span class="hidden sm:block">Поиск</span>
            </div>
            <RouterLink to="/favorites">
              <div class="flex flex-row items-center gap-x-3 text-white text-lg cursor-pointer select-none group">
                <HeartIcon class="aspect-auto group-hover:stroke-red-600" />
                <span class="hidden sm:block">Избранное</span>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="isOpen" class="max-h-[220px] w-full flex justify-center items-center px-[20%] py-[80px] image-bg">
      <Search class="w-full border z-20" />
    </div>
  </header>
</template>

<style scoped>
.image-bg {
  position: relative;
  width: 100%;
  background: url('@/assets/images/searchbarbg.png') no-repeat;
  aspect-ratio: 3/2 auto;
  backdrop-filter: grayscale(100%) opacity(0.5);
}

.image-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.6);
  z-index: 1;
}
</style>