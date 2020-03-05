export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type Card = {
  key: string
  name: string
}
export type Cards = { [key: string]: Card }

export type CardInfo = Position & { rotate: number; scale: number }
export type CardInfos = { [key: string]: CardInfo }

export function createCard(i: number) {
  return {
    key: `${i}`,
    name: `card_${i}`
  }
}
