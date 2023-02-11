<script lang="ts">
	import { setContext } from 'svelte';
	import { scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { sineOut } from 'svelte/easing';

	import MainColor from '$lib/MainColor.svelte';
	import RandomButton from '$lib/RandomButton.svelte';
	import ColorLibrary from '$lib/ColorLibrary.svelte';
	import SlidersCard from '$lib/SlidersCard.svelte';
	import { hslToHex, hexToHSL } from '$lib/process';

	import { valIncrement, satIncrement, colorLibrary } from '$lib/stores.js';
	import AlternateLibrary from '$lib/AlternateLibrary.svelte';

	export let data;
	console.log(data);

	// construct initial hue, saturation, values
	const hue = tweened(Math.floor(Math.random() * 360), {
		duration: 100,
		easing: sineOut
	});

	const saturation = tweened(Math.floor(Math.random() * 100), {
		duration: 100,
		easing: sineOut
	});

	const value = tweened(Math.floor(Math.random() * 100), {
		duration: 100,
		easing: sineOut
	});

	const colorContexts = {
		hue,
		saturation,
		value
	};

	setContext('colorContexts', colorContexts);

	// text color based on light or dark
	let textColor = '#d4d4d8';
	let textColorLight = '#d4d4d8';
	let textColorDark = '#11110d';

	$: randomColor = hslToHex($hue, $saturation, $value);
	$: saturation0 = hslToHex($hue, 0, $value);
	$: saturation100 = hslToHex($hue, 50, $value);
	$: value0 = hslToHex($hue, $saturation, 10);
	$: value100 = hslToHex($hue, $saturation, 90);

	let incrementList = [3, 2, 1, -1, -2, -3];

	$: saturationAlt = incrementList.map((increment) => {
		return Math.max(0, Math.min($saturation - increment * $satIncrement, 100));
	});
	$: valueAlt = incrementList.map((increment) => {
		return Math.max(0, Math.min($value + increment * $valIncrement, 100));
	});

	$: $value > 50 ? (textColor = textColorDark) : (textColor = textColorLight);

	async function copy(color: string) {
		await navigator.clipboard.writeText(color);
	}

	function changeColor(event: string) {
		if (typeof event.detail != 'string') {
			console.log('Not string ', event.detail);
			return;
		}
		const { h, s, l } = hexToHSL(event.detail);
		console.log('returned', h, s, l);
		hue.set(h);
		saturation.set(s);
		value.set(l);
	}
</script>

<main class="h-screen w-screen  flex bg-zinc-800">
	<div class="grow">
		<AlternateLibrary
			hue={$hue}
			saturation={$saturation}
			value={$value}
			{randomColor}
			on:changeColor={changeColor}
		/>
	</div>
	<div class="w-96 flex flex-col h-screen space-y-8 bg-zinc-900 px-8 py-10 ">
		<MainColor {textColor} {randomColor} />

		<SlidersCard
			bind:hue={$hue}
			bind:saturation={$saturation}
			bind:value={$value}
			{textColor}
			{randomColor}
			{value0}
			{value100}
			{saturation0}
			{saturation100}
		/>

		<RandomButton
			hoverColor={hslToHex($hue, saturationAlt[3], valueAlt[3])}
			{textColor}
			backgroundColor={hslToHex($hue, saturationAlt[4], valueAlt[4])}
		/>

		{#if $colorLibrary.length > 0}
			<div transition:scale>
				<ColorLibrary on:changeColor={changeColor} />
			</div>
		{/if}
	</div>
</main>

<style>
	.btn {
		background-color: var(--color);
		color: var(--text);
	}
	.btn:hover {
		background-color: var(--hover-color);
	}
</style>
