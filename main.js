var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
	mode: "clike",
	lineNumbers: true,
});
editor.save()

var interpretationStrat = new CInterpreter();;

var challenges;
$.getJSON("./Challenges.json", (json) => {
	challenges = json;
	$("#challenge-name").text(challenges[0].name);
	$("#challenge-description").text(challenges[0].description);
});

function run() {

	var testCases = challenges[0].testCases;

	var code = editor.getValue();
	for (let i in testCases) {
		var input = testCases[i].input;
		const response = interpretationStrat.run(code, input);
		if (response == testCases[i].output) alert("success");
		else alert("fail");
	}
}