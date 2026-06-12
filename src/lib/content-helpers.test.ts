import { describe, it, expect } from 'vitest';
import { slugFromPath, byDateDesc, byOrderDesc } from './content-helpers';

describe('slugFromPath', () => {
	it('extracts slug from a content path', () => {
		expect(slugFromPath('/content/writing/lofi-atc.md')).toBe('lofi-atc');
	});
});

describe('byDateDesc', () => {
	it('sorts newest first using ISO date strings', () => {
		const items = [{ date: '2024-09-02' }, { date: '2025-01-03' }];
		expect(items.sort(byDateDesc)[0].date).toBe('2025-01-03');
	});
});

describe('byOrderDesc', () => {
	it('sorts highest order first', () => {
		const items = [{ order: 6 }, { order: 9 }];
		expect(items.sort(byOrderDesc)[0].order).toBe(9);
	});
});
