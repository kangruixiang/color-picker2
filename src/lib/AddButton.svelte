<script>
	import { scale } from 'svelte/transition';
	import { colorLibrary } from '$lib/stores.js';

	export let showAddButton, randomColor;

	function addColor() {
		if ($colorLibrary.includes(randomColor)) {
			return;
		}

		$colorLibrary = [...$colorLibrary, randomColor];
	}
</script>

{#if showAddButton}
	<div in:scale={{ duration: 100 }} on:click={addColor}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-8 h-8 "
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</div>
{/if}
