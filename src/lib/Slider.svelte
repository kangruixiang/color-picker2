<script>
	export let data = 0;
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let background = 'background: gray';

	function handleInput(event) {
		const value = parseInt(event.target.value);
		if (isNaN(value)) return;
		data = value;
	}
</script>

<div class="w-full">
	<label for="slider" class="label">
		<slot />
		<div class="flex space-x-4 items-center">
			<input
				type="range"
				class="slider w-full appearance-none h-2 rounded-lg"
				tabindex="-1"
				style={background}
				bind:value={data}
				{min}
				{max}
				{step}
			/>
			<input
				type="number"
				class="input-text w-12"
				on:change={handleInput}
				value={Math.round(data)}
			/>
		</div>
	</label>
</div>

<style>
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		width: 20px; /* Set a specific slider handle width */
		height: 20px; /* Slider handle height */
		background: #191919; /* Green background */
		cursor: pointer; /* Cursor on hover */
		border-radius: 100%;
		border: none;
	}

	.slider::-moz-range-thumb {
		width: 20px; /* Set a specific slider handle width */
		height: 20px; /* Slider handle height */
		background: #191919; /* Green background */
		cursor: pointer; /* Cursor on hover */
		border-radius: 100%;
		border: none;
		/* border: 1px solid #191919; */
		/* box-shadow: #7e7e7e 0px 2px 3px 0px; */
	}

	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
