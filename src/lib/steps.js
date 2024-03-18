import { pmanPOST, fetchPOST } from '$lib/general_fetches.js';
class Step {
	constructor(args_list = []) {
		// the list of args required for the step
		// used by the Protocol table
		this.args_list = args_list;

		// used by the runner display
		this.is_active = false;

		// used to create the steps dropdown in the protocol writer
		// all steps that do not match the selected instrument are filtered out
		this.instrument_type = '';

		// used to build action url
		this.base = args_list[0];
	}
	async action() {
		console.log('Please overwrite me, inheritor!');
	}
}

class HamiltonTransfer extends Step {
	constructor(args_list) {
		//args_list format: ['base', 'from_port', 'to_port', 'vol']
		super(args_list);
		this.instrument_type = 'HamiltonPump';
		this.from_port = args_list[1];
		this.to_port = args_list[2];
		this.vol = args_list[3];
		this.url = `${this.base}/pman/transfer`;
		this.url_2 = `${this.base}/pman/listen`;
		this.url_3 = `${this.base}/pman/buffer-is-empty`;
	}
	async bufferIsEmpty() {
		return parseInt(await fetchPOST(this.url_3));
	}
	async listen() {
		// listen until the end of the command buffer
		let args = [];
		if (await this.bufferIsEmpty()) {
			return '';
		}
		let response = await pmanPOST(this.url_2, args);
		while (!(await this.bufferIsEmpty())) {
			response = await pmanPOST(this.url_2, args);
		}
		return response;
	}
	async action() {
		// sends a request to server to begin transfer
		// first response indicates that transfer has started
		let transfer_started_response = await pmanPOST(this.url, [
			this.from_port,
			this.to_port,
			this.vol
		]);
		// now tell server to listen until command buffer is empty
		return this.listen();
	}
}
class SPM_Transfer extends Step {
	constructor(args_list) {
		//args_list format: ['base', 'from_port', 'to_port', 'vol']
		super(args_list);
		this.instrument_type = 'SPM';
		this.from_port = args_list[1];
		this.to_port = args_list[2];
		this.vol = args_list[3];
		this.url = `${this.base}/pman/transfer`;
	}
	async action() {
		// starts the transfer and returns the second response from the SPM
		// second response is the one that says transfer has finished
		// first response is discarded by server
		return pmanPOST(this.url, [this.from_port, this.to_port, this.vol]);
	}
}

class DLIPowerSwitch extends Step {
	constructor(args_list) {
		//args_list format: [base, button_name,on/off]
		super(args_list);
		this.instrument_type = 'DLIPower';
		this.button_name = args_list[1];
		this.on_or_off = args_list[2];
		this.url = `${this.base}/pman/control`;
	}
	async action() {
		return pmanPOST(this.url, [this.button_name, this.on_or_off]);
	}
}

class TuyaSinglePress extends Step {
	constructor(args_list) {
		//args_list format: [base]
		super(args_list);
		this.instrument_type = 'TuyaFingerBot';
		this.url = `${this.base}/pman/single-press`;
	}
	async action() {
		// should press tuya button exactly once
		return pmanPOST(this.url, []);
	}
}

class TuyaDoublePress extends Step {
	constructor(args_list) {
		//args_list format: [base, delay_sec]
		super(args_list);
		this.instrument_type = 'TuyaFingerBot';
		this.delay_sec = args_list[1];
		this.url = `${this.base}/pman/double-press`;
	}
	async action() {
		// should press tuya button once, then
		// wait delay_sec seconds, then
		// press button again
		return pmanPOST(this.url, [this.delay_sec]);
	}
}

class NEPull extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'NewEraPump';
		this.address = args_list[1];
		this.vol = args_list[2];
		this.rate = args_list[3];
		this.url = `${this.base}/pman/pull`;
	}
	async action() {
		// tell the pump to pull
		return pmanPOST(this.url, [this.address, this.vol, this.rate]);
	}
}

class NEPush extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'NewEraPump';
		this.address = args_list[1];
		this.vol = args_list[2];
		this.rate = args_list[3];
		this.url = `${this.base}/pman/push`;
	}
	async action() {
		// tell the pump to push
		return pmanPOST(this.url, [this.address, this.vol, this.rate]);
	}
}

class Wait extends Step {
	constructor(args_list) {
		//args_list format: [base, sec]
		super(args_list);
		this.instrument_type = 'VirtualInstrument';
		this.sec = args_list[1];
		this.url = `N/A`;
	}
	async action() {
		// wait for sec seconds, then resolve
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`Resolved after ${this.sec} seconds`);
			}, this.sec * 1000); // Convert seconds to milliseconds
		});
	}
}

class Confirm extends Step {
	constructor(args_list) {
		//args_list format: [base]
		super(args_list);
		this.instrument_type = 'VirtualInstrument';
		this.url = `N/A`;
	}
	async action() {
		let resume = confirm('continue?');
		if (resume) {
			return;
		} else {
			document.location.reload();
			//set a timeout so it does not immediately resolve before doc refresh
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve('resolved');
				}, 5000);
			});
		}
	}
}

