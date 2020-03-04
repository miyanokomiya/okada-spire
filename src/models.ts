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

export function createCard(i: number) {
  return {
    key: `${i}`,
    name: `card_${i}`
  }
}
