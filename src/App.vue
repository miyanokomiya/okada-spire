<template>
  <div id="app">
    <div style="border: 1px solid black; display: flex;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        font-family="sans-serif"
        :viewBox="
          `0 0 ${fields.state.fieldSize.width} ${fields.state.fieldSize.height}`
        "
        style="width: 100%; height: auto;"
        @mousemove.self="hoverCard('')"
      >
        <CardList
          :cardList="fields.state.deck"
          :cardInfoList="fields.state.deckInfoList"
          :cardSize="fields.state.cardSize"
        />
        <CardList
          :cardList="fields.state.talon"
          :cardInfoList="fields.state.talonInfoList"
          :cardSize="fields.state.cardSize"
        />
        <g>
          <SCard
            :x="10"
            :y="
              fields.state.fieldSize.height - fields.state.cardSize.height - 10
            "
            :width="fields.state.cardSize.width"
            :height="fields.state.cardSize.height"
            :scale="0.5"
          >
            <text
              fill="black"
              font-size="140"
              :x="fields.state.cardSize.width / 2"
              :y="fields.state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ fields.state.deckKeys.length }}
            </text>
          </SCard>
        </g>
        <g>
          <SCard
            :x="fields.state.fieldSize.width - fields.state.cardSize.width - 10"
            :y="
              fields.state.fieldSize.height - fields.state.cardSize.height - 10
            "
            :width="fields.state.cardSize.width"
            :height="fields.state.cardSize.height"
            :scale="0.5"
          >
            <text
              fill="black"
              font-size="140"
              :x="fields.state.cardSize.width / 2"
              :y="fields.state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ fields.state.talonKeys.length }}
            </text>
          </SCard>
        </g>
        <g
          class="card"
          v-for="key in fields.state.handKeys"
          :key="key"
          :class="{ hovered: !!state.hoveredHandInfos[key] }"
          @mousemove="hoverCard(key)"
        >
          <SCard
            :x="fields.state.cardInfos[key].x"
            :y="fields.state.cardInfos[key].y"
            :width="fields.state.cardSize.width"
            :height="fields.state.cardSize.height"
            :rotate="fields.state.cardInfos[key].rotate"
            :scale="fields.state.cardInfos[key].scale"
          >
            <text
              fill="black"
              font-size="140"
              :x="fields.state.cardSize.width / 2"
              :y="fields.state.cardSize.height / 2"
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
            :width="fields.state.cardSize.width"
            :height="fields.state.cardSize.height"
            :rotate="state.hoveredHandInfos[card.key].rotate"
            :scale="state.hoveredHandInfos[card.key].scale"
          >
            <text
              fill="black"
              font-size="140"
              :x="fields.state.cardSize.width / 2"
              :y="fields.state.cardSize.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ card.key }}
            </text>
          </SCard>
        </g>
      </svg>
    </div>
    <button style="padding: 1rem;" @click="draw">Draw</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch } from 'vue'
import { Position, Card, createCard } from '@/models'
import { useFields } from '@/hooks/field'
import { useCardTweens } from '@/hooks/cardTweens.ts'
import CardList from '@/components/organisms/CardList.vue'
import SCard from '@/components/molecules/SCard.vue'
import TWEEN from '@tweenjs/tween.js'

function animate() {
  requestAnimationFrame(animate)
  TWEEN.update()
}
requestAnimationFrame(animate)

type HandInfo = Position & { rotate: number; scale: number }

export default defineComponent({
  name: 'App',
  components: {
    CardList,
    SCard
  },
  setup() {
    const cardTweens = useCardTweens()
    const fields = useFields({
      cards: [...Array(6)]
        .map((_, i) => createCard(i + 1))
        .reduce((p, c) => ({ ...p, [c.key]: c }), {}) as {
        [key: string]: Card
      },
      fieldSize: { width: 2600, height: 900 },
      cardSize: { width: 260, height: 400 }
    })

    const state = reactive({
      hoveredCardKey: '',
      hoveredHandInfos: {} as { [key: string]: HandInfo },
      calcedHoveredHand: computed((): Card[] =>
        fields.state.hand.filter(
          (card: Card) => state.hoveredHandInfos[card.key]
        )
      )
    })

    fields.state.cardInfos = fields.getCardInfos()

    const hoverCard = (key: string) => {
      if (!key) {
        state.hoveredCardKey = ''
        return
      } else if (!fields.state.handKeys.includes(key)) {
        return
      } else {
        state.hoveredCardKey = key
      }
    }

    const draw = () => {
      if (fields.state.handKeys.length >= fields.state.handMax) return

      if (fields.state.deckKeys.length === 0) {
        fields.state.deckKeys = fields.state.talonKeys
        fields.state.talonKeys = []

        const nextInfos = fields.getCardInfos()
        fields.state.deckKeys.forEach((k, i) => {
          cardTweens.overrideTween(
            k,
            new TWEEN.Tween(fields.state.cardInfos[k])
              .to(
                {
                  ...nextInfos[k],
                  x: nextInfos[k].x + fields.state.fieldSize.width / 2,
                  y:
                    nextInfos[k].y +
                    (fields.state.cardSize.height / 2) * (Math.random() - 0.5)
                },
                200 + 50 * i
              )
              .chain(
                new TWEEN.Tween(fields.state.cardInfos[k]).to(
                  nextInfos[k],
                  200 + 50 * i
                )
              )
          )
        })
      }

      const key = fields.state.deckKeys.shift()
      if (key) {
        fields.state.handKeys = [...fields.state.handKeys, key]
      }
    }

    const discard = (key: string) => {
      fields.state.cardInfos[key] = { ...state.hoveredHandInfos[key] }
      state.hoveredCardKey = ''
      delete state.hoveredHandInfos[key]

      fields.state.handKeys = fields.state.handKeys.filter(k => k !== key)
      fields.state.talonKeys = [...fields.state.talonKeys, key]
      const nextInfos = fields.getCardInfos()

      Object.keys(nextInfos).forEach(k => {
        cardTweens.overrideTween(
          k,
          new TWEEN.Tween(fields.state.cardInfos[k]).to(nextInfos[k], 300)
        )
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
                x: fields.state.cardInfos[from].x,
                y: fields.state.cardInfos[from].y,
                rotate: fields.state.cardInfos[from].rotate,
                scale: 1
              },
              100
            )
            .onComplete(() => delete state.hoveredHandInfos[from])
            .start()
        }

        if (to) {
          state.hoveredHandInfos[to] = { ...fields.state.cardInfos[to] }
          new TWEEN.Tween(state.hoveredHandInfos[to])
            .to(
              {
                x: fields.state.cardInfos[to].x,
                y: fields.state.cardInfos[to].y - 140,
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
      () => fields.state.handKeys,
      (to: string[]) => {
        const nextInfos = fields.getCardInfos()
        to.forEach(key => {
          cardTweens.addTween(
            key,
            new TWEEN.Tween(fields.state.cardInfos[key]).to(nextInfos[key], 400)
          )
        })
      }
    )

    return { fields, state, hoverCard, draw, discard }
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
