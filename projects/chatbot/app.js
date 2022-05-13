var trigger = [
  //0
  ["link"],
  ["send me another pic"],
  ["send me another picture"],
  ["send another pic"],
  ["send another picture"],
  ["what are you looking for"],
  ["what are u looking for"],
  ["what r u looking for"],
  ["where are you"],
  ["where r you"],
];

var keepAlives = [
  "?",
  "??",
  "???",
  "You get my last message??????",
  "Hallo???????????",
];

var alternative = [
  "Same",
  "Go on...",
  "Try again",
  "I'm listening...",
  "Bro...",
];

var chatScript = `{Hello|Hii|Hiya|hey|Heyy} {Mikah|Darron|Kyle|Miles|Marjan} {its|it's} {Jen|Jenn|Jennifer} we {hung out|met} {on that cruise|at John and Krista's wedding|Kristy's and Alex's engagement} {last year?|in December?} {I am|I'm} here {visiting friends|in town} in %city% so I {thought|figured} {I would|I'd} {msg|message} {u|you} lol {r u|are u} {there|around}?? {Here is|Heres} my {Picc|picture|pic} {if|in case} {you|u} {dpn't remember|dont remember|forgot} {lol|haha|hahhaa} %p1
{Huh..|Wait} {r u|are you} just {confusing|messing} with me{?|??} {haha I'm sooo embarrassed|Wow.|ahhhh lol|Hmm.} {I guess|Guessing} I  {jotted|wrote} down or he {tricked me with|gave me} the wrong {number|num|numbr} haha what a {dick|dooche|dooche|jerk|sh!tface}! Well I already {shared|told you} my name, {I am|I'm} 21{yo| years old},  {what is|what's} {ur|your} name{??|?}{:)|=D}
{ok|Hmm} that's {for sure|definitely} not {the same name|the name he gave me} haha.  {Hold on|Wait} so you're not messing with me right?? lol`;

var reply = [
  //0
  ["Here it is again babe its %r"],
  [
    "Well lol were all the ones I had on the fish not good enough? Maybe you can just see more in person",
  ],
  [
    "Well lol were all the ones I had on the fish not good enough? Maybe you can just see more in person",
  ],
  [
    "Well lol were all the ones I had on the fish not good enough? Maybe you can just see more in person",
  ],
];

var blockKeywords = [
  ["fu"],
  ["I'm a kid"],
  ["im underage"],
  ["i'm underage"],
  ["reporting you"],
];

var dotsAndSmileys = [
  ":)  ",
  " =D  ",
  ":p ",
  "ツ ",
  "ت  ",
  "...",
  ".....",
  " .. ",
];

var dotAndSmiley =
  dotsAndSmileys[[Math.floor(Math.random() * dotsAndSmileys.length)]];

var scriptIndex = 0;

var text = "";
var lastBuddyChat = "";
var lastBotChat = "";
i = 0;
var chatScript2;
const scriptButton = document.getElementById("tokenTested");
const tokenTestedText = document.getElementById("tokenTestedText");
const submitBtn = document.getElementById("submit");
const log = document.getElementById("textArea");
const input = document.getElementById("im_input");
const botInput = document.getElementById("botInput");
const chatScriptArea = document.getElementById("chatScriptArea");

const newP = document.getElementById("newP");

var oldscrollHeight = log.scrollHeight;
var oldBotScrollHeight = botInput.scrollHeight;
input.focus();

// ================================
// Create  Array Elements
// =================================
let str = chatScript.split(/\r?\n/);

for (let i = 0; i < str.length; i++) {
  const newSpanDiv = document.createElement("div");
  const newDashSpan = document.createElement("span");
  const newSpan = document.createElement("span");
  newDashSpan.textContent = `${i + 1}-`;
  newSpan.textContent = `${str[i]}`;

  newDashSpan.classList.add(`dashSpan`);
  newSpanDiv.appendChild(newDashSpan);
  newSpanDiv.appendChild(newSpan);
  newSpan.classList.add(`newSpan`);
  newSpanDiv.classList.add(`scriptDiv`);
  chatScriptArea.appendChild(newSpanDiv);
}

