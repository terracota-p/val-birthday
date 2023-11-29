import * as repository from './repository-api';
import { browser } from '$app/environment';

// TODO pass fetch in default export function param

export async function generate(fetch?: typeof global.fetch): Promise<string> {
	const key = crypto.randomUUID();
	await save(key, '', fetch);
	return key;
}

export async function save(
	key: string | null,
	knowledge: string | null,
	fetch?: typeof global.fetch
) {
	if (key == null) {
		return;
	}
	await repository.set(key, knowledge, fetch ?? defaultFetch());
}

export async function load(
	key: string | null | undefined,
	fetch?: typeof global.fetch
): Promise<string | null> {
	// TODO temp
	console.log('load ', key);
	if (!key) {
		return null;
	}
	return repository.get(key, fetch ?? defaultFetch());
}

// TODO move to repository-api
function defaultFetch() {
	if (browser) {
		return window.fetch;
	}
	return global.fetch;
}
