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

	it('should generate key with empty knowledge', () => {
		generate();

		expect(get(key)).not.empty;
		expect(get(knowledge)).toEqual('');
	});

	it('should retrieve knowledge by key', () => {
		generate();
		const axiom = 'I think, therefore I exist';
		knowledge.set(axiom);
		save();

		load();

		expect(get(key)).not.empty;
		expect(get(knowledge)).toEqual(axiom);
	});

	it('should not retrieve knowledge with invalid key', () => {
		generate();
		const axiom = 'I think, therefore I exist';
		knowledge.set(axiom);
		save();

		key.set('invalid-key');
		load();

		expect(get(knowledge)).toBeNull();
	});

	it('should update saved knowledge', () => {
		generate();
		const axiom = 'I think, therefore I exist';
		knowledge.set(axiom);
		save();

		const updatedAxiom = axiom + "... I'm alive.";
		knowledge.set(updatedAxiom);
		save();

		load();
		expect(get(key)).not.empty;
		expect(get(knowledge)).toEqual(updatedAxiom);
	});
});
