<script>
	import './styles.css';
	import { getAge } from '$lib/age';

	let celebrated = false;
	function celebrate() {
		// TODO temp disabled
		// new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
		celebrated = true;
	}

	/**
	 * @type {string | null}
	 */
	let validKey = null;

	function generate() {
		validKey = 'foo-1234';
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
				<div>Generate or access a piece of knowledge:</div>
				<div>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						type="text"
						placeholder="use a key or generate a new one"
						style="width: 32em;"
						autofocus
						bind:value={validKey}
					/>
				</div>
				<div>
					<button on:click={generate}>Generate</button>
					<button disabled={validKey == null}>Save</button>
				</div>
				{#if validKey}
					<div>That key is rusted, but works.</div>
					<textarea placeholder="You can write here a piece of knowledge." rows="10" />
				{/if}
			</div>
		{/if}
	</main>

	<footer>
		<span><a href="https://github.com/terracota-p/val-birthday">source</a></span>
	</footer>
</div>
