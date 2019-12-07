import { onMount } from 'svelte'
import { readable } from 'svelte/store'
import {
	interpret,
	EventObject,
	StateMachine,
	State,
	InterpreterOptions,
	MachineOptions,
	StateConfig,
} from 'xstate'

interface UseMachineOptions<TContext, TEvent extends EventObject> {
	/**
	 * If provided, will be merged with machine's `context`.
	 */
	context?: Partial<TContext>
	/**
	 * If `true`, service will start immediately (before mount).
	 */
	immediate: boolean
	/**
	 * The state to rehydrate the machine to. The machine will
	 * start at this state instead of its `initialState`.
	 */
	state?: StateConfig<TContext, TEvent>
}

const defaultOptions = {
	immediate: false,
}

export function machine<TContext, TEvent extends EventObject>(
	machine: StateMachine<TContext, any, TEvent>,
	options: Partial<InterpreterOptions> &
		Partial<UseMachineOptions<TContext, TEvent>> &
		Partial<MachineOptions<TContext, TEvent>> = defaultOptions,
) {
	const {
		context,
		guards,
		actions,
		activities,
		services,
		delays,
		immediate,
		state: rehydratedState,
		...interpreterOptions
	} = options

	const machineConfig = {
		context,
		guards,
		actions,
		activities,
		services,
		delays,
	}

	const machineConfigured = machine.withConfig(machineConfig, {
		...machine.context,
		...context,
	})
	const service = interpret(machineConfigured, interpreterOptions)
	const initialState = rehydratedState
		? State.create(rehydratedState)
		: service.initialState

	if (immediate) {
		service.start()
	}

	onMount(() => {
		service.start()
	})

	const store = readable(initialState, set => {
		service.onTransition(state => {
			if (state.changed) {
				set(state)
			}
		})

		return () => {
			service.stop()
		}
	})

	return {
		subscribe: store.subscribe,
		send: service.send,
		service,
	}
}