function startListeners() {
  input.addEventListener("keypress", function (e) {
    var key = e.which || e.keyCode || 13;
    if (key === 13) {
      startChat();
    }
  });
  submitBtn.addEventListener("click", function (e) {
    console.log("Key press registered");

    startChat();
  });

  scriptButton.addEventListener("click", function (e) {
    console.log("Key press registered");
    tokenTester();
    tokenTestedText.textContent = chatScript2;
    input.focus();
  });
}
startListeners();

function startChat() {
  console.log("pressed ENTER!");
  text = input.value;
  if (text == "") {
    console.log(
      "Warning: Input is empty, you must type something to start chat"
    );
    const newSpan = document.createElement("span");

    const content = document.createTextNode(`System: `);
    const innerSpan = document.createElement("span");
    const innerContent = document.createTextNode(
      "Input text is empty - please type something."
    );
    input.value = "";
    newSpan.classList.add("system");
    innerSpan.classList.add("textOutput");
    newSpan.appendChild(content);
    innerSpan.appendChild(innerContent);

    newSpan.appendChild(innerSpan);
    log.appendChild(newSpan);
    var newscrollHeight = log.scrollHeight; //Scroll height after the request
    if (newscrollHeight > oldscrollHeight) {
      log.scroll(0, newscrollHeight); //Autoscroll to bottom of div
    }
    return;
  }
  if (chatScript.split(/\r?\n/)[scriptIndex] == undefined) {
    console.log("Warning: end of chatScript! Resetting script index.");
    const newSpan = document.createElement("span");

    const content = document.createTextNode(`System: `);
    const innerSpan = document.createElement("span");
    const innerContent = document.createTextNode(
      "End of chatScript! Resetting script index."
    );
    input.value = "";
    scriptIndex = 0;
    newSpan.classList.add("system");
    innerSpan.classList.add("textOutput");
    newSpan.appendChild(content);
    innerSpan.appendChild(innerContent);

    newSpan.appendChild(innerSpan);
    log.appendChild(newSpan);
    var newscrollHeight = log.scrollHeight; //Scroll height after the request
    if (newscrollHeight > oldscrollHeight) {
      log.scroll(0, newscrollHeight); //Autoscroll to bottom of div
    }
    return;
  }
  submitBtn.disabled = true;
  input.disabled = true;
  output(text);

  var newscrollHeight = log.scrollHeight; //Scroll height after the request
  if (newscrollHeight > oldscrollHeight) {
    log.scroll(0, newscrollHeight); //Autoscroll to bottom of div
  }
}

function tokenTester() {
  chatScript2 = chatScript;
  var regExp = /{\w{0,}.*?}/;

  let resultIndex;
  while ((resultIndex = regExp.exec(chatScript2))) {
    resultIndex = chatScript2.match(regExp);
    resultIndex = resultIndex.toString();
    resultIndex = resultIndex.split(`|`);
    resultIndex = resultIndex[Math.floor(Math.random() * resultIndex.length)];
    resultIndex = resultIndex.replace("{", "");
    resultIndex = resultIndex.replace("}", "");
    chatScript2 = chatScript2.replace(regExp, resultIndex.toString());
  }
  console.log(chatScript2);
}

