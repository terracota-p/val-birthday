<script>
  import song from "./stephen-hawking-happy-birthday-valeria.mp3"

	function celebrate() {
    const audio = new Audio();
    audio.src = song;
		audio.play();
	}
</script>

<h1>Val's Birthday</h1>

<div>09/11/2022</div>
<button on:click={celebrate}>Let's celebrate!</button>
