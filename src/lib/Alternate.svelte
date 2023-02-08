<script>
	import { createEventDispatcher } from 'svelte';
	export let color, saturationAlt, valueAlt;

	const dispatch = createEventDispatcher();

	function sendData() {
		dispatch('changeColor', color);
	}
</script>

<div class="flex flex-col text-center bg-zinc-900">
	<div class="h-96 cursor-pointer" on:click={sendData} style="background-color: {color}" />
	<div>
		{color}
	</div>
	<div>
		S: {Math.round(saturationAlt)}
	</div>
	<div class="lg:rounded-b-md pb-2">
		V: {Math.round(valueAlt)}
	</div>
</div>
