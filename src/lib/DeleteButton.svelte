<script lang="ts">
	import { scale } from 'svelte/transition';
	import { colorLibrary } from '$lib/stores.js';

	export let showDeleteButton: Boolean, color: string;

	function removeColor() {
		console.log($colorLibrary[0], color);
		$colorLibrary = $colorLibrary.filter((item) => {
			return item !== color;
		});
	}
</script>

{#if showDeleteButton}
	<div in:scale={{ duration: 100 }} on:click={removeColor}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</div>
{/if}
