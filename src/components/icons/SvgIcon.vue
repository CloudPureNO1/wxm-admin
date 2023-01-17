<template>
    <!-- <svg aria-hidden="true" :opacity="opacity" :class="['svg-icon', $attrs.class]" :style="getStyle"> -->
    <svg aria-hidden="true" :opacity="opacity" :class="['svg-icon', $attrs.class]">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
//import type { CSSProperties } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 1
  },
  color: {
    type: String,
    default: ''
  },
  opacity: {
    type: [Number, String],
    default: 1
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

/* const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '').replace('rem','')}rem`
  return {
    width: s,
    height: s,
    color: props.color
  }
}) */
</script>

<style scoped lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
    // 由于user agent stylesheet的优先级很低，自己写样式覆盖即可。在你的css中添加被user agent stylesheet所覆盖了的样式，如下图，这是我刚开始调试发现的user agent stylesheet
    &:focus {
       outline: -webkit-focus-ring-color auto 0px;
    }
  }
  </style>