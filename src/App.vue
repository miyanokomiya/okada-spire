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
        <g v-for="key in state.deckKeys" :key="key">
          <SCard
            :x="state.cardInfos[key].x"
            :y="state.cardInfos[key].y"
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :rotate="state.cardInfos[key].rotate"
            :scale="state.cardInfos[key].scale"
          >
            <text
              fill="black"
              font-size="140"
              :x="state.cardSize.width / 2"
              :y="state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ key }}
            </text>
          </SCard>
        </g>
        <g v-for="key in state.talonKeys" :key="key">
          <SCard
            :x="state.cardInfos[key].x"
            :y="state.cardInfos[key].y"
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :rotate="state.cardInfos[key].rotate"
            :scale="state.cardInfos[key].scale"
          >
            <text
              fill="black"
              font-size="140"
              :x="state.cardSize.width / 2"
              :y="state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ key }}
            </text>
          </SCard>
        </g>
        <g>
          <SCard
            :x="10"
            :y="state.fieldSize.height - state.cardSize.height - 10"
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :scale="0.5"
          >
            <text
              fill="black"
              font-size="140"
              :x="state.cardSize.width / 2"
              :y="state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ state.deckKeys.length }}
            </text>
          </SCard>
        </g>
        <g>
          <SCard
            :x="state.fieldSize.width - state.cardSize.width - 10"
            :y="state.fieldSize.height - state.cardSize.height - 10"
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :scale="0.5"
          >
            <text
              fill="black"
              font-size="140"
              :x="state.cardSize.width / 2"
              :y="state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ state.talonKeys.length }}
            </text>
          </SCard>
        </g>
        <g
          class="card"
          v-for="key in state.handKeys"
          :key="key"
          :class="{ hovered: !!state.hoveredHandInfos[key] }"
          @mousemove="hoverCard(key)"
        >
          <SCard
            :x="state.cardInfos[key].x"
            :y="state.cardInfos[key].y"
            :width="state.cardSize.width"
            :height="state.cardSize.height"
            :rotate="state.cardInfos[key].rotate"
            :scale="state.cardInfos[key].scale"
          >
            <text
              fill="black"
              font-size="140"
              :x="state.cardSize.width / 2"
              :y="state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ key }}
            </text>
          </SCard>
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
          >
            <text
              fill="black"
              font-size="140"
              :x="state.cardSize.width / 2"
              :y="state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ card.key }}
            </text>
          </SCard>
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

type HandInfo = Position & { rotate: number; scale: number }

export default defineComponent({
  name: 'App',
  components: {
    SCard
  },
  setup() {
    const state = reactive({
      cards: [...Array(6)]
        .map((_, i) => createCard(i))
        .reduce((p, c) => ({ ...p, [c.key]: c }), {}) as {
        [key: string]: Card
      },
      deckKeys: [] as string[],
      handKeys: [] as string[],
      talonKeys: [] as string[],
      deck: computed((): Card[] => state.deckKeys.map(key => state.cards[key])),
      hand: computed((): Card[] => state.handKeys.map(key => state.cards[key])),
      talon: computed((): Card[] =>
        state.talonKeys.map(key => state.cards[key])
      ),
      hoveredCardKey: '',
      fieldSize: computed(() => ({ width: 2600, height: 900 })),
      cardSize: computed(() => ({ width: 260, height: 400 })),
      handMax: computed(() => 5),
      cardInfos: {} as { [key: string]: HandInfo },
      hoveredHandInfos: {} as { [key: string]: HandInfo },
      tweens: {} as { [key: string]: any },
      calcedHoveredHand: computed((): Card[] =>
        state.hand.filter((card: Card) => state.hoveredHandInfos[card.key])
      )
    })
    state.deckKeys = Object.keys(state.cards)

    const calcCardInfos = (): typeof state.cardInfos => {
      const next: typeof state.cardInfos = {}
      state.deckKeys.forEach(key => {
        next[key] = {
          x: 10,
          y: state.fieldSize.height - state.cardSize.height - 10,
          rotate: 0,
          scale: 0.5
        }
      })
      state.handKeys.forEach((key, index) => {
        next[key] = {
          ...getPositionInHand({
            index,
            handCount: state.handKeys.length,
            cardSize: state.cardSize,
            fieldSize: state.fieldSize
          }),
          rotate: getRotationInHand({
            index,
            handCount: state.hand.length
          }),
          scale: 1
        }
      })
      state.talonKeys.forEach(key => {
        next[key] = {
          x: state.fieldSize.width - state.cardSize.width - 10,
          y: state.fieldSize.height - state.cardSize.height - 10,
          rotate: 0,
          scale: 0.5
        }
      })
      return next
    }
    state.cardInfos = calcCardInfos()

    const hoverCard = (key: string) => {
      if (!key) {
        state.hoveredCardKey = ''
        return
      } else if (!state.handKeys.includes(key)) {
        return
      } else {
        state.hoveredCardKey = key
      }
    }

    const clearTweens = (keys: string[]) => {
      keys.forEach(k => {
        if (!state.tweens[k]) return

        state.tweens[k].stop()
        delete state.tweens[k]
      })
    }

    const draw = () => {
      if (state.handKeys.length >= state.handMax) return

      if (state.deckKeys.length === 0) {
        state.deckKeys = state.talonKeys
        state.talonKeys = []
        state.cardInfos = calcCardInfos()
        clearTweens(state.deckKeys)
      }

      const key = state.deckKeys.shift()
      if (key) {
        state.handKeys = [...state.handKeys, key]
      }
    }

    const discard = (key: string) => {
      clearTweens(state.handKeys)

      state.cardInfos[key] = { ...state.hoveredHandInfos[key] }
      state.hoveredCardKey = ''
      delete state.hoveredHandInfos[key]

      state.handKeys = state.handKeys.filter(k => k !== key)
      state.talonKeys = [...state.talonKeys, key]
      const nextInfos = calcCardInfos()

      clearTweens(state.handKeys)
      Object.keys(nextInfos).forEach(k => {
        state.tweens[k] = new TWEEN.Tween(state.cardInfos[k])
          .to(nextInfos[k], 300)
          .start()
      })
    }

    watch(
      () => state.hoveredCardKey,
      (to: string, from: string) => {
        if (to === from) return

        if (from && state.hoveredHandInfos[from]) {
          new TWEEN.Tween(state.hoveredHandInfos[from])
            .to(
              {
                x: state.cardInfos[from].x,
                y: state.cardInfos[from].y,
                rotate: state.cardInfos[from].rotate,
                scale: 1
              },
              100
            )
            .onComplete(() => delete state.hoveredHandInfos[from])
            .start()
        }

        if (to) {
          state.hoveredHandInfos[to] = { ...state.cardInfos[to] }
          new TWEEN.Tween(state.hoveredHandInfos[to])
            .to(
              {
                x: state.cardInfos[to].x,
                y: state.cardInfos[to].y - 140,
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
      () => state.handKeys,
      (to: string[]) => {
        clearTweens(to)
        const nextInfos = calcCardInfos()
        to.forEach(key => {
          state.tweens[key] = new TWEEN.Tween(state.cardInfos[key])
            .to(nextInfos[key], 400)
            .start()
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
</style>
