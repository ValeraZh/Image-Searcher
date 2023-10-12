<template>
  <div class="w-full min-h-[100dvh] flex justify-center items-center bg-[#F9F9F9]">
    <div class="flex flex-col items-center px-4">
      <p class="text-[#393053] text-[140px] font-bold sm:text-[200px] md:text-[220px]">
        404
      </p>
      <p class="text-[#393053] text-xl font-semibold text-center">
        Произошла ошибка — такой страницы не существует
      </p>
      <span class="pt-3 text-[#969696] text-center text-lg font-normal">
        Попробуйте снова или вернитесь на главную
      </span>
      <button @click="$router.push('/')" class="mt-10 py-3 px-5 text-white bg-[#393053] rounded-full">
        Вернуться на главную
      </button>
      </div>
  </div>
</template>