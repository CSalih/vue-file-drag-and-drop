<template>
  <div class="file-preview">
    <img v-if="file.url" :src="file.url" :alt="file.name" class="image" />
    <div v-else class="image-placeholder">
      <photograph-icon class="photograph-icon" />
    </div>
    <div class="image-overlay">
      <h1>{{ file.name }}</h1>
      <div>
        <p>{{ fileSizeHumanReadAble }}</p>
        <button class="remove-button" @click="$emit('on-delete-click', file)">
          <trash-icon class="trash-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TrashIcon from "./icons/TrashIcon";
import PhotographIcon from "./icons/PhotographIcon";
export default {
  name: "FilePreview",
  components: { PhotographIcon, TrashIcon },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fileSizeHumanReadAble() {
      // jacked from: https://github.com/sindresorhus/pretty-bytes
      if (
        !this.file ||
        typeof this.file.size !== "number" ||
        isNaN(this.file.size)
      ) {
        return null;
      }
      let num = this.file.size;

      var exponent;
      var unit;
      var neg = num < 0;
      var units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      if (neg) {
        num = -num;
      }

      if (num < 1) {
        return (neg ? "-" : "") + num + " B";
      }

      exponent = Math.min(
        Math.floor(Math.log(num) / Math.log(1000)),
        units.length - 1
      );
      num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
      unit = units[exponent];

      return (neg ? "-" : "") + num + " " + unit;
    },
  },
};
</script>

<style scoped>
.file-preview {
  @apply w-full h-full rounded-md cursor-pointer relative text-transparent hover:text-white bg-gray-200 bg-blend-darken;
}
.file-preview .image {
  @apply w-full h-full sticky object-cover rounded-md bg-fixed hover:bg-gray-200;
}
.file-preview .image-placeholder {
  @apply bg-gray-200 w-full h-full rounded-md;
}
.photograph-icon {
  @apply w-1/3 h-full mx-auto text-gray-600;
}
.trash-icon {
  @apply w-4 h-4;
}
.file-preview .image-overlay {
  @apply flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3;
}
.file-preview .image-overlay h1 {
  @apply flex-1;
}
.file-preview .image-overlay div {
  @apply flex;
}
.file-preview .image-overlay div p {
  @apply p-1 text-xs;
}
.file-preview .image-overlay .remove-button {
  @apply ml-auto focus:outline-none hover:bg-red-500 p-1 rounded-md;
}
</style>
