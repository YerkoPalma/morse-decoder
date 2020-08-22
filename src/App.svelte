<script>
  import { morse } from './gestures'
  import { decode } from '@yerkopalma/morsee'
  const queue = []
  let text = ''
  let debug = ''

  function addDot () {
    queue.push('.')
    debug += 'Dot (.) added\n'
  }
  function addDash () {
    queue.push('-')
    debug += 'Dash (-) added\n'
  }
  function addSpace () {
    if (queue.join('')) {
      const morseWord = decode(queue.join(''))
      debug += `Word ${queue.join('')} (${morseWord}) added\n`
      text += morseWord + ' '
      queue.length = 0
    }
  }
  function clear () {
    text = ''
    debug = ''
  }
</script>

<main
  use:morse
  on:dot={addDot}
  on:dash={addDash}
  on:space={addSpace}
>
  {text}
  <button on:click|preventDefault|stopPropagation|capture ={clear}>Clear</button>
  <pre>{debug}</pre>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  pre {
    text-align: left;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>