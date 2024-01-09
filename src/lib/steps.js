class Step {
	constructor(args_list = []) {
		// the list of args required for the step
		// used by the Protocol table
		this.args_list = args_list;
	}
	async action() {
		console.log('Please overwrite me, inheritor!');
	}
}

class SPM_Transfer extends Step {
	constructor() {
		this.args_list = ['port', 'from_port', 'to_port', 'vol'];
	}
	async action() {
		let url = `http://localhost:${this.port}/pman/transfer`;
		// starts the transfer and returns the second response from the SPM
		// second response is the one that says transfer has finished
		// first response is discarded by server
		return pmanPOST(url, [this.from_port, this.to_port, this.vol]);
	}
}

// used to make options for the <select> tag in Protocol table
export let step_names = {
	'SPM Transfer': SPM_Transfer
};
