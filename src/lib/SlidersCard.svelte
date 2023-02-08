<script lang="ts">
	import { valIncrement, satIncrement, hueIncrement, colorLibrary } from '$lib/stores.js';
	import Slider from '$lib/Slider.svelte';

	import { hslToHex, hexToHSL } from '$lib/process';

	export let hue: number,
		saturation: number,
		value: number,
		value0,
		value100,
		saturation0,
		saturation100,
		textColor;

	$: saturationAlt = Math.max(0, Math.min(saturation - -2 * $satIncrement, 100));
	$: valueAlt = Math.max(0, Math.min(value + -2 * $valIncrement, 100));
	$: saturationAlt2 = Math.max(0, Math.min(saturation - -3 * $satIncrement, 100));
	$: valueAlt2 = Math.max(0, Math.min(value + -3 * $valIncrement, 100));
</script>

<div class="sliders flex flex-col space-y-2">
	<Slider
		bind:data={hue}
		min={0}
		max={360}
		background="background: linear-gradient(to right, #d42b2b 0%, #cdcd32 17%, #54ab54 33%, #55aaaa 50%, #2020df 67%, #ab54ab 83%, #d42b2b 100%);"
		>Hue</Slider
	>
	<Slider
		bind:data={saturation}
		background="background: linear-gradient(to right, {saturation0}, {saturation100});"
		>Saturation</Slider
	>
	<Slider
		bind:data={value}
		background="background: linear-gradient(to right, {value0}, {value100});">Value</Slider
	>

	<Slider
		bind:data={$satIncrement}
		background="background: linear-gradient(to right, #11110d, 
#e0e0e0)"
		min={0}
		max={15}
		step={0.1}>Saturation Steps</Slider
	>
	<Slider
		bind:data={$valIncrement}
		background="background: linear-gradient(to right, #11110d, 
#e0e0e0)"
		min={0}
		max={10}
		step={0.1}>Value Steps</Slider
	>

	<div class="grow" />
</div>
