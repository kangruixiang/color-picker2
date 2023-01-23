<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import DeleteButton from '$lib/DeleteButton.svelte';

	export let color: string, showDeleteButton: boolean;
	const dispatch = createEventDispatcher();

	function sendData(color: string) {
		dispatch('changeColor', {
			text: color
		});
	}
</script>

<div
	class="relative h-20 w-20 cursor-pointer"
	on:mouseenter={() => {
		showDeleteButton = true;
	}}
	on:mouseleave={() => {
		showDeleteButton = false;
	}}
	on:click={sendData}
	style="background-color: {color}"
>
	<div class="absolute top-0 right-0">
		<DeleteButton {showDeleteButton} {color} />
	</div>
</div>
