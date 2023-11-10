<script>
	import { getAge } from '$lib/age';

	function celebrate() {
		new Audio('./stephen-hawking-happy-birthday-valeria.mp3').play();
	}
</script>

<h1>Val's Birthday</h1>

<div>Val is {getAge()} years old</div>
<button on:click={celebrate}>Let's celebrate!</button>
