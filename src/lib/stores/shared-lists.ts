import { writable } from 'svelte/store';

export const sharedList = writable<BasicTextItem[]>([]);
