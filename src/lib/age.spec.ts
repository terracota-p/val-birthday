import { describe, it, expect } from 'vitest';
import { getAge } from './age';

describe('get age', () => {
	it('should get age', () => {
		expect(getAge(new Date('2023-11-09'))).toBe('1.00');
		expect(getAge(new Date('2024-05-09'))).toBe('1.50');
		expect(getAge(new Date('2024-11-09'))).toBe('2.00');
	});
});
