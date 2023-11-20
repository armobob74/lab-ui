let statusDict = {
	'@': 'No Error',
	'`': 'No Error',
	0: 'No Error',
	a: 'Initialization',
	1: 'Initialization',
	b: 'Invalid command',
	2: 'Invalid command',
	c: 'Invalid operand',
	3: 'Invalid operand',
	d: 'Missing trailing [R]',
	4: 'Missing trailing [R]',
	g: 'Device not initialized',
	7: 'Device not initialized',
	h: 'Internal failure (valve)',
	8: 'Internal failure (valve)',
	i: 'Plunger overload',
	9: 'Plunger overload',
	j: 'Valve overload',
	10: 'Valve overload',
	k: 'Plunger move not allowed',
	11: 'Plunger move not allowed',
	l: 'Internal failure (plunger)',
	12: 'Internal failure (plunger)',
	n: 'A/D converter failure',
	14: 'A/D converter failure',
	o: 'Command overflow',
	15: 'Command overflow'
};

async function executeCustomCommand(port, command_str) {
	let data = { cmd: command_str };
	let endpoint = `http://localhost:${port}/pman/custom-string`;

	try {
		let response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		if (error.name === 'TypeError' && error.message.includes('fetch')) {
			console.log(`SPM connection error or CORS issue on ${port}`);
			// Handle the specific error, e.g., set a flag, notify the user, etc.
		} else {
			console.log('Error fetching data:', error.message);
		}
		// Return a specific error object or null
		return null;
	}
}
