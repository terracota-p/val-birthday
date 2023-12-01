<script lang="ts">
	import { getAge } from '$lib/age';
	import { writable } from 'svelte/store';
	import knowledgeMod from '../../lib/knowledge';
	import '../styles.css';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	const { load } = knowledgeMod();

	export let data: PageData;

	function getTooltip(
		key: string | null | undefined,
		generated: boolean,
		knowledge: string | null | undefined
	) {
		if (key && knowledge == null) {
			return 'The right key gives knowledge, but the wrong one takes it. Choose wisely.';
		}
		if (generated && !knowledge) {
			return 'Keep this key in a safe place for later access.';
		}
		if (!generated && knowledge != null) {
			return 'That key is rusted, but works.';
		}
		return '';
	}

	const key = writable<string | undefined>(data.key);
	const knowledge = writable<string | null | undefined>(data.knowledge);
	const generated = writable<boolean>(data.generated);

	function sing() {
		new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
	}
</script>

<div class="app">
	<header><h1>Val's Birthday</h1></header>

	<main>
		<div class="vertical section">
			<div>Val is {getAge()} years old</div>
			<div>
				<form method="get" name="celebrate" class="big" data-sveltekit-keepfocus>
					<button data-testid="celebrate" name="celebrated" value="true" class="big" on:click={sing}
						>Let's celebrate!</button
					>
				</form>
			</div>
		</div>

		{#if data.celebrated || $key != null}
			<div class="vertical section">
				<form method="post" action="?/key" data-sveltekit-keepfocus>
					<div>
						<label for="key">Generate or access a piece of knowledge:</label>
					</div>
					<div>
						<input
							data-testid="key"
							name="key"
							type="text"
							placeholder="use a key or generate a new one"
							class="big"
							bind:value={$key}
							on:input={async () => {
								generated.set(false);
								knowledge.set(await load($key));
								goto(`/${$key}`, { keepFocus: true });
							}}
						/>
						<input type="submit" hidden />
					</div>
				</form>
				<div class="tooltip">
					{getTooltip($key, $generated, $knowledge)}
				</div>
				<div>
					<form method="post" action="?/generate" data-sveltekit-keepfocus>
						<button data-testid="generate" name="generate" disabled={$knowledge != null}
							>Generate</button
						>
					</form>
				</div>
			</div>

			{#if $knowledge != null}
				<div class="vertical section content">
					<form
						method="post"
						action="?/save"
						class="vertical section content"
						data-sveltekit-keepfocus
					>
						<textarea
							class="vertical section content"
							data-testid="knowledge"
							name="knowledge"
							placeholder="You can write here a piece of knowledge."
							bind:value={$knowledge}
						/>
						<input name="key" value={$key} hidden />
						<input name="celebrated" value={data.celebrated} hidden />
						<div>
							<button data-testid="save" disabled={$knowledge == null}>Save</button>
						</div>
					</form>
				</div>
			{/if}
		{/if}
	</main>

	<footer>
		<span><a href="https://github.com/terracota-p/val-birthday">source</a></span>
	</footer>
</div>
