<script>
	import { interpret } from 'xstate'

	import CounterChild from './CounterChild'
	import { counterMachine } from './counterMachine'

	let counterService1 = interpret(counterMachine).start()
	let counterService2 = interpret(counterMachine).start()

	let service = counterService1
</script>

<button
	data-testid="change-service"
	on:click={() => (service = counterService2)} />
<CounterChild counterRef={service} />
