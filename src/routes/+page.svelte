<script>
	import './styles.css';
	import { getAge } from '$lib/age';

	function celebrate() {
		new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
	}
</script>

<div class="app">
	<header><h1>Val's Birthday</h1></header>

	<main>
		<div>Val is {getAge()} years old</div>
		<button on:click={celebrate}>Let's celebrate!</button>
	</main>

	<footer>
		<p><a href="https://github.com/terracota-p/val-birthday">source</a></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	button {
		text-align: center;
		background-color: black;
		color: white;
	}
</style>
