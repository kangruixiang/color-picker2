<script>
	import { createEventDispatcher } from 'svelte';
	export let color, saturationAlt, valueAlt;

	const dispatch = createEventDispatcher();

	function sendData() {
		dispatch('changeColor', color);
	}
</script>

<div class="flex flex-col text-white text-center lg:rounded-b-md">
	<div class="h-20 cursor-pointer" on:click={sendData} style="background-color: {color}" />
	<div>
		{color}
	</div>
	<div>
		S: {Math.round(saturationAlt)}
	</div>
	<div class="lg:rounded-b-md">
		V: {Math.round(valueAlt)}
	</div>
</div>
