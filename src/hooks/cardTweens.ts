import { reactive, computed, watch, watchEffect } from 'vue'
import TWEEN from '@tweenjs/tween.js'

export type Tweens = { [key: string]: TWEEN.Tween }

function isChainPlaying(tween?: TWEEN.Tween): boolean {
  if (!tween) return false
  return [tween, ...tween._chainedTweens].some(t => t._isPlaying)
}

function overrideTween(tweens: Tweens, key: string, tween: TWEEN.Tween) {
  if (tweens[key]) {
    tweens[key].stop()
  }
  tweens[key] = tween.start()
}

function addTween(tweens: Tweens, key: string, tween: TWEEN.Tween) {
  if (isChainPlaying(tweens[key])) {
    if (tweens[key]._chainedTweens.length > 0) {
      tweens[key]._chainedTweens[tweens[key]._chainedTweens.length - 1].chain(
        tween
      )
    } else {
      tweens[key].chain(tween)
    }
  } else {
    tweens[key] = tween.start()
  }
}

export function useCardTweens() {
  const state = reactive({
    tweens: {} as Tweens
  })

  return {
    state,
    overrideTween: (key: string, tween: TWEEN.Tween) =>
      overrideTween(state.tweens, key, tween),
    addTween: (key: string, tween: TWEEN.Tween) =>
      addTween(state.tweens, key, tween)
  }
}
