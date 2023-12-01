import crypto from 'node:crypto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { generate, load, save } from './knowledge';

Object.defineProperty(globalThis, 'crypto', {
	value: {
		randomUUID: () => crypto.randomUUID()
	}
});

const repo: { [key: string]: string | null } = {};
vi.mock('./repository-api', () => {
	return {
		get: (k: string) => repo[k] ?? null,
		set: (k: string, v: string) => (repo[k] = v)
	};
});

describe('knowledge', () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should generate key', () => {
		const key = generate();

		expect(key).not.empty;
	});

	it('should not retrieve knowledge', async () => {
		const knowledge = await load('foo');

		expect(knowledge).toBeNull();
	});

	it('should retrieve knowledge by key', async () => {
		const key = generate();
		const axiom = 'I think, therefore I exist';
		await save(key, axiom);

		const knowledge = await load(key);

		expect(key).not.empty;
		expect(knowledge).toEqual(axiom);
	});

	it('should not retrieve knowledge with invalid key', async () => {
		const key = generate();
		const axiom = 'I think, therefore I exist';
		await save(key, axiom);

		const knowledge = await load('invalid-key');

		expect(knowledge).toBeNull();
	});

	it('should update saved knowledge', async () => {
		const key = generate();
		const axiom = 'I think, therefore I exist';
		await save(key, axiom);

		const updatedAxiom = axiom + "... I'm alive.";
		await save(key, updatedAxiom);

		const knowledge = await load(key);
		expect(knowledge).toEqual(updatedAxiom);
	});
});
