<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { createEventDispatcher } from 'svelte';

	import { colorLibrary } from '$lib/stores.js';
	import SavedColor from '$lib/SavedColor.svelte';

	let showDeleteButton = false;

	const dispatch = createEventDispatcher();

	function sendData(color: string) {
		dispatch('changeColor', color);
	}
</script>

<div in:scale={{ duration: 100 }} class="bg-white p-2 rounded-md grid grid-rows-3 grid-flow-col">
	{#each $colorLibrary as color (color)}
		<div transition:scale animate:flip>
			<SavedColor {showDeleteButton} {color} on:changeColor={sendData(color)} />
		</div>
	{/each}
</div>
