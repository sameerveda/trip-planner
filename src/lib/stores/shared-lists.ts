import { writable } from 'svelte/store';

type SharedListItem = { title: string; id: string };

export const sharedList = writable<SharedListItem[]>([]);
