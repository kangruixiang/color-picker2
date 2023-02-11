<script lang="ts">
	import { getContext } from 'svelte';
	import AddButton from '$lib/AddButton.svelte';
	import { hslToHex, hexToHSL } from '$lib/process';
	import { valIncrement, satIncrement } from '$lib/stores.js';

	export let textColor, randomColor;

	const { hue, saturation, value } = getContext('colorContexts');

	let showAddButton = false;

	$: saturationAlt = Math.max(0, Math.min($saturation - -1 * $satIncrement, 100));
	$: valueAlt = Math.max(0, Math.min($value + -1 * $valIncrement, 100));

	function changeColor(color: string) {
		const { h, s, l } = hexToHSL(color);
		console.log('returned', h, s, l);
		hue.set(h);
		saturation.set(s);
		value.set(l);
	}
</script>

<div class="color-portion lg:shadow-xl flex flex-col">
	<div
		class="main-color rounded-md p-8 h-60 md:h-80 flex flex-col"
		style="background-color: {randomColor}"
		on:mouseenter={() => {
			showAddButton = true;
		}}
		on:mouseleave={() => {
			showAddButton = false;
		}}
	>
		<div class="flex flex-end cursor-pointer justify-end">
			<AddButton {showAddButton} {randomColor} />
		</div>
		<div class="placeholder grow" />
		<div
			class="color-input self-end flex items-center justify-center rounded-md"
			style="background-color: {hslToHex($hue, saturationAlt, valueAlt)}; color: {textColor}"
		>
			<input
				type="text"
				class="input-text pr-0 w-20 focus:border-0 focus:ring-0 text-center"
				bind:value={randomColor}
				on:change={changeColor(randomColor)}
				style="background-color: {hslToHex($hue, saturationAlt, valueAlt)}; color: {textColor}"
			/>
			<div
				class="cursor-pointer pr-1 rounded-r-md"
				on:click={() => {
					copy(randomColor);
				}}
				style="color: {textColor}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
					/>
				</svg>
			</div>
		</div>
	</div>
</div>
