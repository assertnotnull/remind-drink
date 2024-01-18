import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Settings = {
	reminderPrefs: string;
};

const initial: Settings = {
	reminderPrefs: ''
};

const storage = browser ? window.localStorage.content ?? initial : initial;

export const boundStorage = writable<Settings>(storage);

boundStorage.subscribe((value) => {
	if (browser) {
		localStorage.setItem('reminderPrefs', value.reminderPrefs);
	}
});
