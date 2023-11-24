import { describe, it, expect } from 'vitest';
import { generate, key, knowledge, save, validKey } from './knowledge';
import { get } from 'svelte/store';

describe('knowledge', () => {
	it('should start with no key or knowledge', () => {
		expect(get(key)).toBeNull();
		expect(get(knowledge)).toBeNull();
	});

	it('should generate key', () => {
		generate();

		expect(get(key)).not.empty;
		expect(get(knowledge)).toBeNull();
	});

	it('should store and get knowledge by key', () => {
		generate();
		const axiom = 'I think, therefore I exist';
		knowledge.set(axiom);

		save();

		expect(get(key)).not.empty;
		expect(get(knowledge)).toEqual(axiom);
	});

	// it('should get knowledge by key', () => {
	// 	save();

	// 	key.set('asdf');

	// 	expect(get(validKey)).toEqual('asdf');
	// });

	// it('should be invalid key', () => {
	// 	key.set('fo');

	// 	expect(get(validKey)).toBeNull();
	// });
});
