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
		// not quite a pman call but that's ok
		// make a POST request to one of the dlipower endpoints
		return pmanPOST(this.url, [this.button_name, this.on_or_off]);
	}
}

// used to make options for the <select> tag in Protocol table
export let step_names = {
	'SPM Transfer': SPM_Transfer,
	'DLI Power Switch': DLIPowerSwitch
};
