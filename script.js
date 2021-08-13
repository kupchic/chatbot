function currentTime(time = new Date()) {
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
const chartWrapper = document.querySelector('.chat-form-wrapper');
const tmpltsWrp = document.getElementById('messeges-tmpl');
const chart = chartWrapper.querySelector('.bot-chat');
const chartInput = chartWrapper.querySelector('.chat-input');
const chartSendBtn = chartWrapper.querySelector('.input-btn--send');
const allSmilesWrp = chartWrapper.querySelector('.smiles-grid--all')
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

    q4: ''
  },
  tree2: {
    q2: '',
    q3: {
      radio1: 'Yes', radio2: 'No'
    },
    g4: '',
    g5: {
      radio1: "I haven't started",
      radio2: "I'm still looking"
    },
  }
};

let emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
  0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
  0x1F431, 0x1F42A, 0x1F439, 0x1F424];


function prevent(e) {
  e.preventDefault();
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
  chart.querySelector('.message-box__question:not(.show)').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
    const lastMsg = chart.querySelectorAll('.message-text__answer');
    lastMsg[lastMsg.length - 1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    chartSendBtn.classList.remove('active');
    chartInput.value = '';
  }

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
    setTimeout(() => {
      addNewQuestion(plan[`${tree}`].q2);
      chartSendBtn.removeEventListener('click', knowName);
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
    if (e.target.getAttribute('for') === 'yep') {
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

});


//send-message



