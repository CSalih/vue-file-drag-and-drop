<template>
  <div class="
            v-file-drag-and-drop
            relative
            block
            w-full
            border-2 border-gray-300 border-dashed
            rounded-lg
            text-center
            hover:border-gray-400
            focus:outline-none
      "
       @drop.prevent="onFileDrop"
    >
    <input
      type="file"
      ref="fileUploadInput"
      :accept="allowedMimeTypes.join(', ')"
      :multiple="allowMultiple"
      @change="onFileInputChanged"
      hidden
    />
    <div v-if="hasFiles">
      <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
        <button
          type="button"
          class="text-lke rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
          @click="resetFiles"
        >
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" x-description="Heroicon name: outline/x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div>
        <div class="w-full h-full flex flex-col">

          <ul class="flex flex-1 flex-wrap -m-1">
            <li
              v-for="(image, index) in previewImages"
              :key="index"
              class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
            >
              <img class="max-h-12" :src="image.url" :alt="image.name"/>
            </li>
          </ul>


        </div>
        <span
          class="delete"
          style="color: white"
          @click="deleteFileByIndex(index)"
        >
          Add more
        </span>
        <div
          v-if="isFileAppendPossible"
          class="plus"
          @click="showFileUploadDialog"
        >
          +
        </div>
      </div>
    </div>

    <div v-else class="text-center" @click="showFileUploadDialog">
      <slot name="empty-files-header"/>
      <slot name="empty-files-body">
        <button type="button" class="p-12 w-full">
          <FolderOpenIcon class="mx-auto h-12 w-12 text-gray-400"/>
        </button>
      </slot>
      <slot name="empty-files-footer"/>
    </div>
  </div>
</template>

<script>
import FolderOpenIcon from "./FolderOpenIcon";

export default {
  name: "VueFileDragAndDrop",
  components: { FolderOpenIcon },
  props: {
    uploadMsg: {
      type: String,
      default: "Click to upload or drop your images here"
    },
    maxFilesAllowed: {
      type: String,
      default: null
    },
    allowedMimeTypes: {
      type: Array,
      default: () => ["*"]
    },
    allowMultiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      errorMessage: "",
      files: []
    };
  },
  computed: {
    hasFiles () {
      return this.files.length > 0;
    },
    isFileAppendPossible () {
      if (!this.maxFilesAllowed) {
        return true;
      }
      return this.files.length < this.maxFilesAllowed;
    },
    previewImages () {
      return this.files.map((file) => {
        if (file.type.startsWith("image")) {
          return {
            name: file.name,
            url: URL.createObjectURL(file)
          };
        }
        // TODO: Create preview for not image objects
        return require("@/assets/logo.png");
      });
    }
  },
  methods: {
    showFileUploadDialog () {
      this.$refs.fileUploadInput.click();
    },
    onFileDrop (event) {
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let item of event.dataTransfer.items) {
          // If dropped items aren't files, reject them
          if (item.kind === "file") {
            this.appendFile(item.getAsFile());
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let file of event.dataTransfer.files) {
          this.appendFile(file);
        }
      }
    },
    onFileInputChanged (event) {
      // only target files?
      for (let file of event.target.files) {
        this.appendFile(file);
      }
    },
    resetFiles () {
      this.setFiles([]);
    },
    deleteFileByIndex (index) {
      this.files.splice(index, 1);
      this.emitFileIsChanged();
    },
    appendFile (file) {
      this.files.push(file);
      this.$emit("file-append", file);
      this.emitFileIsChanged();
    },
    setFiles (files) {
      this.files = files;
      this.emitFileIsChanged();
    },
    emitFileIsChanged () {
      this.$emit("input", this.files);
    }
  }
};
</script>
