import { writable, type Writable } from 'svelte/store';

export const key: Writable<string | null> = writable(null);

let _key: string | null = null;
key.subscribe((value) => (_key = value));
const repository: { [key: string]: string | null } = {
	foo: 'Foo is great',
	bar: 'A bar is a bar'
};

export const knowledge: Writable<string | null> = writable(null);
let _knowledge: string | null;
knowledge.subscribe((value) => (_knowledge = value));

export function generate() {
	key.set(crypto.randomUUID());
	knowledge.set('');
	save();
}

export function save() {
	if (_key == null) {
		return;
	}
	repository[_key] = _knowledge;
}

export function load() {
	if (!_key) {
		knowledge.set(null);
		return;
	}
	knowledge.set(repository[_key] ?? null);
}
