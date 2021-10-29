<template>
  <div
      class="w-full h-full rounded-md cursor-pointer relative text-transparent hover:text-white bg-gray-200 bg-blend-darken"
  >
    <img
        v-if="file.url"
        :src="file.url"
        :alt="file.name"
        class="w-full h-full sticky object-cover rounded-md bg-fixed hover:bg-gray-200 "
    />
    <div v-else class="bg-gray-200 w-full h-full rounded-md">
      <photograph-icon class="w-1/3 h-full mx-auto text-gray-600"/>
    </div>

    <div class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
      <h1 class="flex-1">{{ file.name }}</h1>
      <div class="flex">
        <p class="p-1 size text-xs">{{ fileSizeHumanReadAble }}</p>
        <button
            class="ml-auto focus:outline-none hover:bg-red-500 p-1 rounded-md"
            @click="$emit('on-delete-click', file)"
        >
          <trash-icon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TrashIcon from "@/components/icons/TrashIcon";
import PhotographIcon from "@/components/icons/PhotographIcon";
export default {
name: "FilePreview",
  components: {PhotographIcon, TrashIcon},
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  computed: {
    fileSizeHumanReadAble() {
      // jacked from: https://github.com/sindresorhus/pretty-bytes
      if (!this.file || typeof this.file.size !== 'number' || isNaN(this.file.size)) {
        return null;
      }
      let num = this.file.size;

      var exponent;
      var unit;
      var neg = num < 0;
      var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      if (neg) {
        num = -num;
      }

      if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
      }

      exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
      num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
      unit = units[exponent];

      return (neg ? '-' : '') + num + ' ' + unit;
    }
  }
}
</script>