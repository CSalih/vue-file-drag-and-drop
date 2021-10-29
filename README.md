# Vue File drag and drop

![Screenshot](https://raw.githubusercontent.com/CSalih/vue-file-drag-and-drop/main/public/screenshot.png)  
Vue component that provides a convenient use of the HTML drag and drop interface.

> Note: This component is may not ready for use in productive systems, use it carefully.

## Usage

### Install package

#### Npm

```bash
npm install @csalih/vue-file-drag-and-drop --registry=https://npm.pkg.github.com
```

#### Yarn

```bash
yarn add @csalih/vue-file-drag-and-drop --registry=https://npm.pkg.github.com
```

### Use the Component

```vue
<template>
  <vue-file-drag-and-drop />
</template>

<script>
import "@csalih/vue-file-drag-and-drop/dist/app.css";
import VueFileDragAndDrop from "@csalih/vue-file-drag-and-drop";

export default {
  name: "HelloWorld",
  components: {
    VueFileDragAndDrop,
  },
};
</script>
```

## Documentation

Need a documentation? Please create an issue.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
