<script lang="ts">
	import { setContext } from 'svelte';
	import { scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { sineOut } from 'svelte/easing';

	import Slider from '$lib/Slider.svelte';
	import Alternate from '$lib/Alternate.svelte';
	import RandomButton from '$lib/RandomButton.svelte';
	import AddButton from '$lib/AddButton.svelte';
	import ColorLibrary from '$lib/ColorLibrary.svelte';

	import { valIncrement, satIncrement, hueIncrement, colorLibrary } from '$lib/stores.js';

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

	let textColor = '#e0e0e0';
	let textColorLight = '#e0e0e0';
	let textColorDark = '#11110d';
	let showAddButton = false;

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
	$: hueAlt = incrementList.map((increment) => {
		return Math.max(0, Math.min($hue - increment * $hueIncrement, 360));
	});

	$: $value > 50 ? (textColor = textColorDark) : (textColor = textColorLight);

	function hslToHex(h: number, s: number, l: number) {
		l /= 100;
		let a = (s * Math.min(l, 1 - l)) / 100;
		let f = (n) => {
			let k = (n + h / 30) % 12;
			let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, '0'); // convert to Hex and prefix "0" if needed
		};
		return `#${f(0)}${f(8)}${f(4)}`;
	}

	function hexToHSL(H: string) {
		// Convert hex to RGB first
		let r = 0,
			g = 0,
			b = 0;
		if (H.length == 4) {
			r = '0x' + H[1] + H[1];
			g = '0x' + H[2] + H[2];
			b = '0x' + H[3] + H[3];
		} else if (H.length == 7) {
			r = '0x' + H[1] + H[2];
			g = '0x' + H[3] + H[4];
			b = '0x' + H[5] + H[6];
		}
		// Then to HSL
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		if (h < 0) h += 360;

		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		hue.set(h);
		saturation.set(s);
		value.set(l);

		return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	}

	async function copy(color: string) {
		await navigator.clipboard.writeText(color);
	}

	function changeColor(event: string) {
		if (typeof event.detail != 'string') {
			console.log(event.detail);
			return;
		}
		hexToHSL(event.detail);
	}
</script>

<main
	class="h-screen w-screen items-center justify-center flex bg-zinc-800 rounded-lg overflow-y-auto flex-col "
>
	<div
		class="main-card w-full sm:w-2/3 lg:w-5/6 max-w-6xl flex flex-col lg:flex-row lg:space-x-8 shadow-xl lg:shadow-none"
	>
		<div class="color-portion lg:shadow-xl flex flex-col lg:w-1/2">
			<div
				class="main-color rounded-t-md p-8 h-60 md:h-80 flex flex-col"
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
					style="background-color: {hslToHex(
						$hue,
						saturationAlt[3],
						valueAlt[3]
					)}; color: {textColor}"
				>
					<input
						type="text"
						class="input-text pr-0 w-20 focus:border-0 focus:ring-0 text-center"
						bind:value={randomColor}
						on:change={() => hexToHSL(randomColor)}
						style="background-color: {hslToHex(
							$hue,
							saturationAlt[3],
							valueAlt[3]
						)}; color: {textColor}"
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
			<div
				class="alternate-colors lg:shadow-xl grid grid-cols-3 sm:grid-cols-6 middle rounded-md bg-zinc-700"
			>
				<Alternate
					on:changeColor={changeColor}
					color={hslToHex($hue, saturationAlt[5], valueAlt[5])}
					saturationAlt={saturationAlt[5]}
					valueAlt={valueAlt[5]}
				/>
				<Alternate
					on:changeColor={changeColor}
					color={hslToHex($hue, saturationAlt[4], valueAlt[4])}
					saturationAlt={saturationAlt[4]}
					valueAlt={valueAlt[4]}
				/>
				<Alternate
					on:changeColor={changeColor}
					color={hslToHex($hue, saturationAlt[3], valueAlt[3])}
					saturationAlt={saturationAlt[3]}
					valueAlt={valueAlt[3]}
				/>
				<Alternate
					on:changeColor={changeColor}
					color={hslToHex($hue, saturationAlt[2], valueAlt[2])}
					saturationAlt={saturationAlt[2]}
					valueAlt={valueAlt[2]}
				/>
				<Alternate
					on:changeColor={changeColor}
					color={hslToHex($hue, saturationAlt[1], valueAlt[1])}
					saturationAlt={saturationAlt[1]}
					valueAlt={valueAlt[1]}
				/>
				<Alternate
					on:changeColor={changeColor}
					color={hslToHex($hue, saturationAlt[0], valueAlt[0])}
					saturationAlt={saturationAlt[0]}
					valueAlt={valueAlt[0]}
				/>
			</div>
		</div>

		<div
			class="sliders rounded-b-md p-8 flex flex-col space-y-2 bg-stone-100 lg:w-1/2 lg:rounded-md lg:shadow-xl"
		>
			<Slider
				bind:data={$hue}
				min={0}
				max={360}
				background="background: linear-gradient(to right, #d42b2b 0%, #cdcd32 17%, #54ab54 33%, #55aaaa 50%, #2020df 67%, #ab54ab 83%, #d42b2b 100%);"
			/>
			<Slider
				bind:data={$saturation}
				background="background: linear-gradient(to right, {saturation0}, {saturation100});"
			/>
			<Slider
				bind:data={$value}
				background="background: linear-gradient(to right, {value0}, {value100});"
			/>
			<div class="md:flex md:space-x-4">
				<Slider
					bind:data={$satIncrement}
					background="background: linear-gradient(to right, #e0e0e0, 
#11110d)"
					min={0}
					max={15}
					step={0.1}>Saturation Steps</Slider
				>
				<Slider
					bind:data={$valIncrement}
					background="background: linear-gradient(to right, #e0e0e0, 
#11110d)"
					min={0}
					max={10}
					step={0.1}>Value Steps</Slider
				>
			</div>
			<div class="grow" />

			<RandomButton
				hoverColor={hslToHex($hue, saturationAlt[4], valueAlt[4])}
				{textColor}
				backgroundColor={hslToHex($hue, saturationAlt[5], valueAlt[5])}
			/>
		</div>
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
