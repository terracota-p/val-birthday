<script>
	import './styles.css';
	import { getAge } from '$lib/age';

	function celebrate() {
		new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
	}
</script>

<div>
	<h1>Val's Birthday</h1>

	<div>Val is {getAge()} years old</div>
	<button on:click={celebrate}>Let's celebrate!</button>
</div>

<style>
	button {
		text-align: center;
		background-color: black;
		color: white;
	}
</style>
