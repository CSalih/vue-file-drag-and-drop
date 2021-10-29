<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue File Drag and drop</h1>
    <p>
      Vue component that provides a convenient use of the HTML drag and drop
      interface
    </p>

    <vue-file-drag-and-drop v-model="files" />
  </div>
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
