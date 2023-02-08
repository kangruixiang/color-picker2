<script lang="ts">
	import Alternate from '$lib/Alternate.svelte';
	import { hslToHex, hexToHSL } from '$lib/process';
	import { constArray } from '$lib/process';
	import { valIncrement, satIncrement, hueIncrement, colorLibrary } from '$lib/stores.js';
	import { createEventDispatcher } from 'svelte';

	export let hue: number, saturation: number, value: number, randomColor;

	const incrementList = constArray(-12, 12, 1).filter((item) => item != 0);

	$: saturationAlt = incrementList.map((increment) => {
		return Math.max(0, Math.min(saturation - increment * $satIncrement, 100));
	});
	$: valueAlt = incrementList.map((increment) => {
		return Math.max(0, Math.min(value + increment * $valIncrement, 100));
	});
</script>

<div class="text-zinc-300 grid lg:grid-cols-8 xl:grid-cols-12 w-full gap-y-4">
	{#each incrementList as step, i}
		<div class="">
			<Alternate
				on:changeColor
				color={hslToHex(hue, saturationAlt[i], valueAlt[i])}
				saturationAlt={saturationAlt[i]}
				valueAlt={valueAlt[i]}
			/>
		</div>
	{/each}
</div>
