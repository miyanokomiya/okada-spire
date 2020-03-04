<template>
  <g :transform="state.transform">
    <rect
      :width="width"
      :height="height"
      stroke="black"
      stroke-width="2"
      fill="white"
    />
    <slot />
  </g>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { Position } from '@/models'

function scale(rate: number, cx: number, cy: number): string {
  return [
    `translate(${cx}, ${cy})`,
    `scale(${rate})`,
    `translate(${-cx}, ${-cy})`
  ].join(' ')
}

export default defineComponent({
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    rotate: { type: Number, default: 0 },
    scale: { type: Number, default: 1 },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  setup(props) {
    const state = reactive({
      center: computed(
        (): Position => ({
          x: props.x + props.width / 2,
          y: props.y + props.height / 2
        })
      ),
      transform: computed(
        (): string =>
          `${scale(
            props.scale,
            state.center.x,
            state.center.y
          )} rotate(${Math.round(props.rotate)}, ${Math.round(
            props.x + props.width / 2
          )}, ${Math.round(props.y + props.height / 2)}) translate(${
            props.x
          }, ${props.y})`
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
