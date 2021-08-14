function currentTime(time = new Date()) {
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
const chartWrapper = document.querySelector('.chat-form-wrapper');
const tmpltsWrp = document.getElementById('messeges-tmpl');
const chart = chartWrapper.querySelector('.bot-chat');
const chartInput = chartWrapper.querySelector('.chat-input');
const chartSendBtn = chartWrapper.querySelector('.input-btn--send');
const allSmilesWrp = chartWrapper.querySelector('.smiles-grid--all');
const memberName = document.querySelector('.avatar-name.hero-avatar').textContent;
let userName = '';
let tree = '';

chartSendBtn.addEventListener('click', prevent);

const plan = {
  q1: 'I need a few pieces of information to get you on your way. What is your name?',
  tree1: {
    q2: '',
    q3: {
      radio1: "I whant A Better Rate",
      radio2: "My Rate is too High",
      radio3: "Just Doing Some Research"
    },
  },
  tree2: {
    q2: '',
    q3: {
      radio1: 'Yes', radio2: 'No'
    },
    g4: {
      radio1: "I haven't started",
      radio2: "I'm still looking"
    },
  },
  final: `${memberName} can help you start your journey here! Have a great day ✋! `,
};

let emojis = [
  "0x1F600",
  "0x1F601",
  "0x1F602",
  "0x1F603",
  "0x1F604",
  "0x1F605",
  "0x1F606",
  "0x1F607",
  "0x1F608",
  "0x1F609",
  "0x1F60A",
  "0x1F60B",
  "0x1F60C",
  "0x1F60D",
  "0x1F60E",
  "0x1F60F",
  "0x1F610",
  "0x1F611",
  "0x1F612",
  "0x1F613",
  "0x1F614",
  "0x1F615",
  "0x1F616",
  "0x1F617",
  "0x1F618",
  "0x1F619",
  "0x1F61A",
  "0x1F61B",
  "0x1F61C",
  "0x1F61D",
  "0x1F61E",
  "0x1F61F",
  "0x1F620",
  "0x1F621",
  "0x1F622",
  "0x1F623",
  "0x1F624",
  "0x1F625",
  "0x1F626",
  "0x1F627",
  "0x1F628",
  "0x1F629",
  "0x1F62A",
  "0x1F62B",
  "0x1F62C",
  "0x1F62D",
  "0x1F62E",
  "0x1F62F",
  "0x1F630",
  "0x1F631",
  "0x1F632",
  "0x1F633",
  "0x1F634",
  "0x1F635",
  "0x1F636",
  "0x1F637",
  "0x1F638",
  "0x1F639",
  "0x1F63A",
  "0x1F63B",
  "0x1F63C",
  "0x1F63D",
  "0x1F63E",
  "0x1F63F",
  "0x1F640",
  "0x1F641",
  "0x1F642",
  "0x1F643",
  "0x1F644",
  "0x1F645",
  "0x1F646",
  "0x1F647",
  "0x1F648",
  "0x1F649",
  "0x1F64A",
  "0x1F64B",
  "0x1F64C",
  "0x1F64D",
  "0x1F64E",
  "0x1F64F"
];


function prevent(e) {
  e.preventDefault();
}
function scrollTo() {
  chart.scrollTop = chart.scrollHeight;
}

function inputClose() {
  chartInput.classList.add('disabled');
  chartInput.parentNode.childNodes.forEach(node => {
    node.addEventListener('click', prevent);
  });
}

function inputOpen() {
  chartInput.classList.remove('disabled');
  chartInput.parentNode.childNodes.forEach(node => {
    node.removeEventListener('click', prevent);
  });
}

function addToChart(el) {
  chart.append(el);
}
function addNewQuestion(text) {
  const questionBoxTmpl = tmpltsWrp.content.cloneNode(true);
  questionBoxTmpl.querySelector('.message-text__question').textContent = text;
  questionBoxTmpl.querySelector('.message-time').textContent = currentTime();
  addToChart(questionBoxTmpl.querySelector('.message-box__question'));
  scrollTo();
  setTimeout(() => {
    chart.querySelector('.message-box__question:not(.show)').classList.add('show');
  }, 2000);
}
function addNewAnswer() {
  if (chartInput.value) {
    const answerBoxTmpl = tmpltsWrp.content.cloneNode(true);
    answerBoxTmpl.querySelector('.message-text__answer').textContent = chartInput.value;
    answerBoxTmpl.querySelector('.message-time').textContent = currentTime();
    addToChart(answerBoxTmpl.querySelector('.message-box__answer'));
    scrollTo();
    chartSendBtn.classList.remove('active');
    chartInput.value = '';
  }
}

function addNewRadioBtns(obj, step) {
  const radioBoxTmpl = tmpltsWrp.content.cloneNode(true).querySelector('.radio-btns-wrapper');
  radioBoxTmpl.querySelector('label').remove();
  Object.keys(obj).forEach((key, i) => {
    const radioBtnTmpl = tmpltsWrp.content.cloneNode(true).querySelector('.radio-btns-wrapper label').cloneNode('true');
    radioBtnTmpl.querySelector('.radio-label').setAttribute('step', step);
    radioBtnTmpl.querySelector('.radio-label').setAttribute('for', obj[`${key}`]);
    radioBtnTmpl.querySelector('.radio-label').textContent = obj[`${key}`];
    radioBtnTmpl.querySelector('input').setAttribute('name', `step-${step}`);
    radioBtnTmpl.querySelector('input').setAttribute('value', obj[`${key}`]);
    radioBoxTmpl.appendChild(radioBtnTmpl);
  });
  addToChart(radioBoxTmpl);
  scrollTo();
}

function inputValueCheck(e) {
  if (e.target.value) {
    chartSendBtn.classList.add('active');
    chartSendBtn.removeEventListener('click', prevent);
    chartSendBtn.addEventListener('click', addNewAnswer);
  }
  else {
    chartSendBtn.classList.remove('active');
    chartSendBtn.addEventListener('click', prevent);
    chartSendBtn.removeEventListener('click', addNewAnswer);
  }
}
function knowName() {
  if (chartInput.value) {
    userName = chartInput.value;
    plan.tree1.q2 = `Hey ${userName}. Why are you thinking about refinancing?`;
    plan.tree2.q2 = `Hey ${userName}. Are you an existing homeowner?`;
    chartSendBtn.removeEventListener('click', knowName);
    setTimeout(() => {
      addNewQuestion(plan[`${tree}`].q2);
      setTimeout(() => {
        addNewRadioBtns(plan[`${tree}`].q3, 2);
      }, 3000);

    }, 2000);

  }
}



emojis.forEach(el => {
  const newLi = allSmilesWrp.querySelector('li').cloneNode(true);
  newLi.querySelector('.smile').textContent = String.fromCodePoint(el);
  allSmilesWrp.appendChild(newLi);
});
document.querySelector('.smiles-wrp').addEventListener('click', (e) => {
  if (e.target.classList.contains('smile')) {
    chartInput.value = `${chartInput.value} ${e.target.textContent}`;
    chartInput.dispatchEvent(new Event('input'));
  }
});

chartWrapper.querySelector('.message-time--first').textContent = currentTime();
chartWrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('radio-label')) {
    e.target.classList.add('active');
    chartWrapper.querySelectorAll(`[step="${e.target.getAttribute('step')}"]`).forEach(btn => {
      if (!btn.classList.contains('active')) {
        btn.parentNode.remove();
      }
      else {
        btn.style.pointerEvents = 'none';
      }
    });
    //tree1
    const labelFor = e.target.getAttribute('for');
    const step = e.target.getAttribute('step');
    if (step === '1') {
      if (labelFor === 'yep') {
        tree = 'tree1';
      }
      else tree = 'tree2';

      addNewQuestion(plan.q1);
      setTimeout(() => {
        inputOpen();
        chartInput.addEventListener('input', inputValueCheck);
        chartSendBtn.addEventListener('click', knowName);
      }, 2000);
    }


  }

});


//send-message



