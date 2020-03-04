<template>
  <div id="app">
    <div style="border: 1px solid black; display: flex;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        font-family="sans-serif"
        :viewBox="`0 0 ${state.fieldSize.width} ${state.fieldSize.height}`"
        style="width: 100%; height: auto;"
        @mousemove.self="hoverCard('')"
      >
        <g
          class="card"
          v-for="(card, i) in state.calcedHand"
          :key="card.key"
          :class="{ hovered: !!state.hoveredHandInfos[card.key] }"
          @mousemove="hoverCard(i)"
        >
          <SCard
            :x="state.handInfos[card.key].x"
            :y="state.handInfos[card.key].y"
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :rotate="state.handInfos[card.key].rotate"
            :scale="state.handInfos[card.key].scale"
            :card="card"
          />
        </g>
        <g
          class="hovered-card"
          v-for="card in state.calcedHoveredHand"
          :key="card.key"
          :class="{ show: card.key === state.hoveredCardKey }"
          @click="discard(card.key)"
        >
          <SCard
            :x="state.hoveredHandInfos[card.key].x"
            :y="state.hoveredHandInfos[card.key].y"
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :rotate="state.hoveredHandInfos[card.key].rotate"
            :scale="state.hoveredHandInfos[card.key].scale"
            :card="card"
          />
        </g>
      </svg>
    </div>
    <button @click="draw">Draw</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, watchEffect } from 'vue'
import { Position, Card, createCard } from '@/models'
import { getPositionInHand, getRotationInHand } from '@/hooks/field'
import SCard from '@/components/molecules/SCard.vue'

const TWEEN = require('@tweenjs/tween.js').default
function animate() {
  requestAnimationFrame(animate)
  TWEEN.update()
}
requestAnimationFrame(animate)

type HandInfo = { [key: string]: Position & { rotate: number; scale: number } }

export default defineComponent({
  name: 'App',
  components: {
    SCard
  },
  setup() {
    const state = reactive({
      deck: [] as Card[],
      hand: [...[...Array(0)].map((_, i) => createCard(i))] as Card[],
      talon: [] as Card[],
      hoveredCardKey: '',
      fieldSize: computed(() => ({ width: 2600, height: 900 })),
      cardSize: computed(() => ({ width: 260, height: 400 })),
      handMax: computed(() => 10),
      handInfos: {} as { [key: string]: HandInfo },
      hoveredHandInfos: {} as { [key: string]: HandInfo },
      tweens: [] as any[],
      calcedHand: computed((): Card[] =>
        state.hand.filter((card: Card) => state.handInfos[card.key])
      ),
      calcedHoveredHand: computed((): Card[] =>
        state.hand.filter((card: Card) => state.hoveredHandInfos[card.key])
      )
    })

    const hoverCard = (key: string) => {
      state.hoveredCardKey = key
    }

    const draw = () => {
      state.hand = state.hand.concat(createCard(state.hand.length))
    }

    const discard = (key: string) => {
      // state.hoveredCardKey = ''
      // state.handInfos[key] = state.hoveredHandInfos[key]
      // delete state.hoveredHandInfos[key]
      // new TWEEN.Tween(state.handInfos[key])
      //   .to(
      //     {
      //       x: state.fieldSize.width + state.cardSize.width,
      //       y: state.fieldSize.height * 0.7,
      //       rotate: 1,
      //       scale: 1
      //     },
      //     300
      //   )
      //   .onComplete(() => delete state.handInfos[key])
      //   .start()
      // state.hand = state.hand.filter(card => card.key !== key)
    }

    const calcHandInfos = () => {
      state.handInfos = state.hand.reduce<{ [key: string]: HandInfo }>(
        (map, card, index) => {
          map[card.key] = {
            ...getPositionInHand({
              index,
              handCount: state.hand.length,
              cardSize: state.cardSize,
              fieldSize: state.fieldSize
            }),
            rotate: getRotationInHand({
              index,
              handCount: state.hand.length
            }),
            scale: 1
          }
          return map
        },
        {}
      )
    }

    // watchEffect(() => {
    //   calcHandInfos()
    // })
    calcHandInfos()

    const clearTweens = () => {
      state.tweens.forEach(t => t.stop())
      state.tweens = []
    }

    watch(
      () => state.hoveredCardKey,
      (to: string, from: string) => {
        if (to === from) return

        if (from && state.handInfos[from]) {
          new TWEEN.Tween(state.hoveredHandInfos[from])
            .to(
              {
                x: state.handInfos[from].x,
                y: state.handInfos[from].y,
                rotate: state.handInfos[from].rotate,
                scale: 1
              },
              100
            )
            .onComplete(() => delete state.hoveredHandInfos[from])
            .start()
        }

        if (to && state.handInfos[to]) {
          state.hoveredHandInfos[to] = { ...state.handInfos[to] }
          new TWEEN.Tween(state.hoveredHandInfos[to])
            .to(
              {
                x: state.handInfos[to].x,
                y: state.handInfos[to].y - 140,
                rotate: 0,
                scale: 1.4
              },
              100
            )
            .start()
        }
      }
    )

    watch(
      () => state.hand,
      (to: Card[]) => {
        clearTweens()
        to.forEach((card, index) => {
          const nextInfo = {
            ...getPositionInHand({
              index,
              handCount: state.hand.length,
              cardSize: state.cardSize,
              fieldSize: state.fieldSize
            }),
            rotate: getRotationInHand({
              index,
              handCount: state.hand.length
            }),
            scale: 1
          }

          if (!state.handInfos[card.key]) {
            state.handInfos[card.key] = {
              x: 0,
              y: state.fieldSize.height * 0.7,
              rotate: 0,
              scale: 1.5
            }
            state.tweens.push(
              new TWEEN.Tween(state.handInfos[card.key])
                .to(
                  {
                    ...nextInfo,
                    x: nextInfo.x + 80,
                    y: nextInfo.y + 10,
                    scale: 1.1
                  },
                  400
                )
                .chain(
                  new TWEEN.Tween(state.handInfos[card.key]).to(nextInfo, 200)
                )
                .start()
            )
          } else {
            state.tweens.push(
              new TWEEN.Tween(state.handInfos[card.key])
                .to(nextInfo, 400)
                .start()
            )
          }
        })
      }
    )

    return { state, hoverCard, draw, discard }
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
// .hovered-card {
//   visibility: hidden;
//   // transition: transform 0.2s;

//   &.show {
//     visibility: visible;
//     // transform: translateY(-80px) scale(1.2, 1.2);
//     // transform-origin: 50% 50%;
//   }
// }
</style>
