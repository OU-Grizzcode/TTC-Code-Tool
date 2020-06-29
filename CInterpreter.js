class CInterpreter extends InterpretationStrategy {
	constructor() { super(); }

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
			var exitCode = JSCPP.run(code, input, conf);
			return output;
		} catch (error) {
			return error;
		}
	}
}