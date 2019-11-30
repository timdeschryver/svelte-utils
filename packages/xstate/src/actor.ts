import { readable } from 'svelte/store'
import { EventObject, Actor } from 'xstate'

export function actor<TC, TE extends EventObject>(actor?: Actor<TC, TE>) {
	const store = readable(actor ? {} : undefined, set => {
		if (actor) {
			const sub = actor.subscribe(set)
			return () => {
				sub.unsubscribe()
			}
		}

		return () => {}
	})

	return {
		subscribe: store.subscribe,
		send: (actor ? actor.send : () => void 0) as typeof actor.send,
	}
}
