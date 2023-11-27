import { writable, type Writable } from 'svelte/store';
import * as repository from './repository-api';

export const key: Writable<string | null> = writable(null);

let _key: string | null = null;
key.subscribe((value) => (_key = value));

export const knowledge: Writable<string | null> = writable(null);
let _knowledge: string | null;
knowledge.subscribe((value) => (_knowledge = value));

export async function generate() {
	key.set(crypto.randomUUID());
	knowledge.set('');
	await save();
}

export async function save() {
	if (_key == null) {
		return;
	}
	await repository.set(_key, _knowledge);
}

export async function load() {
	if (!_key) {
		knowledge.set(null);
		return;
	}
	knowledge.set((await repository.get(_key)) ?? null);
}
