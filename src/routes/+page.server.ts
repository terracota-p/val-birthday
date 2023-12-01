import { redirect } from '@sveltejs/kit';
import 'dotenv/config';
import knowledge from '../lib/knowledge';
import type { Actions } from './$types';

export async function load({ url, fetch }) {
	const celebrated = url.searchParams.get('celebrated');
	const generated = url.searchParams.get('generated') != null;
	const key = url.searchParams.get('key');

	const loadedKnowledge = key && (await knowledge(fetch).load(key));

	return { celebrated, key, generated, knowledge: loadedKnowledge };
}

export const actions = {
	generate: async ({ fetch }) => {
		const key = knowledge(fetch).generate();
		const fact = await getQuote(fetch);
		await knowledge(fetch).save(key, mapFactToText(fact));

		throw redirect(303, `?key=${key}&generated`);
	},

	save: async ({ request, fetch }) => {
		const form = await request.formData();
		const k = form.get('key');
		const v = form.get('knowledge');
		await knowledge(fetch).save(k ? '' + k : null, v ? v + '' : null);

		throw redirect(303, `?key=${k}`);
	}
} satisfies Actions;

async function getQuote(fetch: typeof global.fetch): Promise<Fact | undefined> {
	try {
		const res = await fetch('https://api.api-ninjas.com/v1/quotes?category=' + rndTopic(), {
			headers: { 'X-Api-Key': API_NINJAS_KEY }
		});
		if (res.ok) {
			return (await res.json())?.[0];
		}
		console.warn('Error fetching fact, continuing', await res.text());
	} catch (error) {
		console.warn('Error fetching fact, continuing', error);
	}
}

const rndTopic = () => topics[Math.floor(Math.random() * topics.length)];

// ref - https://api-ninjas.com/api/quotes
const topics = ['art', 'history', 'knowledge'];

type Fact = {
	quote: string;
	author: string;
};

function mapFactToText(fact?: Fact): string {
	if (!fact) {
		return '';
	}

	const { quote, author } = fact;
	return `${quote}
  
  --${author}`;
}

const { API_NINJAS_KEY = '' } = process.env;
if (!API_NINJAS_KEY) {
	console.warn('No API_NINJAS_KEY env var set, will not get quotes on generate');
}
