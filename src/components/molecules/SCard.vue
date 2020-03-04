<template>
  <rect
    :x="Math.round(x)"
    :y="Math.round(y)"
    :width="width"
    :height="height"
    :transform="state.transform"
    stroke="black"
    stroke-width="2"
    fill="white"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from 'vue'
import { Position, Card } from '@/models'

function scale(rate: number, cx: number, cy: number): string {
  return [
    `translate(${cx}, ${cy})`,
    `scale(${rate})`,
    `translate(${-cx}, ${-cy})`
  ].join(' ')
}

export default defineComponent({
  props: {
    card: { type: Object as PropType<Card>, required: true },
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
          )}, ${Math.round(props.y + props.height / 2)})`
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
