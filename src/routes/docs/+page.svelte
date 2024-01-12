<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	let openStates = Array(5).fill(false);

	function openAll() {
		openStates = openStates.map(() => true);
	}
	function closeAll() {
		openStates = openStates.map(() => false);
	}
</script>

<div class="m-4">
	<h2 class="h2">Documentation</h2>
	<div class="flex justify-between">
		<h3 class="h3">Steps by Instrument</h3>
		<div class="flex gap-4">
			<button class="btn" on:click={openAll}>open all</button>
			<button class="btn" on:click={closeAll}>close all</button>
		</div>
	</div>

	<Accordion class="variant-filled">
		<AccordionItem bind:open={openStates[0]}>
			<svelte:fragment slot="summary">SPM Syringe Pump</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a class="link" href="/docs/spm/transfer"
							>transfer [name, from-port, to-port, volume (mL)]</a
						>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[1]}>
			<svelte:fragment slot="summary">SmartStageXY</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/smart-stage-xy/move-to-well"> move-to-well [name, well]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[2]}>
			<svelte:fragment slot="summary">DLI Power</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/dlipower/control"> control [button_name, action]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[3]}>
			<svelte:fragment slot="summary">Hamilton Pump</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/hamilton-pump/transfer"> transfer [from_port, to_port, vol]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[4]}>
			<svelte:fragment slot="summary">Tuya FingerBot</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/tuya-fingerbot/single-press">single-press []</a>
						<a href="/docs/tuya-fingerbot/double-press">double-press [delay]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

<style lang="scss">
	ol > li {
		font-family: monospace;
	}
	a {
		&:link {
			color: blue;
			text-decoration: underline;
		}

		&:visited {
			color: purple;
		}

		&:hover {
			color: rgb(69, 69, 249);
		}

		&:active {
			color: aqua;
		}
	}
</style>
