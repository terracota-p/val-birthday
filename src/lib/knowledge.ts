import { derived, writable, type Writable } from 'svelte/store';

export const key: Writable<string | null> = writable(null);

export const validKey = derived(key, ($key) => (($key?.length ?? 0) < 3 ? null : $key));
let _validKey: string | null = null;
validKey.subscribe((value) => {
	_validKey = value;
	console.log('_validKey =', _validKey);
});

const repository: { [key: string]: string | null } = {
	foo: 'Foo is great',
	bar: 'A bar is a bar'
};

export const knowledge: Writable<string | null> = writable(null);
let _knowledge: string | null;
knowledge.subscribe((value) => (_knowledge = value));

export function generate() {
	// TODO uuid
	key.set('foo-1234');
	knowledge.set(null);
	save();
}

export function save() {
	if (_validKey == null) {
		return;
	}
	repository[_validKey] = _knowledge;
}

export function load() {
	if (!_validKey) {
		return;
	}
	knowledge.set(repository[_validKey] ?? null);
}
