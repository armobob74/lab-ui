<div class="variant-ghost p-2">
	<h3 class="h3">Args:</h3>
	<slot name="dl" />
</div>

<!-- svelte:head ensures that the css is not discarded before slot is populated-->
<svelte:head>
	<style lang="scss">
		dl {
			* {
				margin-left: 1em;
			}
			dt {
				font-weight: bold;
			}
		}
	</style>
</svelte:head>
