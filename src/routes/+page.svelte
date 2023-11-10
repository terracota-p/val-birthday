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
		<div>
			<button on:click={celebrate}>Let's celebrate!</button>
		</div>
	</main>

	<footer>
		<span><a href="https://github.com/terracota-p/val-birthday">source</a></span>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header {
		text-align: center;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		text-align: center;
	}

	footer {
		display: flex;
		justify-content: center;
		padding: 12px;
	}

	button {
		text-align: center;
		background-color: black;
		color: white;
		/* TODO bigger button */
		height: 4rem;
		width: 30rem;
	}

	button:hover {
		background-color: white;
		color: black;
	}
</style>
