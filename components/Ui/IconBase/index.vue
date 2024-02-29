<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    :aria-labelledby="name"
    role="presentation"
  >
    <title :id="name" lang="en">{{ name }} icon</title>
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: "box",
      },
      width: {
        type: [Number, String],
        default: 16,
      },
      height: {
        type: [Number, String],
        default: 16,
      },
      color: {
        type: String,
        default: "currentColor",
      },
    },
  };
</script>

<style scoped>
  svg {
    display: inline-block;
    vertical-align: baseline;
  }

  svg path {
    fill: currentColor;
  }
</style>
