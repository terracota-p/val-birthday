<script lang="ts">
	import { getAge } from '$lib/age';
	import { load } from '../../lib/knowledge';
	import '../styles.css';
	import type { PageData } from './$types';

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

	// TODO temp
	console.log('data =', data);

	function sing() {
		// TODO temp
		console.log('sing!');
		// new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
	}
</script>

<div class="app">
	<header><h1>Val's Birthday</h1></header>

	<main>
		<div class="vertical section">
			<div>Val is {getAge()} years old</div>
			<div>
				<form method="get" name="celebrate">
					<button data-testid="celebrate" name="celebrated" value="true" class="big" on:click={sing}
						>Let's celebrate!</button
					>
				</form>
			</div>
		</div>

		{#if data.celebrated || data.key}
			<div class="vertical section">
				<form method="post" action="?/key">
					<div>
						<label for="key">Generate or access a piece of knowledge:</label>
					</div>
					<div>
						<!-- svelte-ignore a11y-autofocus -->
						<input
							data-testid="key"
							name="key"
							type="text"
							placeholder="use a key or generate a new one"
							style="width: 32em;"
							autofocus
							value={data.key}
							on:input={() => {
								data.generated = false;
								load(data.key);
							}}
						/>
						<input type="submit" hidden />
					</div>
				</form>
				<div class="tooltip">
					{getTooltip(data.key, data.generated, data.knowledge)}
				</div>
				<div>
					<form method="post" action="?/generate">
						<button data-testid="generate" name="generate" disabled={data.knowledge != null}
							>Generate</button
						>
					</form>
				</div>
			</div>

			{#if data.knowledge != null}
				<div class="vertical section">
					<form method="post" action="?/save">
						<textarea
							data-testid="knowledge"
							name="knowledge"
							placeholder="You can write here a piece of knowledge."
							rows="10"
							value={data.knowledge}
						/>
						<input name="key" value={data.key} hidden />
						<div>
							<button data-testid="save" disabled={data.knowledge == null}>Save</button>
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
