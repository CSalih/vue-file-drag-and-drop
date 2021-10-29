<template>
  <div class="
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
      <div class="absolute top-0 right-0 pt-1 pr-1" >
        <button type="button" @click="resetFiles">
          <slot name="clear-all">
            <span class="sr-only">Close</span>
            <trash-icon class="h-6 w-6 rounded-md text-gray-400 hover:text-white hover:text-red-500 focus:outline-none" />
          </slot>
        </button>
      </div>

      <ul role="list" class="flex flex-1 flex-wrap p-5">
        <li
          v-for="(image, index) in previewImages"
          :key="index"
          class="block p-1 w-full sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-32"
        >
          <slot name="filePreview">
            <file-preview :file="image" @on-delete-click="deleteFileByIndex(index)" />
          </slot>
        </li>
        <li
            v-if="isFileAppendPossible"
            @click="showFileUploadDialog"
            class="h-32"
        >
          <slot name="addFile">
            <plus-circle-icon class="h-32 w-8 ml-5 items-center text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer" />
          </slot>
        </li>
      </ul>
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
import FolderOpenIcon from "./icons/FolderOpenIcon";
import PlusCircleIcon from "@/components/icons/PlusCircleIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import FilePreview from "@/components/FilePreview";

export default {
  name: "VueFileDragAndDrop",
  components: {FilePreview, TrashIcon, PlusCircleIcon, FolderOpenIcon },
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
            size: file.size,
            url: URL.createObjectURL(file)
          };
        }
        return {
          name: file.name,
          size: null,
          url: null,
        };
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
