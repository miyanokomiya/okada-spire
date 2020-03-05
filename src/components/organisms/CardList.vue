<template>
  <g>
    <SCard
      v-for="(card, i) in cardList"
      :key="card.key"
      :x="cardInfoList[i].x"
      :y="cardInfoList[i].y"
      :width="cardSize.width"
      :height="cardSize.height"
      :rotate="cardInfoList[i].rotate"
      :scale="cardInfoList[i].scale"
    >
      <text
        fill="black"
        font-size="140"
        :x="cardSize.width / 2"
        :y="cardSize.height / 2"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {{ card.key }}
      </text>
    </SCard>
  </g>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { Card, CardInfo, Size } from '@/models'
import SCard from '@/components/molecules/SCard.vue'

export default defineComponent({
  components: { SCard },
  props: {
    cardList: { type: Array as PropType<Card[]>, required: true },
    cardInfoList: { type: Array as PropType<CardInfo[]>, required: true },
    cardSize: { type: Object as PropType<Size>, required: true }
  }
})
</script>
