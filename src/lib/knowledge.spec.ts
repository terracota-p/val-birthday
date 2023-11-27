import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { generate, key, knowledge, load, save } from './knowledge';
import crypto from 'node:crypto';

Object.defineProperty(globalThis, 'crypto', {
	value: {
		randomUUID: () => crypto.randomUUID()
	}
});

describe('knowledge', () => {
	it('should start with no key or knowledge', () => {
		expect(get(key)).toBeNull();
		expect(get(knowledge)).toBeNull();
	});

	it('should generate key with empty knowledge', async () => {
		await generate();

		expect(get(key)).not.empty;
		expect(get(knowledge)).toEqual('');
	});

	it('should retrieve knowledge by key', async () => {
		generate();
		const axiom = 'I think, therefore I exist';
		knowledge.set(axiom);
		await save();

		await load();

		expect(get(key)).not.empty;
		expect(get(knowledge)).toEqual(axiom);
	});

	it('should not retrieve knowledge with invalid key', async () => {
		await generate();
		const axiom = 'I think, therefore I exist';
		knowledge.set(axiom);
		await save();

		key.set('invalid-key');
		await load();

		expect(get(knowledge)).toBeNull();
	});

	it('should update saved knowledge', async () => {
		await generate();
		const axiom = 'I think, therefore I exist';
		knowledge.set(axiom);
		await save();

		const updatedAxiom = axiom + "... I'm alive.";
		knowledge.set(updatedAxiom);
		await save();

		await load();
		expect(get(key)).not.empty;
		expect(get(knowledge)).toEqual(updatedAxiom);
	});
});
