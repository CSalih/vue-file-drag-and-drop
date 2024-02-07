<template>
  <div
    class="vue-file-drag-and-drop"
    @drop.prevent="onFileDrop"
    @dragover.prevent
    draggable="true"
  >
    <input
      type="file"
      ref="fileUploadInput"
      :accept="allowedMimeTypes.join(', ')"
      :multiple="allowMultiple"
      @change="onFileInputChanged"
      hidden
    />
    <div class="gallery" v-if="hasFiles">
      <div class="clear-all">
        <button type="button" @click="resetFiles">
          <slot name="clear-all">
            <span class="sr-only">Close</span>
            <trash-icon class="trash-icon" />
          </slot>
        </button>
      </div>

      <ul role="list" class="list">
        <li
          v-for="(image, index) in previewImages"
          :key="index"
          class="list-item"
        >
          <slot name="file-preview">
            <file-preview
              :file="image"
              @on-delete-click="deleteFileByIndex(index)"
            />
          </slot>
        </li>
        <li
          v-if="isFileAppendPossible"
          @click="showFileUploadDialog"
          class="list-item add-button"
        >
          <slot name="add-file">
            <plus-circle-icon class="plus-circle-icon" />
          </slot>
        </li>
      </ul>
    </div>
    <div v-else class="gallery-placeholder" @click="showFileUploadDialog">
      <slot name="gallery-placeholder-header" />
      <slot name="gallery-placeholder-body">
        <button type="button" class="folder-open-button">
          <FolderOpenIcon class="folder-open-icon" />
        </button>
      </slot>
      <slot name="gallery-placeholder-footer" />
    </div>
  </div>
</template>

<script>
import FolderOpenIcon from "./icons/FolderOpenIcon";
import PlusCircleIcon from "./icons/PlusCircleIcon";
import TrashIcon from "./icons/TrashIcon";
import FilePreview from "./FilePreview";

export default {
  name: "VueFileDragAndDrop",
  components: { FilePreview, TrashIcon, PlusCircleIcon, FolderOpenIcon },
  props: {
    maxFilesAllowed: {
      type: Number,
      default: null,
    },
    allowedMimeTypes: {
      type: Array,
      default: () => ["*"],
    },
    allowMultiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
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
      return this.files.length < this.maxFilesAllowed;
    },
    previewImages() {
      return this.files.map((file) => {
        if (file.type.startsWith("image")) {
          return {
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
          };
        }
        return {
          name: file.name,
          size: null,
          url: null,
        };
      });
    },
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
    onFileInputChanged(event) {
      // only target files?
      for (let file of event.target.files) {
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
      this.files.push(file);
      this.$emit("file-append", file);
      this.emitFileIsChanged();
    },
    setFiles(files) {
      this.files = files;
      this.emitFileIsChanged();
    },
    emitFileIsChanged() {
      this.$emit("input", this.files);
    },
  },
};
</script>

<style scoped>
.vue-file-drag-and-drop {
  @apply relative block w-full border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-gray-400 focus:outline-none;
}
.vue-file-drag-and-drop .gallery .clear-all {
  @apply absolute top-0 right-0 pt-1 pr-1;
}
.vue-file-drag-and-drop .gallery .list {
  @apply flex flex-1 flex-wrap p-5;
}
.vue-file-drag-and-drop .gallery .list .list-item {
  @apply block p-1 w-full h-32 sm:w-1/3 md:w-1/4 lg:w-1/6;
}
.vue-file-drag-and-drop .gallery .list .list-item.add-button {
  @apply h-32;
}
.vue-file-drag-and-drop .folder-open-button {
  @apply p-12 w-full;
}
.vue-file-drag-and-drop .folder-open-icon {
  @apply mx-auto h-12 w-12 text-gray-400;
}
.vue-file-drag-and-drop .trash-icon {
  @apply h-6 w-6 rounded-md text-gray-400 hover:text-white hover:text-red-500 focus:outline-none;
}
.vue-file-drag-and-drop .plus-circle-icon {
  @apply h-32 w-8 ml-5 items-center text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer;
}
</style>
