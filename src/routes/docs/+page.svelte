<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	let openStates = Array(100).fill(false);

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
					</li>
					<li>
						<a href="/docs/tuya-fingerbot/double-press">double-press [delay]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[5]}>
			<svelte:fragment slot="summary">Virtual Instrument</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/virtual/confirm">confirm []</a>
					</li>
					<li>
						<a href="/docs/virtual/wait">wait [seconds]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[6]}>
			<svelte:fragment slot="summary">New Era Syringe Pump</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/new-era-syringe-pump/pull">pull [address, volume, rate]</a>
					</li>
					<li>
						<a href="/docs/new-era-syringe-pump/push">push [address, volume, rate]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[7]}>
			<svelte:fragment slot="summary">Elvesys</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/elvesys/mux">mux [device_name, initial_state, desired_state]</a>
					</li>
					<li>
						<a href="/docs/elvesys/dist"
							>dist [device_name,initial_set_valve_id, desired_set_valve_id]</a
						>
					</li>
					<li>
						<a href="/docs/elvesys/ob1">ob1 [device_name,channel_to_initialize,pressure_to_set]</a>
					</li>
					<li>
						<a href="/docs/elvesys/density-and-flow">density-and-flow[device_name]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem bind:open={openStates[8]}>
			<svelte:fragment slot="summary">Aurora Valve</svelte:fragment>
			<svelte:fragment slot="content">
				<ol>
					<li>
						<a href="/docs/aurora-valve/switch-to-port"> switch-to-port [port_number]</a>
					</li>
				</ol>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>

	<h3 class="h3">Basics: Steps and Protocols</h3>
	<p>
		a <strong>step</strong> is an action performed by a single <strong>instrument</strong>, usually
		through a single HTTP request. A <strong>protocol</strong> is a table of <strong>steps</strong>
		that are executed sequentially. To view or edit protocol tables, look at the
		<a href="/protocol">protocol page</a>. To understand the layout, look at the example
		<a href="/docs/examples/protocol-table">here</a>. And to run an individual protocol table, go to
		the <a href="/run-protocol">run protocol</a> tab.
	</p>
	<h4 class="h4 my-4">Arg Format</h4>
	<p>
		The <code class="code">Args</code> column is basically processed as a JSON list, with the cell walls
		acting as the externalmost brackets. Format your arguments accordingly, for example using double
		quotes to denote strings.
	</p>
	<h4 class="h4 my-4">Running Protocols</h4>
	<p>
		In addition to being run individually, protocols can be run sequentially or in parallel. This is
		done at the "Run Complex" tab. The format for this sheet is shown below:
	</p>
	<div class="flex justify-center">
		<table class="table" style="width:60vw">
			<tbody>
				<tr>
					<td>protocol_1</td>
					<td>protocol_2</td>
				</tr>
				<tr>
					<td>protocol_3</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p>
		Notice that there are no column headers. Each cell contains a protocol name. Protocols on the
		same row are run in parallel. When all protocols on the row are completed, the runner moves to
		the next row.
	</p>
</div>

<style lang="scss">
	h3 {
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	}
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
