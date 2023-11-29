import { redirect } from '@sveltejs/kit';
import 'dotenv/config';
import * as knowledge from '../../lib/knowledge';
import type { Actions } from './$types';

export async function load({ url, params, fetch }) {
	const celebrated = url.searchParams.get('celebrated');
	const generated = !!url.searchParams.get('generated');
	const key = params.key;

	const loadedKnowledge = key && (await knowledge.load(key, fetch));

	return { celebrated, key, generated, knowledge: loadedKnowledge };
}

export const actions = {
	key: async ({ request }) => {
		const key = (await request.formData()).get('key');
		throw redirect(303, `/${key}`);
	},

	generate: async ({ fetch }) => {
		// TODO generate should not save
		const key = await knowledge.generate(fetch);

		try {
			const res = await fetch('https://api.api-ninjas.com/v1/quotes?category=' + rndTopic(), {
				headers: { 'X-Api-Key': 'LGeBfaq0hvqDB3LzuKXdnw==0UZVPVaJsdxuKiiD' }
			});
			if (res.ok) {
				const fact = (await res.json())?.[0];
				await knowledge.save(key, mapFactToText(fact), fetch);
			}
		} catch (error) {
			console.warn('Error fetching fact, continuing', error);
		}

		throw redirect(303, `/${key}?generated`);
	},

	save: async ({ request, fetch }) => {
		const form = await request.formData();
		const k = form.get('key');
		const v = form.get('knowledge');
		await knowledge.save(k ? '' + k : null, v ? v + '' : null, fetch);
	}
} satisfies Actions;

const rndTopic = () => topics[Math.floor(Math.random() * topics.length)];

// ref - https://api-ninjas.com/api/quotes
const topics = ['art', 'history', 'knowledge'];

function mapFactToText({ quote, author }: { quote: string; author: string }) {
	return `${quote}
  
  --${author}`;
}
