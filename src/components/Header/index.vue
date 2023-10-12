<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref<boolean>(false)

const toggleSearchBar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header :class="{ 'border-[#C4C4C4] border-b-8': isOpen }" class="h-fit w-full">
    <nav class="h-fit w-full bg-black">
      <div class="container">
        <div class="w-full flex flex-row justify-between items-center py-2 text-white">
          <RouterLink to="/">
            <Logo class="max-w-[130px] max-h-[72px] aspect-auto" />
          </RouterLink>
          <div class="flex flex-row gap-x-10">
            <div @click="toggleSearchBar()" :class="{ 'underline underline-offset-4': isOpen }" class="flex flex-row items-center gap-x-3 text-white text-lg cursor-pointer group">
              <SearchIcon :class="{ 'stroke-white': isOpen }" class="aspect-auto stroke-slate-700 group-hover:stroke-slate-500" />
              Поиск
            </div>
            <RouterLink to="/favorites">
              <div class="flex flex-row items-center gap-x-3 text-white text-lg cursor-pointer group">
                <HeartIcon class="aspect-auto group-hover:stroke-red-600" />
                Избранное
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="isOpen" class="max-h-[220px] w-full flex justify-center items-center py-[80px] image-bg">
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