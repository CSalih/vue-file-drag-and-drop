import { action } from "@storybook/addon-actions";

import "../assets/css/tailwind.css";
import VueFileDragAndDrop from "../components/VueFileDragAndDrop";

export default {
  title: "VueFileDragAndDrop",
  component: VueFileDragAndDrop,
  argTypes: {
    allowedMimeTypes: {
      // TODO: for testing we can use multi select
      control: { type: "multi-select" },
      description: "List of mime types",
      options: ["*", "image/*", "video/*"],
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { VueFileDragAndDrop },
  props: Object.keys(argTypes),
  methods: {
    onFileAppend: action("onFileAppend"),
    onInput: action("onInput"),
  },
  template:
    '<vue-file-drag-and-drop v-bind="$props" @file-append="onFileAppend" @input="onInput"/>',
});

export const Simple = Template.bind({});
Simple.args = {
  allowMultiple: true,
  maxFilesAllowed: 10,
  allowedMimeTypes: ["*"],
};
