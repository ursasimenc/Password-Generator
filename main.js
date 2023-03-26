let root = document.querySelector(":root");
root = getComputedStyle(root);
const yellow = root.getPropertyValue("--yellow");
const green = root.getPropertyValue("--green");
const orange = root.getPropertyValue("--orange");
const red = root.getPropertyValue("--red");
const lengthNumber = document.querySelector(".length_number");
const lengthRange = document.querySelector("#password_length");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const button = document.querySelector("button");
const passwordDiv = document.querySelector(".password");
const passwordDesc = document.querySelector(".pass_strength_desc");
const bars = document.querySelectorAll(".pass_strength_bar");
const copy = document.querySelector(".copy_img");
const copyText = document.querySelector(".pass_copied_text");

function setStrength() {
	const length = lengthRange.value;
	let strength = 0;

	length >= 8 ? (strength += 1) : (strength += 0);
	length >= 12 ? (strength += 1) : (strength += 0);
	length >= 16 ? (strength += 1) : (strength += 0);
	uppercase.checked ? (strength += 1) : (strength += 0);
	lowercase.checked ? (strength += 1) : (strength += 0);
	numbers.checked ? (strength += 1) : (strength += 0);
	symbols.checked ? (strength += 1) : (strength += 0);

	switch (strength) {
		case 1:
			passwordDesc.textContent = "too weak";
			bars.forEach((bar) => {
				bar.style.backgroundColor = red;

				if (bar.attributes.id.value === "2" || bar.attributes.id.value === "3" || bar.attributes.id.value === "4") {
					bar.style.backgroundColor = "transparent";
				}
			});
			break;
		case 2:
			passwordDesc.textContent = "weak";
			bars.forEach((bar) => {
				bar.style.backgroundColor = orange;

				if (bar.attributes.id.value === "3" || bar.attributes.id.value === "4") {
					bar.style.backgroundColor = "transparent";
				}
			});
			break;
		case 3:
			passwordDesc.textContent = "medium";
			bars.forEach((bar) => {
				bar.style.backgroundColor = yellow;

				if (bar.attributes.id.value === "4") {
					bar.style.backgroundColor = "transparent";
				}
			});

			break;
		case 4:
			passwordDesc.textContent = "medium";
			bars.forEach((bar) => {
				bar.style.backgroundColor = yellow;

				if (bar.attributes.id.value === "4") {
					bar.style.backgroundColor = "transparent";
				}
			});

			break;
		case 5:
			passwordDesc.textContent = "strong";
			bars.forEach((bar) => {
				bar.style.backgroundColor = green;
			});
			break;
		case 6:
			passwordDesc.textContent = "strong";
			bars.forEach((bar) => {
				bar.style.backgroundColor = green;
			});
			break;
		default:
			break;
	}
}

function generatePassword() {
	const uppercaseArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercaseArray = "abcdefghijklmnopqrstuvwxyz";
	const numbersArray = "0123456789";
	const symbolsArray = "!@#$%^&*()_+";
	const length = lengthRange.value;
	const upper = uppercase.checked;
	const lower = lowercase.checked;
	const number = numbers.checked;
	const symbol = symbols.checked;
	let password = "";
	let divide = 0;
	let result;
	let remaining;
	let random;
	let amount;

	copyText.style.display = "none";

	if (!upper && !lower && !number && !symbol) {
		alert("Please select at least one option");
		return;
	}

	upper ? (divide += 1) : (divide += 0);
	lower ? (divide += 1) : (divide += 0);
	number ? (divide += 1) : (divide += 0);
	symbol ? (divide += 1) : (divide += 0);

	amount = Math.floor(length / divide);
	result = Math.floor(length / divide) * divide;
	remaining = length - result;

	if (upper) {
		for (let i = 0; i < amount; i++) {
			random = Math.floor(Math.random() * uppercaseArray.length);
			password += uppercaseArray.slice(random, random + 1);
		}

		for (let i = 0; i < remaining; i++) {
			random = Math.floor(Math.random() * uppercaseArray.length);
			password += uppercaseArray.slice(random, random + 1);
		}
		remaining = 0;
	}

	if (lower) {
		for (let i = 0; i < amount; i++) {
			random = Math.floor(Math.random() * lowercaseArray.length);
			password += lowercaseArray.slice(random, random + 1);
		}

		for (let i = 0; i < remaining; i++) {
			random = Math.floor(Math.random() * lowercaseArray.length);
			password += lowercaseArray.slice(random, random + 1);
		}
		remaining = 0;
	}

	if (number) {
		for (let i = 0; i < amount; i++) {
			random = Math.floor(Math.random() * numbersArray.length);
			password += numbersArray.slice(random, random + 1);
		}

		for (let i = 0; i < remaining; i++) {
			random = Math.floor(Math.random() * numbersArray.length);
			password += numbersArray.slice(random, random + 1);
		}
		remaining = 0;
	}

	if (symbol) {
		for (let i = 0; i < amount; i++) {
			random = Math.floor(Math.random() * symbolsArray.length);
			password += symbolsArray.slice(random, random + 1);
		}

		for (let i = 0; i < remaining; i++) {
			random = Math.floor(Math.random() * symbolsArray.length);
			password += symbolsArray.slice(random, random + 1);
		}
		remaining = 0;
	}

	let passwordArray = password.split("").map((char) => {
		return char;
	});

	passwordArray
		.sort(() => {
			return 0.5 - Math.random();
		})
		.join("");

	password = passwordArray.join("");
	passwordDiv.textContent = password;
}

lengthRange.addEventListener("input", function (e) {
	lengthNumber.textContent = e.target.value;
	setStrength();
});

uppercase.addEventListener("change", function () {
	setStrength();
});

lowercase.addEventListener("change", function () {
	setStrength();
});

numbers.addEventListener("change", function () {
	setStrength();
});

symbols.addEventListener("change", function () {
	setStrength();
});

button.addEventListener("click", generatePassword);

copy.addEventListener("click", function () {
	if (!passwordDiv.textContent) {
		alert("Please generate a password first");
		return;
	}
	const range = document.createRange();
	range.selectNode(passwordDiv);
	window, getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
	copyText.style.display = "block";
});
