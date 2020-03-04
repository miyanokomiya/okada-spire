import { Position, Size } from '@/models'

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
