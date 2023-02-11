<script lang="ts">
	import Alternate from '$lib/Alternate.svelte';
	import { hslToHex } from '$lib/process';
	import { constArray } from '$lib/process';
	import { valIncrement, satIncrement } from '$lib/stores.js';

	export let hue: number, saturation: number, value: number, randomColor;

	const incrementList = constArray(-12, 12, 1).filter((item) => item != 0);

	$: saturationAlt = incrementList.map((increment) => {
		return Math.max(0, Math.min(saturation - increment * $satIncrement, 100));
	});
	$: valueAlt = incrementList.map((increment) => {
		return Math.max(0, Math.min(value + increment * $valIncrement, 100));
	});
</script>

<div
	class="text-zinc-300 grid md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12 gap-y-4 overflow-y-auto h-screen py-10 px-8 auto-rows-min xl:content-center"
>
	{#each incrementList as step, i}
		<div>
			<Alternate
				on:changeColor
				color={hslToHex(hue, saturationAlt[i], valueAlt[i])}
				saturationAlt={saturationAlt[i]}
				valueAlt={valueAlt[i]}
			/>
		</div>
	{/each}
</div>
