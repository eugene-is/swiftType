const input = document.querySelector("input");
const letters = Array.from(document.querySelectorAll("[data-letters]"));
const specs = Array.from(document.querySelectorAll("[data-spec]"));
const textExample = document.querySelector("#textExample");
const symbolsPerMinute = document.querySelector("#symbolsPerMinute");
const worldsPerMinute = document.querySelector('#worldsPerMinute')
const timeSession = document.querySelector('#timeSession');
const errorPercent = document.querySelector("#errorPercent");

const text = `Земля - это третья планета от Солнца и единственная известная планета, на которой есть жизнь. Земля находится внутри экзосферы, которая состоит из различных слоев: литосферы, гидросферы, атмосферы и биосферы. Литосфера - это твердый внешний слой Земли, который состоит из плит, движущихся на мантийном пласте. Гидросфера - это водная оболочка Земли, включающая в себя океаны, моря, реки, озера и подземные воды. Атмосфера - это газовая оболочка Земли, состоящая в основном из азота и кислорода, а также содержащая водяной пар, углекислый газ и другие газы. Биосфера - это слой Земли, на котором существует жизнь, включая растения, животн.`;

const party = createParty(text);
init();

function init() {
	input.addEventListener("keydown", keydownHandler);
	input.addEventListener("keyup", keyupHandler);

	viewUpdate();
}

function keydownHandler(event) {
	event.preventDefault();

	const letter = letters.find((x) => x.dataset.letters.includes(event.key));

	if (letter) {
		letter.classList.add("pressed");
		press(event.key);
		return;
	}

	let key = event.key.toLowerCase();

	if (key === 'escape'){
		press('escape');
	}

	if (key === " ") {
		key = "space";
		press(" ");
	}

	if (key === "enter") {
		press("\n");
	}

	const ownSpecs = specs.filter((x) => x.dataset.spec === key);

	if (ownSpecs.length) {
		ownSpecs.forEach((spec) => spec.classList.add("pressed"));
		return;
	}
	console.warn("Не известный вид клавиши.", event);
}

function keyupHandler(event) {
	event.preventDefault();

	const letter = letters.find((x) => x.dataset.letters.includes(event.key));

	if (letter) {
		letter.classList.remove("pressed");

		return;
	}

	let key = event.key.toLowerCase();

	if (key === " ") {
		key = "space";
	}

	const ownSpecs = specs.filter((x) => x.dataset.spec === key);

	if (ownSpecs.length) {
		ownSpecs.forEach((spec) => spec.classList.remove("pressed"));
		return;
	}
}

function createParty(text) {
	const party = {
		text,
		strings: [],
		maxStringLength: 70,
		maxShowStrings: 3,
		currentStringIndex: 0,
		currentPressedIndex: 0,
		errors: [],
		started: false,

		statisticFlag: false,
		timerCounter: 0,
		startTimer: 0,
		wordCounter: 0,
		errorCounter: 0,
		commonCounter: 0,
	};

	party.text = party.text.replace(/\n/g, "\n ");
	const words = party.text.split(" ");
	let string = [];
	for (const word of words) {
		const newStringLength =
			[...string, word].join(" ").length + !word.includes("\n");

		if (newStringLength > party.maxStringLength) {
			party.strings.push(string.join(" ") + " ");
			string = [];
		}

		string.push(word);

		if (word.includes("\n")) {
			party.strings.push(string.join(" "));
			string = [];
		}
	}

	if (string.length) {
		party.strings.push(string.join(" "));
	}

	return party;
}

function press(letter) {
	party.started = true;

	if (!party.statisticFlag) {
		party.wordCounter = 0;
		party.commonCounter = 0;
		party.statisticFlag = true;
		party.startTimer = Date.now();
	}

	if(letter === ' '){
		party.wordCounter++;
	}


	if(letter === 'escape'){
		party.statisticFlag = false;
		party.timerCounter = Date.now() - party.startTimer;
	}
	const string = party.strings[party.currentStringIndex];
	const mustLetter = string[party.currentPressedIndex];
	
	if (letter === mustLetter) {
		party.currentPressedIndex++;
		if (string.length <= party.currentPressedIndex) {
			party.currentPressedIndex = 0;
			party.currentStringIndex++;
		}
	} else if (!party.errors.includes(mustLetter)) {
		party.errors.push(mustLetter);
		party.errorCounter++;
	}

	party.commonCounter++;
	input.classList.remove('inputError');
	viewUpdate();
}

function viewUpdate() {
	const string = party.strings[party.currentStringIndex];

	const showedStrings = party.strings.slice(
		party.currentStringIndex,
		party.currentStringIndex + party.maxShowStrings
	);

	const div = document.createElement("div");

	const firstLine = document.createElement("div");
	firstLine.classList.add("line");
	div.append(firstLine);

	const done = document.createElement("span");
	done.classList.add("done");
	done.textContent = string.slice(0, party.currentPressedIndex);
	firstLine.append(
		done,
		...string
			.slice(party.currentPressedIndex)
			.split("")
			.map((letter) => {
				if (letter === " ") {
					return "·";
				}

				if (letter === "\n") {
					return "¶";
				}

				if (party.errors.includes(letter)) {
					input.classList.add('inputError');
					const errorSpan = document.createElement("span");
					errorSpan.classList.add("hint");
					errorSpan.textContent = letter;
					return errorSpan;
				}
				party.errors = [];

				return letter;
			})
	);

	for (let i = 1; i < showedStrings.length; i++) {
		const line = document.createElement("div");
		line.classList.add("line");
		div.append(line);

		line.append(
			...showedStrings[i].split("").map((letter) => {
				if (letter === " ") {
					return "·";
				}

				if (letter === "\n") {
					return "¶";
				}

				if (party.errors.includes(letter)) {
					input.classList.add('inputError');
					const errorSpan = document.createElement("span");
					errorSpan.classList.add("hint");
					errorSpan.textContent = letter;
					return errorSpan;
				}
				party.errors = [];

				return letter;
			})
		);
	}

	textExample.innerHTML = "";
	textExample.append(div);

	input.value = string.slice(0, party.currentPressedIndex);

	if (!party.statisticFlag && party.started) {
		party.commonCounter--;
		party.errorCounter--;
		symbolsPerMinute.textContent = Math.round((60000 * party.commonCounter) / party.timerCounter);
		worldsPerMinute.textContent = Math.round((60000 * party.wordCounter) / party.timerCounter);
		timeSession.textContent = Math.round(party.timerCounter / 1000) + 'с';
		errorPercent.textContent = Math.floor((party.errorCounter / party.commonCounter) * 100) + '%';
	}
}