function output(text) {
  console.log("STARTING OUTPUT(TEXT)");
  tokenTester();
  let splitLines = (chatScript2) => chatScript2.split(/\r?\n/);
  let lastBuddyTime;
  let lastBotTime;
  let keepAlivesLine =
    keepAlives[Math.floor(Math.random() * keepAlives.length)];

  let product = "";
  text = text.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "");

  // Compare Block
  if (compare(blockKeywords, trigger, reply)) {
    console.log("first part compare function done");

    return product;
  }
}
function compare(blockKeywordsArray, triggerArray, replyArray) {
  let item;
  let splitLines = (chatScript2) => chatScript2.split(/\r?\n/);
  for (let w = 0; w < blockKeywordsArray.length; w++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (blockKeywordsArray[w] == text.split(" ")[y]) {
        item = blockKeywordsArray[w];
        const newSystemSpan = document.createElement("span");
        const newSystemContentSpan = document.createElement("span");
        const newSystemNode = document.createTextNode(`System: `);

        const newSystemContentNode = document.createTextNode(
          `You used restricted keyword: '${item}'`
        );

        newSystemSpan.classList.add("system");
        newSystemContentSpan.classList.add("textOutput");
        newSystemContentSpan.appendChild(newSystemContentNode);
        newSystemSpan.appendChild(newSystemNode);
        newSystemSpan.appendChild(newSystemContentSpan);
        input.value = "";
        log.appendChild(newSystemSpan);
        console.log(`blockKeyword matched...Blocked word is:  "${item}"`);
        text = text.replace(blockKeywordsArray[w], "***");
        console.log(text);
        const newSpan = document.createElement("span");
        const content = document.createTextNode("Human: ");
        const innerSpan = document.createElement("span");

        const innerContent = document.createTextNode(text);
        newSpan.classList.add("human");
        newSpan.appendChild(content);
        innerSpan.appendChild(innerContent);
        innerSpan.classList.add("textOutput");
        newSpan.appendChild(innerSpan);

        log.appendChild(newSpan);
        input.disabled = false;
        submitBtn.disabled = false;
        return;
      } else {
        const newSpan = document.createElement("span");
        const content = document.createTextNode("Human: ");
        const innerSpan = document.createElement("span");

        const innerContent = document.createTextNode(text);
        newSpan.classList.add("human");
        newSpan.appendChild(content);
        innerSpan.appendChild(innerContent);
        innerSpan.classList.add("textOutput");
        newSpan.appendChild(innerSpan);
        input.value = "";
        log.appendChild(newSpan);

        for (let x = 0; x < triggerArray.length; x++) {
          for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x] == text) {
              product = `${replyArray[y]} ${dotAndSmiley}${
                splitLines(chatScript2)[scriptIndex]
              }`;
            } else {
              product = `${splitLines(chatScript2)[scriptIndex]}`;
            }
            return addChat(product);
          }
        }
      }

      return;
    }
  }

  function addChat(product) {
    var outputText = product;

    var l = outputText.length;
    var current = 0;
    var time = -1;

    var write_text = function () {
      //input text event

      botInput.textContent += outputText[current];
      if (current < l - 1) {
        current++;
        setTimeout(function () {
          write_text();
        }, time);
      } else {
        input.setAttribute("value", input.value);
      }
    };
    setTimeout(function () {
      write_text();
    }, time);
    setTimeout(clearChat, 3000);
  }
}

function clearChat() {
  const span = document.createElement("span");
  const innerSpan = document.createElement("span");
  const content = document.createTextNode("ChatBot: ");
  const innerContent = document.createTextNode(botInput.textContent);
  span.appendChild(content);
  innerSpan.appendChild(innerContent);
  span.appendChild(innerSpan);
  span.classList.add("chatBot");
  innerSpan.classList.add("textOutput");
  console.log("Starting clearChat");
  log.appendChild(span);
  botInput.textContent = "";

  scriptIndex++;
  console.log("scriptIndex++, current index:", scriptIndex);
  var newscrollHeight = log.scrollHeight;
  var newBotScrollHeight = botInput.scrollHeight; //Scroll height after the request
  if (newscrollHeight > oldscrollHeight) {
    log.scroll(0, newscrollHeight); //Autoscroll to bottom of div
  }
  if (newBotScrollHeight > oldBotScrollHeight) {
    botInput.scroll(0, newscrollHeight);
  }
  input.disabled = false;
  submitBtn.disabled = false;
  input.focus();
}
