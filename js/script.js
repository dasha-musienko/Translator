const inputSelectBtnEl = document.querySelectorAll(".select-btn")[0];
const outputSelectBtnEl = document.querySelectorAll(".select-btn")[1];
const inputOptionsList = document.querySelector(".input .options");
const outputOptionsList = document.querySelector(".output .options");
let addedInputLanguage = [];
let addedOutputLanguage = [];
let inputSelectedLang = document.querySelector(".input .selected-lang");
let outputSelectedLang = document.querySelector(".output .selected-lang")
const inputTextArea = document.querySelector("#input-textearea")
const outputTextArea = document.querySelector("#output-textearea")
const countEl = document.querySelector(".count");

inputSelectBtnEl.addEventListener("click", inputSelectBtnElClickHandler)
outputSelectBtnEl.addEventListener("click", outputSelectBtnElClickHandler)
document.addEventListener("click", selectLangHandler)
inputTextArea.addEventListener('input', inputHandler)


populatesLanguages(inputOptionsList, languages)
populatesLanguages(outputOptionsList, languages)

function inputHandler (evt) {
  translate()
  countEl.textContent = evt.currentTarget.value.length
}

function selectLangHandler (evt) {
  if(evt.target.closest(".input")) {
    if (!evt.target.closest(".option")) {
      return
    }
    
    if (addedInputLanguage.length > 0) {
      addedInputLanguage[0].classList.remove("active");
    }
    addedInputLanguage.length = 0;
    addedInputLanguage.push(evt.target.closest(".option"));
    addedInputLanguage[0].classList.add("active");

    inputSelectedLang.textContent = addedInputLanguage[0].textContent;
  }

  if(evt.target.closest(".output")) {
    if (!evt.target.closest(".option")) {
      return
    }
    
    if (addedOutputLanguage.length > 0) {
      addedOutputLanguage[0].classList.remove("active");
    }
    addedOutputLanguage.length = 0;
    addedOutputLanguage.push(evt.target.closest(".option"));
    addedOutputLanguage[0].classList.add("active");
  }

  outputSelectedLang.textContent = addedOutputLanguage[0].textContent;

  translate()
}

function inputSelectBtnElClickHandler () {
  inputOptionsList.classList.toggle("active")
}



function outputSelectBtnElClickHandler () {
  outputOptionsList.classList.toggle("active")
}


function populatesLanguages (el, options) {
  options.forEach(({no, name, native, code}, idx) => {
    
    let li = `
    <li class="option" data-value="${code}">${name} (${native})</li>
    `
    if (idx === 0 && el.classList.contains("input")) {
      li = `
       <li class="option active" data-value="${code}">${name} (${native})</li>
     `
     }

     if (idx === 16 && el.classList.contains("output")) {
      li = `
       <li class="option active" data-value="${code}">${name} (${native})</li>
     `
     }
    el.insertAdjacentHTML("beforeend", li)
  })


  if (el.classList.contains("input")) {
    addedInputLanguage.push(inputOptionsList.firstElementChild);
    inputSelectedLang.textContent = inputOptionsList.firstElementChild.textContent
   }

   if (el.classList.contains("output")) {
    addedOutputLanguage.push(document.querySelector(".output.options .active"));
    outputSelectedLang.textContent = document.querySelector(".output.options .active").textContent
   }

}


function translate() {
  const inputText = inputTextArea.value;
  const inputLanguage = addedInputLanguage[0].dataset.value;
  const outputLanguage = addedOutputLanguage[0].dataset.value;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
    inputText
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      outputTextArea.value = json[0].map((item) => item[0]).join("");
    })
    .catch((error) => {
      console.log(error);
    });
}