import { reactive, computed } from 'vue'
import { Position, Size, Card, Cards, CardInfo, CardInfos } from '@/models'

export function diffFromCenter(index: number, size: number) {
  return (size - 1) / 2 - index
}

export function getPositionInHand(args: {
  index: number
  handCount: number
  cardSize: Size
  fieldSize: Size
}): Position {
  const diff = diffFromCenter(args.index, args.handCount)
  return {
    x:
      -args.cardSize.width / 2 +
      args.fieldSize.width / 2 -
      args.cardSize.width * 0.9 * diff,
    y:
      args.fieldSize.height -
      args.cardSize.height * 1.5 +
      args.cardSize.height * 0.04 * Math.pow(Math.abs(diff), 1.9)
  }
}

export function getRotationInHand(args: {
  index: number
  handCount: number
}): number {
  return -5 * diffFromCenter(args.index, args.handCount)
}

export function getDeckInfos(args: {
  deckKeys: string[]
  cardSize: Size
  fieldSize: Size
}): CardInfos {
  return args.deckKeys.reduce<CardInfos>((p, key) => {
    return {
      ...p,
      [key]: {
        x: 10,
        y: args.fieldSize.height - args.cardSize.height - 10,
        rotate: 0,
        scale: 0.5
      }
    }
  }, {})
}

export function getHandInfos(args: {
  handKeys: string[]
  cardSize: Size
  fieldSize: Size
}): CardInfos {
  return args.handKeys.reduce<CardInfos>((p, key, index) => {
    return {
      ...p,
      [key]: {
        ...getPositionInHand({
          index,
          handCount: args.handKeys.length,
          cardSize: args.cardSize,
          fieldSize: args.fieldSize
        }),
        rotate: getRotationInHand({
          index,
          handCount: args.handKeys.length
        }),
        scale: 1
      }
    }
  }, {})
}

export function getTalonInfos(args: {
  talonKeys: string[]
  cardSize: Size
  fieldSize: Size
}): CardInfos {
  return args.talonKeys.reduce<CardInfos>((p, key) => {
    return {
      ...p,
      [key]: {
        x: args.fieldSize.width - args.cardSize.width - 10,
        y: args.fieldSize.height - args.cardSize.height - 10,
        rotate: 0,
        scale: 0.5
      }
    }
  }, {})
}

export function getCardInfos(args: {
  deckKeys: string[]
  handKeys: string[]
  talonKeys: string[]
  cardSize: Size
  fieldSize: Size
}): CardInfos {
  return {
    ...getDeckInfos(args),
    ...getHandInfos(args),
    ...getTalonInfos(args)
  }
}

export function useFields(args: {
  cards: Cards
  cardSize: Size
  fieldSize: Size
}) {
  const state = reactive({
    cards: args.cards,
    deckKeys: Object.keys(args.cards),
    handKeys: [] as string[],
    talonKeys: [] as string[],
    cardInfos: {} as CardInfos,
    deck: computed((): Card[] => state.deckKeys.map(key => state.cards[key])),
    hand: computed((): Card[] => state.handKeys.map(key => state.cards[key])),
    talon: computed((): Card[] => state.talonKeys.map(key => state.cards[key])),
    deckInfoList: computed((): CardInfo[] =>
      state.deckKeys.map(key => state.cardInfos[key])
    ),
    handInfoList: computed((): CardInfo[] =>
      state.handKeys.map(key => state.cardInfos[key])
    ),
    talonInfoList: computed((): CardInfo[] =>
      state.talonKeys.map(key => state.cardInfos[key])
    ),
    fieldSize: computed(() => args.fieldSize),
    cardSize: computed(() => args.cardSize),
    handMax: computed(() => 10)
  })

  state.cardInfos = getCardInfos(state)

  return {
    state,
    getDeckInfos: () => getDeckInfos(state),
    getHandInfos: () => getHandInfos(state),
    getTalonInfos: () => getTalonInfos(state),
    getCardInfos: () => getCardInfos(state)
  }
}
