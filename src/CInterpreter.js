var JSCPP = require('JSCPP');

export default class CInterpreter {
	constructor() { }

	run(code, input) {
		var output = "";
		var conf = {
			stdio: {
				write: function (s) {
					output += s;
				}
			}
		};
		try {
			JSCPP.run(code, input, conf);
			return output;
		} catch (error) {
			if (error.includes("ERROR: "))
				return error;
			else return "ERROR:\n" + error;
		}
	}
}