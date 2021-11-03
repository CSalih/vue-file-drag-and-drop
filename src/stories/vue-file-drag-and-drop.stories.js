import "../assets/css/tailwind.css";
import VueFileDragAndDrop from "../components/VueFileDragAndDrop";

export default {
  title: "VueFileDragAndDrop",
  component: VueFileDragAndDrop,
  argTypes: {
    maxFilesAllowed: {},
    allowedMimeTypes: {
      control: { type: "select" },
      // TODO: this can be a list of all mime types but for testing we can use a select field
      options: ["video/*", "image/*", "*"],
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { VueFileDragAndDrop },
  props: Object.keys(argTypes),
  template:
    '<vue-file-drag-and-drop v-bind="$props" @file-appended="file-append" />',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  allowMultiple: true,
  maxFilesAllowed: 10,
  allowedMimeTypes: ["*"],
};
