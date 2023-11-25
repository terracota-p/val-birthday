<script lang="ts">
	import { getAge } from '$lib/age';
	import { generate, key, knowledge, load, save } from '../lib/knowledge';
	import './styles.css';

	let celebrated = false;
	function celebrate() {
		// XXX temp disabled
		// new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
		celebrated = true;
	}
</script>

<div class="app">
	<header><h1>Val's Birthday</h1></header>

	<main>
		<div class="vertical section">
			<div>Val is {getAge()} years old</div>
			<div>
				<button class="big" on:click={celebrate}>Let's celebrate!</button>
			</div>
		</div>

		{#if celebrated}
			<div class="vertical section">
				<div>
					<label for="key">Generate or access a piece of knowledge:</label>
				</div>
				<div>
					<!-- svelte-ignore a11y-autofocus -->
					<!-- XXX convert to non-editable (don't allow changing key, eg show tooltip) if `unsavedKnowledge` -->
					<input
						id="key"
						type="text"
						placeholder="use a key or generate a new one"
						style="width: 32em;"
						autofocus
						bind:value={$key}
						on:input={load}
					/>
				</div>
				<div>
					<!-- XXX replace disabled with blurred style (and on click show tooltip eg "remove the key before generating a new one") -->
					<button disabled={$knowledge != null} on:click={generate}>Generate</button>
					<!-- XXX replace disabled with blurred style -->
					<!-- XXX enabled if `unsavedKnowledge` -->
					<button disabled={$knowledge == null} on:click={save}>Save</button>
				</div>
				{#if $key && $knowledge == null}
					<div>The right key gives knowledge, but the wrong one takes it. Choose wisely.</div>
				{/if}
				{#if $knowledge != null}
					<div>That key is rusted, but works.</div>
					<textarea
						placeholder="You can write here a piece of knowledge."
						rows="10"
						bind:value={$knowledge}
					/>
				{/if}
			</div>
		{/if}
	</main>

	<footer>
		<span><a href="https://github.com/terracota-p/val-birthday">source</a></span>
	</footer>
</div>
