import { pmanPOST } from '$lib/general_fetches.js';
class Step {
	constructor(args_list = []) {
		// the list of args required for the step
		// used by the Protocol table
		this.args_list = args_list;

		// used by the runner display
		this.is_active = false;
	}
	async action() {
		console.log('Please overwrite me, inheritor!');
	}
}

class HamiltonTransfer extends Step {
	constructor(args_list) {
		//args_list format: ['port', 'from_port', 'to_port', 'vol']
		super(args_list);
		this.port = args_list[0];
		this.from_port = args_list[1];
		this.to_port = args_list[2];
		this.vol = args_list[3];
		this.url = `http://localhost:${this.port}/pman/transfer`;
		this.url_2 = `http://localhost:${this.port}/pman/listen`;
	}
	async action() {
		// sends a request to server to begin transfer
		// first response indicates that transfer has started
		let transfer_started_response = await pmanPOST(this.url, [
			this.from_port,
			this.to_port,
			this.vol
		]);
		// now tell server to listen for the second response,
		// which indicates that the transfer has finished
		return pmanPOST(this.url_2, []);
	}
}
class SPM_Transfer extends Step {
	constructor(args_list) {
		//args_list format: ['port', 'from_port', 'to_port', 'vol']
		super(args_list);
		this.port = args_list[0];
		this.from_port = args_list[1];
		this.to_port = args_list[2];
		this.vol = args_list[3];
		this.url = `http://localhost:${this.port}/pman/transfer`;
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
		//args_list format: [port, button_name,on/off]
		super(args_list);
		this.port = args_list[0];
		this.button_name = args_list[1];
		this.on_or_off = args_list[2];
		this.url = `http://localhost:${this.port}/pman/control`;
	}
	async action() {
		return pmanPOST(this.url, [this.button_name, this.on_or_off]);
	}
}

class TuyaSinglePress extends Step {
	constructor(args_list) {
		//args_list format: [port]
		super(args_list);
		this.port = args_list[0];
		this.url = `http://localhost:${this.port}/pman/single-press`;
	}
	async action() {
		// should press tuya button exactly once
		return pmanPOST(this.url, []);
	}
}

class TuyaDoublePress extends Step {
	constructor(args_list) {
		//args_list format: [port, delay_sec]
		super(args_list);
		this.port = args_list[0];
		this.delay_sec = args_list[1];
		this.url = `http://localhost:${this.port}/pman/double-press`;
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
		this.port = args_list[0];
		this.address = args_list[1];
		this.vol = args_list[2];
		this.rate = args_list[3];
		this.url = `http://localhost:${this.port}/pman/pull`;
	}
	async action() {
		// tell the pump to pull
		return pmanPOST(this.url, [this.address, this.vol, this.rate]);
	}
}

class NEPush extends Step {
	constructor(args_list) {
		super(args_list);
		this.port = args_list[0];
		this.address = args_list[1];
		this.vol = args_list[2];
		this.rate = args_list[3];
		this.url = `http://localhost:${this.port}/pman/push`;
	}
	async action() {
		// tell the pump to push
		return pmanPOST(this.url, [this.address, this.vol, this.rate]);
	}
}

class Wait extends Step {
	constructor(args_list) {
		//args_list format: [sec]
		super(args_list);
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

class Pause extends Step {
	constructor(args_list) {
		//args_list format: [sec]
		super(args_list);
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
		this.port = args_list[0];
		this.serial_port = args_list[1];
		this.initial_state = args_list[2];
		this.desired_state = args_list[3];
		this.url = `http://localhost:${this.port}/pman/mux`;
	}
	async action() {
		return pmanPOST(this.url, [this.serial_port, this.initial_state, this.desired_state]);
	}
}
class ElvesysDist extends Step {
	constructor(args_list) {
		super(args_list);
		this.port = args_list[0];
		this.serial_port = args_list[1];
		this.initial_set_valve_id = args_list[2];
		this.desired_set_valve_id = args_list[3];
		this.url = `http://localhost:${this.port}/pman/dist`;
	}
	async action() {
		return pmanPOST(this.url, [
			this.serial_port,
			this.initial_set_valve_id,
			this.desired_set_valve_id
		]);
	}
}
class ElvesysOB1 extends Step {
	constructor(args_list) {
		super(args_list);
		this.port = args_list[0];
		this.serial_port = args_list[1];
		this.channel_to_initialize = args_list[2];
		this.pressure_to_set = args_list[3];
		this.url = `http://localhost:${this.port}/pman/ob1`;
	}
	async action() {
		return pmanPOST(this.url, [this.serial_port, this.channel_to_initialize, this.pressure_to_set]);
	}
}
class ElvesysFlowmeter extends Step {
	constructor(args_list) {
		super(args_list);
		this.port = args_list[0];
		this.serial_port = args_list[1];
		this.url = `http://localhost:${this.port}/pman/dist/${this.serial_port}`;
	}
	async action() {
		// this one's just a GET request
		return fetch(this.url);
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
	Pause: Pause,
	'Elvesys Mux': ElvesysMux,
	'Elvesys Dist': ElvesysDist,
	'Elvesys OB1': ElvesysOB1,
	'Elvesys Flowmeter': ElvesysFlowmeter
};
