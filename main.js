var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
	mode: "clike",
	lineNumbers: true,
});
editor.save()

var interpretationStrat = new CInterpreter();;

var challenges;
$.getJSON("./Challenges.json", (json) => {
	challenges = json;
	$("#challenge-name").text("Challenge 1: " + challenges[0].name);
	$("#challenge-description").text(challenges[0].description);
});

function run() {

	var code = editor.getValue();
	var cases = challenges[0].testCases;
	for (let i in cases) {
		var input = cases[i].input;
		const response = interpretationStrat.run(code, input);
		if (response == cases[i].output) alert("success");
		else alert("fail");
	}
}