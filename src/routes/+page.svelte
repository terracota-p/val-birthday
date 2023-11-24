<script>
	import './styles.css';
	import { getAge } from '$lib/age';

	let celebrated = false;
	function celebrate() {
		new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
		celebrated = true;
	}
</script>

<div class="app">
	<header><h1>Val's Birthday</h1></header>

	<main>
		<div class="vertical section">
			<div>Val is {getAge()} years old</div>
			<div>
				<button on:click={celebrate}>Let's celebrate!</button>
			</div>
		</div>

		{#if celebrated}
			<div class="vertical section">
				<div>Generate or access a piece of knowledge:</div>
				<div>
					<input type="text" placeholder="use a key or generate a new one" style="width: 32em;" />
				</div>
			</div>
		{/if}
	</main>

	<footer>
		<span><a href="https://github.com/terracota-p/val-birthday">source</a></span>
	</footer>
</div>
