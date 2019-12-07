import { readable } from 'svelte/store'
import { EventObject, Interpreter } from 'xstate'

export function service<TContext, TEvent extends EventObject>(
	service: Interpreter<TContext, any, TEvent>,
) {
	const store = readable(service.state, set => {
		const listener = (state: any) => {
			if (state.changed) {
				set(state)
			}
		}

		const sub = service.subscribe(listener)

		return () => {
			sub.unsubscribe()
		}
	})

	return {
		subscribe: store.subscribe,
		send: service.send,
		service,
	}
}