class ElvesysMux extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'Elvesys';
		this.device_name = args_list[1];
		this.initial_state = args_list[2];
		this.desired_state = args_list[3];
		this.url = `${this.base}/pman/mux`;
	}
	async action() {
		return pmanPOST(this.url, [this.device_name, this.initial_state, this.desired_state]);
	}
}
class ElvesysDist extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'Elvesys';
		this.device_name = args_list[1];
		this.initial_set_valve_id = args_list[2];
		this.desired_set_valve_id = args_list[3];
		this.url = `${this.base}/pman/dist`;
	}
	async action() {
		return pmanPOST(this.url, [
			this.device_name,
			this.initial_set_valve_id,
			this.desired_set_valve_id
		]);
	}
}
class ElvesysOB1 extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'Elvesys';
		this.device_name = args_list[1];
		this.channel_to_initialize = args_list[2];
		this.pressure_to_set = args_list[3];
		this.url = `${this.base}/pman/ob1`;
	}
	async action() {
		return pmanPOST(this.url, [this.device_name, this.channel_to_initialize, this.pressure_to_set]);
	}
}
class ElvesysFlowmeter extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'Elvesys';
		this.device_name = args_list[1];
		this.url = `${this.base}/pman/dist/${this.device_name}`;
	}
	async action() {
		// this one's just a GET request
		return fetch(this.url);
	}
}

class AuroraValveSwitchPort extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'AuroraValve';
		this.to_port = args_list[1];
		this.url = `${this.base}/pman/aurora-valve/switch-to-port`;
	}
	async action() {
		return pmanPOST(this.url, [this.to_port]);
	}
}

class AuroraPumpStep extends Step {
	// all inheritors will use AuroraPump's polling function
	// not directly used in UI
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'AuroraPump';
		this.listen_url = `${this.base}/pman/aurora-pump/is-busy`;
	}
	async waitForEnd() {
		let stat = true;
		let response;
		while (stat == true) {
			await new Promise((resolve) => setTimeout(resolve, 500)); // sleep for 0.5 seconds
			response = await pmanPOST(this.listen_url, []);
			response = JSON.parse(response);
			stat = response['status'];
		}
		return null;
	}
}

class AuroraPumpTransfer extends AuroraPumpStep {
	constructor(args_list) {
		super(args_list);
		this.from_port = args_list[1];
		this.to_port = args_list[2];
		this.volume = args_list[3];
		this.url = `${this.base}/pman/aurora-pump/transfer`;
	}
	async action() {
		await pmanPOST(this.url, [this.from_port, this.to_port, this.volume]);
		return this.waitForEnd();
	}
}

class AuroraPumpSwitchPort extends AuroraPumpStep {
	constructor(args_list) {
		super(args_list);
		this.valve_port = args_list[1];
		this.url = `${this.base}/pman/aurora-pump/switch-to-port`;
	}
	async action() {
		await pmanPOST(this.url, [this.valve_port]);
		return this.waitForEnd();
	}
}

class AuroraPumpPull extends AuroraPumpStep {
	constructor(args_list) {
		super(args_list);
		this.volume = args_list[1];
		this.url = `${this.base}/pman/aurora-pump/pull`;
	}
	async action() {
		await pmanPOST(this.url, [this.volume]);
		return this.waitForEnd();
	}
}

class AuroraPumpPush extends AuroraPumpStep {
	constructor(args_list) {
		super(args_list);
		this.volume = args_list[1];
		this.url = `${this.base}/pman/aurora-pump/push`;
	}
	async action() {
		await pmanPOST(this.url, [this.volume]);
		return this.waitForEnd();
	}
}

class AuroraPumpSetVelocity extends AuroraPumpStep {
	constructor(args_list) {
		super(args_list);
		this.velocity = args_list[1];
		this.url = `${this.base}/pman/aurora-pump/set-velocity`;
	}
	async action() {
		await pmanPOST(this.url, [this.velocity]);
		return this.waitForEnd();
	}
}

class DispenseStep extends Step {
	constructor(args_list) {
		super(args_list);
		this.instrument_type = 'SolidDispenser';
		this.url = `${this.base}/dispense`;
	}
	async action() {
		return await pmanPOST(this.url, []);
	}
}
// used to make options for the <select> tag in Protocol table
// later used to create the Step list in the Run page
export let step_names = {
	'SPM Transfer': SPM_Transfer,
	'DLI Power Switch': DLIPowerSwitch,
	'Hamilton Transfer': HamiltonTransfer,
	'Tuya Single Press': TuyaSinglePress,
	'Tuya Double Press': TuyaDoublePress,
	'NE Push': NEPush,
	'NE Pull': NEPull,
	Wait: Wait,
	Confirm: Confirm,
	'Elvesys Mux': ElvesysMux,
	'Elvesys Dist': ElvesysDist,
	'Elvesys OB1': ElvesysOB1,
	'Elvesys Flowmeter': ElvesysFlowmeter,
	'Aurora Switch Port': AuroraValveSwitchPort,
	'Aurora Pump Transfer': AuroraPumpTransfer,
	'Aurora Pump Switch Port': AuroraPumpSwitchPort,
	'Aurora Pump Pull': AuroraPumpPull,
	'Aurora Pump Push': AuroraPumpPush,
	'Aurora Pump Set Velocity': AuroraPumpSetVelocity,
	Dispense: DispenseStep
};
