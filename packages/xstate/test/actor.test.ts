import { tick } from 'svelte'
import { render } from '@testing-library/svelte'

import Actor from './fixtures/Actor.svelte'

it('should subscribe to the actor', async () => {
	const { getByTestId } = render(Actor)
	await tick()
	expect(getByTestId('count').textContent).toBe('42')
})
