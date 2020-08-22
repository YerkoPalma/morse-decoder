import Hammer from 'hammerjs'

/**
 *
 * @param {EventTarget} node The target node
 */
export function morse (node) {
  const SPACE_TRESHOLD = 600
  let dotOrDash
  const manager = new Hammer.Manager(node)
  manager.add(new Hammer.Tap({
    event: 'dot', time: 120
  }))
  manager.add(new Hammer.Press({
    event: 'dash', time: 121
  }))

  manager.on('dot', event => {
    clearTimeout(dotOrDash)
    node.dispatchEvent(new CustomEvent('dot'))
    dotOrDash = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('space'))
    }, SPACE_TRESHOLD)
  })
  manager.on('dash', event => {
    clearTimeout(dotOrDash)
    node.dispatchEvent(new CustomEvent('dash'))
    dotOrDash = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('space'))
    }, SPACE_TRESHOLD)
  })
}
