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
	/**
	 * @type {string | null}
	 */
	let knowledge = null;
	const repository = { foo: 'Foo is great', bar: 'A bar is a bar' };

	function generate() {
		// TODO uuid
		validKey = 'foo-1234';
		key = validKey;
		// XXX history facts
		knowledge = null;
		save();
	}

	function save() {
		// TODO save
		console.log('save key, knowledge =', validKey, knowledge);
		if (validKey) {
			// TODO temp
			// @ts-ignore
			repository[validKey] = knowledge;
		}
	}

	/**
	 * @type {string | null}
	 */
	let key;
	function load() {
		if (!key) {
			validKey = null;
			return;
		}
		// TODO temp
		// @ts-ignore
		const _knowledge = repository[key];
		if (_knowledge) {
			validKey = key;
			knowledge = _knowledge;
			console.log('loaded key, knowledge =', key, knowledge);
		}
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
					<!-- TODO on input load (check isValid key, fetch knowledge) -->
					<input
						id="key"
						type="text"
						placeholder="use a key or generate a new one"
						style="width: 32em;"
						autofocus
						bind:value={key}
						on:input={load}
					/>
				</div>
				<div>
					<!-- TODO replace disabled with blurred style (and on click show tooltip eg "remove the key before generating a new one") -->
					<button disabled={validKey != null} on:click={generate}>Generate</button>
					<!-- TODO disabled until knowledge changed -->
					<!-- TODO replace disabled with blurred style -->
					<button disabled={validKey == null} on:click={save}>Save</button>
				</div>
				{#if validKey}
					<div>That key is rusted, but works.</div>
					<textarea
						placeholder="You can write here a piece of knowledge."
						rows="10"
						bind:value={knowledge}
					/>
				{/if}
			</div>
		{/if}
	</main>

	<footer>
		<span><a href="https://github.com/terracota-p/val-birthday">source</a></span>
	</footer>
</div>
