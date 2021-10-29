<template>
  <div
    class="v-file-drag-and-drop"
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
    <div v-if="hasFiles" >


      <button type="button" class="clearButton" @click="resetFiles">
        x
      </button>


      <div class="imageHolder" >
        <div class="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
          <div class="col-span-1 flex justify-center py-8 px-8 bg-gray-50" v-for="(image, index) in previewImages" :key="index">
            <img class="max-h-12" :src="image.url" :alt="image.name"/>
          </div>
        </div>
        <span class="delete" style="color: white" @click="deleteFileByIndex(index)">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
        <div v-if="isFileAppendPossible" class="plus" @click="showFileUploadDialog">+</div>
      </div>
    </div>

    <div v-else class="text-center" @click="showFileUploadDialog">
      <slot name="empty-files-header" />
      <slot name="empty-files-body" >
        <button
          type="button"
          class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none"
        >
        <FolderOpenIcon class="mx-auto h-12 w-12 text-gray-400" />
        </button>
      </slot>
    </div>
    <slot name="empty-files-footer" />
  </div>
</template>

<script>
import FolderOpenIcon from './FolderOpenIcon'
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
      default: () => ['*'],
    },
    allowMultiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      errorMessage: "",
      files: [],
    };
  },
  computed: {
    hasFiles() {
      return this.files.length > 0;
    },
    isFileAppendPossible() {
      if (!this.maxFilesAllowed) {
        return true;
      }
      return this.files.length < this.maxFilesAllowed
    },
    previewImages() {
      return this.files.map((file) => {
        if (file.type.startsWith("image")) {
          return {
            name: file.name,
            url: URL.createObjectURL(file)
          };
        }
        // TODO: Create preview for not image objects
        return require("@/assets/logo.png")
      })
    }
  },
  methods: {
    showFileUploadDialog() {
      this.$refs.fileUploadInput.click();
    },
    onFileDrop(event) {
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let item of event.dataTransfer.items) {
          // If dropped items aren't files, reject them
          if (item.kind === 'file') {
            this.appendFile(item.getAsFile());
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let file of  event.dataTransfer.files) {
          this.appendFile(file);
        }
      }
    },
    onFileInputChanged(event) {
      // only target files?
      for (let file of  event.target.files) {
        this.appendFile(file);
      }
    },
    resetFiles() {
      this.setFiles([]);
    },
    deleteFileByIndex(index) {
      this.files.splice(index, 1);
      this.emitFileIsChanged();
    },
    appendFile(file) {
      this.files.push(file)
      this.$emit("file-append", file);
      this.emitFileIsChanged();
    },
    setFiles(files) {
      this.files = files;
      this.emitFileIsChanged();
    },
    emitFileIsChanged() {
      this.$emit("input", this.files);
    }
  },
};
</script>
