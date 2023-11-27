<script lang="ts">
	import { getAge } from '$lib/age';
	import { generate, key, knowledge, load, save } from '../lib/knowledge';
	import './styles.css';

	let celebrated = false;
	function celebrate() {
		new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
		celebrated = true;
	}

	let generated = false;

	function getTooltip($key: string | null, generated: boolean, $knowledge: string | null) {
		if ($key && $knowledge == null) {
			return 'The right key gives knowledge, but the wrong one takes it. Choose wisely.';
		}
		if (generated && !$knowledge) {
			return 'Keep this key in a safe place for later access.';
		}
		if (!generated && $knowledge != null) {
			return 'That key is rusted, but works.';
		}
		return '';
	}
</script>

<div class="app">
	<header><h1>Val's Birthday</h1></header>

	<main>
		<div class="vertical section">
			<div>Val is {getAge()} years old</div>
			<div>
				<button data-testid="celebrate" class="big" on:click={celebrate}>Let's celebrate!</button>
			</div>
		</div>

		{#if celebrated}
			<div class="vertical section">
				<div>
					<label for="key">Generate or access a piece of knowledge:</label>
				</div>
				<div>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						data-testid="key"
						id="key"
						type="text"
						placeholder="use a key or generate a new one"
						style="width: 32em;"
						autofocus
						bind:value={$key}
						on:input={() => {
							generated = false;
							load();
						}}
					/>
				</div>
				<div class="tooltip">
					{getTooltip($key, generated, $knowledge)}
				</div>
				<div>
					<button
						data-testid="generate"
						disabled={$knowledge != null}
						on:click={() => {
							generated = true;
							generate();
						}}>Generate</button
					>
				</div>
			</div>

			{#if $knowledge != null}
				<div class="vertical section">
					<textarea
						data-testid="knowledge"
						placeholder="You can write here a piece of knowledge."
						rows="10"
						bind:value={$knowledge}
					/>
					<div>
						<button data-testid="save" disabled={$knowledge == null} on:click={save}>Save</button>
					</div>
				</div>
			{/if}
		{/if}
	</main>

	<footer>
		<span><a href="https://github.com/terracota-p/val-birthday">source</a></span>
	</footer>
</div>
