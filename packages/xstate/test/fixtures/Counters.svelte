<script>
	import { interpret } from 'xstate'

	import Counter from './Counter'
	import { counterMachine } from './counterMachine'

	export let counterService = interpret(counterMachine).start()
</script>

<Counter counterRef={counterService} />
<Counter counterRef={counterService} />

<button on:click={_ => counterService.send('INC')}>Increment</button>
