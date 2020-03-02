<template>
  <div id="app">
    <div style="border: 1px solid black; display: flex;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        font-family="sans-serif"
        :viewBox="`0 0 ${state.fieldSize.width} ${state.fieldSize.height}`"
        style="width: 100%; height: auto;"
        @mousemove.self="hoverCard(-1)"
      >
        <g
          class="card"
          v-for="(card, i) in state.hand"
          :key="card.key"
          :class="{ hovered: i === state.hoveredCardIndex }"
          @mousemove="hoverCard(i)"
        >
          <SCard
            :x="
              -state.cardSize.width / 2 +
                state.fieldSize.width / 2 -
                state.cardSize.width * 0.9 * diffFromCenter(i)
            "
            :y="
              state.fieldSize.height -
                state.cardSize.height * 1.5 +
                state.cardSize.height *
                  0.04 *
                  Math.pow(Math.abs(diffFromCenter(i)), 1.9)
            "
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :rotate="-5 * diffFromCenter(i)"
            :card="card"
          />
        </g>
        <g
          class="hovered-card"
          v-for="(card, i) in state.hand"
          :key="card.key"
          :class="{ show: i === state.hoveredCardIndex }"
        >
          <SCard
            :x="
              -state.cardSize.width / 2 +
                state.fieldSize.width / 2 -
                state.cardSize.width * 0.9 * diffFromCenter(i)
            "
            :y="
              state.fieldSize.height -
                state.cardSize.height * 1.5 +
                state.cardSize.height *
                  0.04 *
                  Math.pow(Math.abs(diffFromCenter(i)), 1.9)
            "
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :rotate="-5 * diffFromCenter(i)"
            :card="card"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import SCard from '@/components/molecules/SCard.vue'

type Card = {
  key: string
  name: string
}

export default defineComponent({
  name: 'App',
  components: {
    SCard
  },
  setup() {
    const state = reactive({
      deck: [] as Card[],
      hand: [
        ...[...Array(7)].map((_, i) => ({ key: `${i}`, name: `card${i}` }))
      ] as Card[],
      talon: [] as Card[],
      hoveredCardIndex: -1,
      fieldSize: computed(() => ({ width: 2600, height: 900 })),
      cardSize: computed(() => ({ width: 260, height: 400 })),
      handMax: computed(() => 10)
    })

    const diffFromCenter = (index: number) => {
      return (state.hand.length - 1) / 2 - index
    }

    const hoverCard = (index: number) => (state.hoveredCardIndex = index)

    return { state, diffFromCenter, hoverCard }
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

.card {
  &.hovered {
    opacity: 0;
  }
}
.hovered-card {
  visibility: hidden;
  transition: transform 0.2s;

  &.show {
    visibility: visible;
    transform: translateY(-80px) scale(1.2, 1.2);
    transform-origin: 50% 50%;
  }
}
</style>
