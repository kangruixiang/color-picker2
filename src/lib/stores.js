import { writable } from 'svelte/store';

export const satIncrement = writable(5);
export const valIncrement = writable(5);
export const hueIncrement = writable(15);
export const colorLibrary = writable([]);
