import { tick } from 'svelte'
import { render, fireEvent } from '@testing-library/svelte'

import Counters from './fixtures/Counters.svelte'
import CounterParent from './fixtures/CounterParent.svelte'

it('should share a single service instance', async () => {
	const { getAllByTestId, getByText } = render(Counters)

	const countEls = getAllByTestId('count')
	expect(countEls.length).toBe(2)

	countEls.forEach(countEl => {
		expect(countEl.textContent).toBe('0')
	})

	await fireEvent.click(getByText('Increment'))

	countEls.forEach(countEl => {
		expect(countEl.textContent).toBe('1')
	})
})

it('service actions should be configurable', async () => {
	const { getAllByTestId } = render(Counters)

	const countEls = getAllByTestId('count')
	const buttonEls = getAllByTestId('button-something')

	expect(countEls.length).toBe(2)

	countEls.forEach(countEl => {
		expect(countEl.textContent).toBe('0')
	})

	buttonEls.forEach(async buttonEl => {
		await fireEvent.click(buttonEl)
	})
	await tick()

	const otherEls = getAllByTestId('other')

	otherEls.forEach(otherEl => {
		expect(otherEl.textContent).toBe('test')
	})
})

it('service should be updated when it changes', async () => {
	const { getByTestId } = render(CounterParent)

	const changeServiceButton = getByTestId('change-service')
	const incButton = getByTestId('inc')
	const countEl = getByTestId('count')

	expect(countEl.textContent).toBe('0')
	await fireEvent.click(incButton)
	await tick()
	expect(countEl.textContent).toBe('1')
	await fireEvent.click(changeServiceButton)
	await tick()
	expect(countEl.textContent).toBe('0')
})
