<script>
  let scss = "",
    bResp = false,
    cssResp = ''
  const handlePostScss = () => {
    fetch("/r", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ request: scss }),
    })
      .then((res) => res.json())
      .then((res) => {
        bResp = true
          console.log(res)
          cssResp = res
        });
  };
</script>

<label for="sass">Votre code</label>
<textarea
  class="u-full-width"
  placeholder=".myClass ..."
  id="sass"
  bind:value={scss}
/>
<input class="button button-primary" value="Décoder" on:click={handlePostScss} />
{#if bResp}
<pre
    contenteditable="true"
  class="u-full-width"
  bind:innerHTML={cssResp}
/>
{/if}

<style>
  textarea {
    overflow: auto;
    resize: vertical;
  }
</style>
