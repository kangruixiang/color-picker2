<script>
	import { getContext } from 'svelte';
	import { Motion } from 'svelte-motion';
	import { satIncrement, valIncrement } from '$lib/stores.js';

	const { hue, saturation, value } = getContext('colorContexts');

	export let hoverColor, backgroundColor, textColor;

	function random() {
		hue.set(Math.floor(Math.random() * 360));
		saturation.set(Math.floor(Math.random() * 100));
		value.set(Math.floor(Math.random() * 100));
		$satIncrement = Math.floor(Math.random() * 10);
		$valIncrement = Math.floor(Math.random() * 10);
	}
</script>

<Motion whileTap={{ scale: 0.99 }} let:motion>
	<button
		use:motion
		class="btn rounded-md tracking-widest randomButton"
		style="--hover-color: {hoverColor}; --text-color: {textColor}; --background-color: {backgroundColor}"
		on:click={random}>Random</button
	>
</Motion>

<style>
	.randomButton:hover {
		background-color: var(--hover-color);
	}
	.randomButton {
		background-color: var(--background-color);
		color: var(--text-color);
	}
</style>
