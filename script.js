let current = 1;
const total = 15;
const correctAnswers = {
  q1: 'a', q2: 'c', q3: 'a', q4: 'c', q5: 'b',
  q6: 'a', q7: 'c', q8: 'c', q9: 'c', q10: 'b',
  q11: 'a', q12: 'c', q13: 'a', q14: 'b', q15: 'a'
};

function update() {
  for (let i = 1; i <= total; i++) {
    document.getElementById('q' + i).classList.remove('active');
  }
  if (current <= total) {
    document.getElementById('q' + current).classList.add('active');
  }
  document.getElementById('prevBtn').disabled = current === 1;
  document.getElementById('nextBtn').style.display = current === total ? 'none' : 'inline-block';
  document.getElementById('submitBtn').style.display = current === total ? 'inline-block' : 'none';
  const progress = (current / total) * 100;
  document.getElementById('progressBar').style.width = `${progress}%`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
  if (current < total) {
    current++;
    update();
  }
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (current > 1) {
    current--;
    update();
  }
});

document.getElementById('submitBtn').addEventListener('click', submitQuiz);

document.getElementById('restartBtn').addEventListener('click', function () {
  current = 1;
  for (let i = 1; i <= total; i++) {
    const options = document.querySelectorAll(`input[name="q${i}"]`);
    options.forEach(opt => opt.checked = false);
  }
  document.getElementById('questions-container').style.display = 'block';
  document.getElementById('result').style.display = 'none';
  document.getElementById('restartBtn').style.display = 'none';
  document.getElementById('prevBtn').style.display = 'inline-block';
  document.getElementById('nextBtn').style.display = 'inline-block';
  document.getElementById('msgPerfect').style.display = 'none';
  document.getElementById('msgNone').style.display = 'none';
  document.getElementById('msgMid').style.display = 'none';
  document.getElementById('scoreValue').textContent = '';

  update();
});


function submitQuiz() {
  for (let i = 1; i <= total; i++) {
    const answered = document.querySelector(`input[name="q${i}"]:checked`);
    if (!answered) {
      alert("Please answer all questions before submitting!");
      current = i;
      update();
      return;
    }
  }

  let score = 0;
  for (let i = 1; i <= total; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === correctAnswers['q' + i]) {
      score++;
    }
  }

  document.getElementById('questions-container').style.display = 'none';
  document.getElementById('prevBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('submitBtn').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('restartBtn').style.display = 'inline-block';

  document.querySelectorAll('.res-message').forEach(el => el.style.display = 'none');

  if (score === total) {
    document.getElementById('msgPerfect').style.display = 'block';
    launchConfetti();
  } else if (score === 0) {
    document.getElementById('msgNone').style.display = 'block';
  } else {
    document.getElementById('msgMid').style.display = 'block';
    document.getElementById('scoreValue').textContent = score;
  }
}

function launchConfetti() {
  const myConfetti = confetti.create(document.getElementById('confetti-canvas'), {
    resize: true,
    useWorker: true
  });

  myConfetti({ particleCount: 100, spread: 100, origin: { x: 0.5, y: 0.5 } });
  myConfetti({ particleCount: 80, spread: 80, origin: { x: 0.2, y: 0.8 } });
  myConfetti({ particleCount: 80, spread: 80, origin: { x: 0.8, y: 0.3 } });
}

update();
