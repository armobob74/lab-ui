import { executeCustomCommand } from 'spm_fetches.js';

class Step {
	constructor(id, args = {}) {
		this.id = id;
		this.args = args;
	}
}
// SPM
async function spmTransfer(port, from_port, to_port, vol) {}
