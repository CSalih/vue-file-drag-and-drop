<template>
  <article class="container mx-auto">
    <header class="mx-auto text-center">
      <div class="bg-white">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div class="text-center">
            <img class="h-12 mx-auto" alt="Vue logo" src="./assets/logo.png" />
            <p
              class="
                mt-1
                text-4xl
                font-bold
                text-gray-900
                sm:text-5xl sm:tracking-tight
                lg:text-6xl
              "
            >
              Vue File Drag and drop
            </p>
            <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Vue component that provides a convenient use of the HTML drag and
              drop interface
            </p>
          </div>
        </div>
      </div>
    </header>
    <main>
      <vue-file-drag-and-drop v-model="files" />
    </main>
  </article>
</template>

<script>
import VueFileDragAndDrop from "@/components/VueFileDragAndDrop.vue";

export default {
  name: "App",
  components: {
    VueFileDragAndDrop,
  },
  data() {
    return {
      files: [],
    };
  },
};
</script>
