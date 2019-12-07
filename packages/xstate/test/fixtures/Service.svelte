<script>
	import { machine } from '../../src'

	export let stateMachine = undefined
	export let options = undefined
	export const state = machine(stateMachine, options)
</script>

{$state}
