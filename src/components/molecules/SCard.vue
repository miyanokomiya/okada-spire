<template>
  <rect
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :transform="state.transform"
    stroke="black"
    fill="white"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from 'vue'

type Card = {
  key: string
  name: string
}

export default defineComponent({
  props: {
    card: { type: Object as PropType<Card>, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    rotate: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  setup(props) {
    const state = reactive({
      transform: computed(
        () =>
          `rotate(${props.rotate}, ${props.x + props.width / 2}, ${props.y +
            props.height / 2})`
      )
    })
    return { state }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
