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
        @mousemove.self="hoverCard()"
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
        <CardList
          :cardList="fields.state.hand"
          :cardInfoList="fields.state.handInfoList"
          :cardSize="fields.state.cardSize"
          :hideKeyList="[fields.state.hoveredCardKey]"
          @hover="hoverCard"
        />
        <CardList
          v-if="fields.state.hoveredCardKey"
          :cardList="[fields.state.cards[fields.state.hoveredCardKey]]"
          :cardInfoList="[fields.state.cardInfos[fields.state.hoveredCardKey]]"
          :cardSize="fields.state.cardSize"
          @click="discard([fields.state.hoveredCardKey])"
        />
      </svg>
    </div>
    <div style="margin: 1rem;">
      <button style="padding: 1rem;" @click="draw(1)">Draw</button>
      <button
        style="margin: 0 1rem; padding: 1rem;"
        @click="draw(10 - fields.state.handKeys.length)"
      >
        Draw 10
      </button>
      <button style="padding: 1rem;" @click="discard(fields.state.handKeys)">
        Discard All
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
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
      cards: [...Array(15)]
        .map((_, i) => createCard(i + 1))
        .reduce((p, c) => ({ ...p, [c.key]: c }), {}) as {
        [key: string]: Card
      },
      fieldSize: { width: 2600, height: 900 },
      cardSize: { width: 220, height: 220 * (20 / 13) }
    })

    const state = reactive({})

    const hoverCard = (key = '') => {
      if (fields.state.hoveredCardKey === key) return
      fields.state.hoveredCardKey = key

      const nextInfos = fields.getHandInfos()
      fields.state.handKeys.forEach(k => {
        if (k === key) {
          cardTweens.overrideTween(
            k,
            new TWEEN.Tween(fields.state.cardInfos[k]).to(nextInfos[k], 100)
          )
        } else {
          cardTweens.addTween(
            k,
            new TWEEN.Tween(fields.state.cardInfos[k]).to(nextInfos[k], 100)
          )
        }
      })
    }

    const talonToDeck = () => {
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

    const tweenHand = () => {
      const nextInfos = fields.getCardInfos()
      fields.state.handKeys.forEach(key => {
        cardTweens.addTween(
          key,
          new TWEEN.Tween(fields.state.cardInfos[key]).to(nextInfos[key], 400)
        )
      })
    }

    const draw = (count = 1) => {
      if (count <= 0) return
      if (fields.state.handKeys.length >= fields.state.handMax) return

      const currentKeys = fields.state.handKeys.concat()
      const newKeys: string[] = []
      ;[...Array(count)].map(() => {
        if (fields.state.deckKeys.length === 0) {
          talonToDeck()
        }

        const key = fields.state.deckKeys.shift()
        if (key) {
          fields.state.handKeys = [...fields.state.handKeys, key]
          newKeys.push(key)
        }
      })

      const nextInfos = fields.getCardInfos()
      currentKeys.forEach(key => {
        cardTweens.addTween(
          key,
          new TWEEN.Tween(fields.state.cardInfos[key]).to(nextInfos[key], 400)
        )
      })
      newKeys.forEach((key, i) => {
        cardTweens.addTween(
          key,
          new TWEEN.Tween(fields.state.cardInfos[key])
            .delay(20 * Math.pow(i, 1.2))
            .to(
              {
                ...nextInfos[key],
                x: nextInfos[key].x + fields.state.cardSize.width * 0.3
              },
              400
            )
            .chain(
              new TWEEN.Tween(fields.state.cardInfos[key]).to(
                nextInfos[key],
                100
              )
            )
        )
      })
    }

    const discard = (keys: string[]) => {
      fields.state.hoveredCardKey = ''

      fields.state.handKeys = fields.state.handKeys.filter(
        k => !keys.includes(k)
      )
      fields.state.talonKeys = [...fields.state.talonKeys, ...keys]
      const nextInfos = fields.getCardInfos()

      fields.state.handKeys.forEach(k => {
        cardTweens.overrideTween(
          k,
          new TWEEN.Tween(fields.state.cardInfos[k]).to(nextInfos[k], 300)
        )
      })
      fields.state.talonKeys
        .concat()
        .reverse()
        .forEach((k, i) => {
          cardTweens.overrideTween(
            k,
            new TWEEN.Tween(fields.state.cardInfos[k])
              .delay(20 * Math.pow(i, 1.2))
              .to(nextInfos[k], 300)
          )
        })
    }

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
