// ========================================
// English Quiz Application
// ========================================

class QuizApp {
    constructor() {
        this.currentMode = 'practice'; // practice or exam
        this.questions = [];
        this.currentIndex = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.skippedCount = 0;
        this.selectedAnswer = null;
        this.answered = false;
        this.wrongQuestions = [];
        this.questionCount = 20;
        this.userAnswers = []; // 考试模式记录所有答案
        this.timer = null;
        this.timeRemaining = 0;
        this.currentWordBank = []; // 当前填空题的词库

        this.init();
    }

    init() {
        this.initParticles();
        this.bindEvents();
        this.updateStats();
    }

    // 创建粒子背景效果
    initParticles() {
        const container = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 20}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.width = `${2 + Math.random() * 4}px`;
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    }

    // 绑定事件
    bindEvents() {
        // 开始按钮
        document.getElementById('startBtn').addEventListener('click', () => this.startQuiz());

        // 导航链接
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setMode(e.target.dataset.mode);
            });
        });

        // 题目数量选择
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.questionCount = e.target.dataset.count;
            });
        });

        // 下一题按钮
        document.getElementById('nextBtn').addEventListener('click', () => this.nextQuestion());

        // 跳过按钮
        document.getElementById('skipBtn').addEventListener('click', () => this.skipQuestion());

        // 重新开始按钮
        document.getElementById('restartBtn').addEventListener('click', () => this.restart());

        // 查看错题按钮
        document.getElementById('reviewBtn').addEventListener('click', () => this.showReview());

        // 关闭错题回顾（顶部返回按钮）
        document.getElementById('closeReviewBtn').addEventListener('click', () => this.hideReview());

        // 底部返回按钮
        document.getElementById('backToResultBtn').addEventListener('click', () => this.hideReview());

        // 填空题确认按钮
        document.getElementById('submitAnswerBtn').addEventListener('click', () => this.submitFillBlankAnswer());

        // 填空题输入框回车提交
        document.getElementById('fillBlankInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitFillBlankAnswer();
            }
        });
    }

    // 设置模式
    setMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.mode === mode);
        });

        // 更新开始按钮文字
        const startBtn = document.getElementById('startBtn');
        if (mode === 'exam') {
            startBtn.innerHTML = '<span>开始考试</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        } else {
            startBtn.innerHTML = '<span>开始答题</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        }
    }

    // 更新统计数据
    updateStats() {
        const multipleCount = questionData.multipleChoice.length;
        const tfCount = questionData.trueFalse.length;

        // 计算填空题总数
        let fillBlankCount = 0;
        if (questionData.fillBlank) {
            questionData.fillBlank.forEach(group => {
                fillBlankCount += group.questions.length;
            });
        }

        const total = multipleCount + tfCount + fillBlankCount;

        document.getElementById('totalQuestions').textContent = total;
        document.getElementById('multipleCount').textContent = multipleCount;
        document.getElementById('tfCount').textContent = tfCount;
        document.getElementById('fillBlankCount').textContent = fillBlankCount;
    }

    // 开始答题
    startQuiz() {
        const includeMultiple = document.getElementById('includeMultiple').checked;
        const includeTF = document.getElementById('includeTF').checked;
        const includeFillBlank = document.getElementById('includeFillBlank').checked;

        if (!includeMultiple && !includeTF && !includeFillBlank) {
            alert('请至少选择一种题型！');
            return;
        }

        // 准备题目
        this.questions = [];

        if (includeMultiple) {
            this.questions = this.questions.concat(
                questionData.multipleChoice.map(q => ({ ...q, type: 'multiple' }))
            );
        }

        if (includeTF) {
            this.questions = this.questions.concat(
                questionData.trueFalse.map(q => ({ ...q, type: 'trueFalse' }))
            );
        }

        // 添加填空题
        if (includeFillBlank && questionData.fillBlank) {
            questionData.fillBlank.forEach(group => {
                group.questions.forEach(q => {
                    this.questions.push({
                        ...q,
                        type: 'fillBlank',
                        wordBank: group.wordBank
                    });
                });
            });
        }

        // 随机打乱题目
        this.shuffleArray(this.questions);

        // 根据选择的数量截取题目
        if (this.questionCount !== 'all') {
            const count = parseInt(this.questionCount);
            this.questions = this.questions.slice(0, Math.min(count, this.questions.length));
        }

        // 重置状态
        this.currentIndex = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.skippedCount = 0;
        this.wrongQuestions = [];
        this.userAnswers = new Array(this.questions.length).fill(null);

        // 考试模式：设置倒计时（每题1分钟）
        if (this.currentMode === 'exam') {
            this.timeRemaining = this.questions.length * 60; // 每题60秒
            this.startTimer();
        }

        // 显示答题界面
        this.showScreen('quiz');
        this.updateUI();
        this.showQuestion();
    }

    // 更新UI根据模式
    updateUI() {
        const scoreDisplay = document.querySelector('.score-display');
        const skipBtn = document.getElementById('skipBtn');
        const timerDisplay = document.getElementById('timerDisplay');

        if (this.currentMode === 'exam') {
            // 考试模式：隐藏实时分数，禁用跳过
            scoreDisplay.style.display = 'none';
            skipBtn.style.display = 'none';
            if (timerDisplay) timerDisplay.style.display = 'flex';
        } else {
            // 练习模式：显示实时分数，启用跳过
            scoreDisplay.style.display = 'flex';
            skipBtn.style.display = 'inline-block';
            if (timerDisplay) timerDisplay.style.display = 'none';
        }
    }

    // 开始倒计时
    startTimer() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.style.display = 'flex';
        }

        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining <= 0) {
                this.stopTimer();
                alert('时间到！');
                this.submitExam();
            }
        }, 1000);
    }

    // 更新计时器显示
    updateTimerDisplay() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            timerDisplay.querySelector('.timer-value').textContent =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // 时间少于1分钟时变红
            if (this.timeRemaining < 60) {
                timerDisplay.classList.add('urgent');
            }
        }
    }

    // 停止计时器
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // 显示当前题目
    showQuestion() {
        const question = this.questions[this.currentIndex];
        this.selectedAnswer = this.userAnswers[this.currentIndex];
        this.answered = false;

        // 更新进度
        document.getElementById('currentNum').textContent = this.currentIndex + 1;
        document.getElementById('totalNum').textContent = this.questions.length;

        if (this.currentMode === 'practice') {
            document.getElementById('correctCount').textContent = this.correctCount;
            document.getElementById('wrongCount').textContent = this.wrongCount;
        }

        // 更新进度条
        const progress = ((this.currentIndex) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        // 更新题型标签
        const badge = document.getElementById('questionTypeBadge');
        badge.classList.remove('tf', 'fillblank');

        if (question.type === 'multiple') {
            badge.textContent = '选择题';
        } else if (question.type === 'trueFalse') {
            badge.textContent = '判断题';
            badge.classList.add('tf');
        } else if (question.type === 'fillBlank') {
            badge.textContent = '填空题';
            badge.classList.add('fillblank');
        }

        // 显示题目
        document.getElementById('questionText').textContent = question.question;

        // 显示选项容器和填空题相关区域
        const optionsContainer = document.getElementById('optionsContainer');
        const wordBankSection = document.getElementById('wordBankSection');
        const fillBlankInputSection = document.getElementById('fillBlankInputSection');

        optionsContainer.innerHTML = '';

        if (question.type === 'fillBlank') {
            // 填空题
            optionsContainer.style.display = 'none';
            wordBankSection.style.display = 'block';
            fillBlankInputSection.style.display = 'block';

            // 显示词库
            this.currentWordBank = [...question.wordBank];
            this.renderWordBank();

            // 清空输入框
            const input = document.getElementById('fillBlankInput');
            input.value = this.selectedAnswer || '';
            input.disabled = false;
            input.classList.remove('correct', 'wrong');
            input.focus();

            // 启用提交按钮
            document.getElementById('submitAnswerBtn').disabled = false;
        } else {
            // 选择题或判断题
            optionsContainer.style.display = 'flex';
            wordBankSection.style.display = 'none';
            fillBlankInputSection.style.display = 'none';

            if (question.type === 'multiple') {
                question.options.forEach((option, index) => {
                    const letter = option.charAt(0);
                    const text = option.substring(3);
                    const btn = this.createOptionButton(letter, text);
                    // 如果之前已选择，标记选中状态
                    if (this.selectedAnswer === letter) {
                        btn.classList.add('selected');
                    }
                    optionsContainer.appendChild(btn);
                });
            } else {
                const trueBtn = this.createOptionButton('T', 'True (正确)');
                const falseBtn = this.createOptionButton('F', 'False (错误)');
                if (this.selectedAnswer === 'T') trueBtn.classList.add('selected');
                if (this.selectedAnswer === 'F') falseBtn.classList.add('selected');
                optionsContainer.appendChild(trueBtn);
                optionsContainer.appendChild(falseBtn);
            }
        }

        // 隐藏反馈
        document.getElementById('feedbackSection').style.display = 'none';

        // 考试模式：启用下一题按钮
        if (this.currentMode === 'exam') {
            document.getElementById('nextBtn').disabled = false;
            document.getElementById('nextBtn').textContent =
                this.currentIndex === this.questions.length - 1 ? '提交试卷' : '下一题';
        } else {
            document.getElementById('nextBtn').disabled = true;
            document.getElementById('nextBtn').textContent = '下一题';
        }

        // 添加动画效果
        const card = document.getElementById('questionCard');
        card.style.animation = 'none';
        card.offsetHeight; // 触发重绘
        card.style.animation = 'slideUp 0.5s ease-out';
    }

    // 渲染词库
    renderWordBank() {
        const wordBank = document.getElementById('wordBank');
        wordBank.innerHTML = '';

        this.currentWordBank.forEach(word => {
            const item = document.createElement('span');
            item.className = 'word-bank-item';
            item.textContent = word;
            item.addEventListener('click', () => this.selectWordFromBank(word, item));
            wordBank.appendChild(item);
        });
    }

    // 从词库选择单词
    selectWordFromBank(word, item) {
        if (this.answered) return;

        // 移除其他选中状态
        document.querySelectorAll('.word-bank-item').forEach(w => w.classList.remove('selected'));

        // 标记选中
        item.classList.add('selected');

        // 填入输入框
        document.getElementById('fillBlankInput').value = word;
        this.selectedAnswer = word;
    }

    // 提交填空题答案
    submitFillBlankAnswer() {
        if (this.answered) return;

        const input = document.getElementById('fillBlankInput');
        const userAnswer = input.value.trim().toLowerCase();

        if (!userAnswer) {
            input.focus();
            return;
        }

        this.selectedAnswer = userAnswer;
        this.userAnswers[this.currentIndex] = userAnswer;

        if (this.currentMode === 'practice') {
            this.checkFillBlankAnswer();
        } else {
            // 考试模式：只记录答案，不显示结果
            document.getElementById('nextBtn').disabled = false;
        }
    }

    // 检查填空题答案
    checkFillBlankAnswer() {
        const question = this.questions[this.currentIndex];
        const userAnswer = this.selectedAnswer.toLowerCase();
        const correctAnswer = question.answer.toLowerCase();

        const isCorrect = userAnswer === correctAnswer;

        this.answered = true;

        // 标记输入框
        const input = document.getElementById('fillBlankInput');
        input.disabled = true;
        input.classList.add(isCorrect ? 'correct' : 'wrong');

        // 标记词库中的正确答案
        document.querySelectorAll('.word-bank-item').forEach(item => {
            if (item.textContent.toLowerCase() === correctAnswer) {
                item.classList.add('correct');
            } else if (item.textContent.toLowerCase() === userAnswer && !isCorrect) {
                item.classList.add('wrong');
            }
        });

        // 禁用提交按钮
        document.getElementById('submitAnswerBtn').disabled = true;

        // 更新计数
        if (isCorrect) {
            this.correctCount++;
        } else {
            this.wrongCount++;
            this.wrongQuestions.push({
                question: question,
                userAnswer: this.selectedAnswer,
                status: 'wrong'
            });
        }

        // 显示反馈
        const feedbackSection = document.getElementById('feedbackSection');
        const feedbackContent = document.getElementById('feedbackContent');

        feedbackSection.style.display = 'block';
        feedbackContent.className = 'feedback-content ' + (isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            feedbackContent.innerHTML = `<strong>✓ 回答正确！</strong><br>${question.explanation}`;
        } else {
            feedbackContent.innerHTML = `<strong>✗ 回答错误</strong><br>正确答案: ${question.answer}<br>${question.explanation}`;
        }

        // 更新分数显示
        document.getElementById('correctCount').textContent = this.correctCount;
        document.getElementById('wrongCount').textContent = this.wrongCount;

        // 启用下一题按钮
        document.getElementById('nextBtn').disabled = false;
    }

    // 创建选项按钮
    createOptionButton(letter, text) {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text-content">${text}</span>
        `;
        btn.addEventListener('click', () => this.selectOption(letter, btn));
        return btn;
    }

    // 选择选项
    selectOption(answer, btn) {
        if (this.answered && this.currentMode === 'practice') return;

        // 移除之前的选中状态
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

        // 标记选中
        btn.classList.add('selected');
        this.selectedAnswer = answer;
        this.userAnswers[this.currentIndex] = answer;

        // 练习模式：立即检查答案
        if (this.currentMode === 'practice') {
            this.checkAnswer();
        }
    }

    // 检查答案（选择题和判断题）
    checkAnswer() {
        const question = this.questions[this.currentIndex];
        let isCorrect = false;

        if (question.type === 'multiple') {
            isCorrect = this.selectedAnswer === question.answer;
        } else {
            isCorrect = (this.selectedAnswer === 'T') === question.answer;
        }

        this.answered = true;

        // 标记所有选项
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.add('disabled');
            const letter = btn.querySelector('.option-letter').textContent;

            if (question.type === 'multiple') {
                if (letter === question.answer) {
                    btn.classList.add('correct');
                } else if (letter === this.selectedAnswer && !isCorrect) {
                    btn.classList.add('wrong');
                }
            } else {
                const isTrue = letter === 'T';
                if (isTrue === question.answer) {
                    btn.classList.add('correct');
                } else if (letter === this.selectedAnswer && !isCorrect) {
                    btn.classList.add('wrong');
                }
            }
        });

        // 更新计数
        if (isCorrect) {
            this.correctCount++;
        } else {
            this.wrongCount++;
            this.wrongQuestions.push({
                question: question,
                userAnswer: this.selectedAnswer,
                status: 'wrong'
            });
        }

        // 显示反馈
        const feedbackSection = document.getElementById('feedbackSection');
        const feedbackContent = document.getElementById('feedbackContent');

        feedbackSection.style.display = 'block';
        feedbackContent.className = 'feedback-content ' + (isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            feedbackContent.innerHTML = `<strong>✓ 回答正确！</strong><br>${question.explanation}`;
        } else {
            let correctAnswer;
            if (question.type === 'multiple') {
                correctAnswer = question.answer;
            } else {
                correctAnswer = question.answer ? 'True' : 'False';
            }
            feedbackContent.innerHTML = `<strong>✗ 回答错误</strong><br>正确答案: ${correctAnswer}<br>${question.explanation}`;
        }

        // 更新分数显示
        document.getElementById('correctCount').textContent = this.correctCount;
        document.getElementById('wrongCount').textContent = this.wrongCount;

        // 启用下一题按钮
        document.getElementById('nextBtn').disabled = false;
    }

    // 跳过题目
    skipQuestion() {
        if (!this.answered) {
            this.skippedCount++;
            this.wrongQuestions.push({
                question: this.questions[this.currentIndex],
                userAnswer: null,
                status: 'skipped'
            });
        }

        this.nextQuestion();
    }

    // 下一题
    nextQuestion() {
        this.currentIndex++;

        if (this.currentIndex >= this.questions.length) {
            if (this.currentMode === 'exam') {
                this.submitExam();
            } else {
                this.showResult();
            }
        } else {
            this.showQuestion();
        }
    }

    // 提交考试（考试模式）
    submitExam() {
        this.stopTimer();

        // 计算成绩
        this.correctCount = 0;
        this.wrongCount = 0;
        this.skippedCount = 0;
        this.wrongQuestions = [];

        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];

            if (userAnswer === null) {
                this.skippedCount++;
                this.wrongQuestions.push({
                    question: question,
                    userAnswer: null,
                    status: 'skipped'
                });
            } else {
                let isCorrect = false;

                if (question.type === 'multiple') {
                    isCorrect = userAnswer === question.answer;
                } else if (question.type === 'trueFalse') {
                    isCorrect = (userAnswer === 'T') === question.answer;
                } else if (question.type === 'fillBlank') {
                    isCorrect = userAnswer.toLowerCase() === question.answer.toLowerCase();
                }

                if (isCorrect) {
                    this.correctCount++;
                } else {
                    this.wrongCount++;
                    this.wrongQuestions.push({
                        question: question,
                        userAnswer: userAnswer,
                        status: 'wrong'
                    });
                }
            }
        });

        this.showResult();
    }

    // 显示结果
    showResult() {
        this.stopTimer();
        this.showScreen('result');

        const total = this.questions.length;
        const score = Math.round((this.correctCount / total) * 100);

        // 更新结果图标
        const resultIcon = document.getElementById('resultIcon');
        if (score >= 90) {
            resultIcon.textContent = '🏆';
        } else if (score >= 70) {
            resultIcon.textContent = '🎉';
        } else if (score >= 60) {
            resultIcon.textContent = '💪';
        } else {
            resultIcon.textContent = '📚';
        }

        // 更新分数
        document.getElementById('scoreValue').textContent = score;
        document.getElementById('finalCorrect').textContent = this.correctCount;
        document.getElementById('finalWrong').textContent = this.wrongCount;
        document.getElementById('finalSkipped').textContent = this.skippedCount;

        // 动画显示分数圆环
        setTimeout(() => {
            const circle = document.getElementById('scoreCircle');
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (score / 100) * circumference;
            circle.style.strokeDashoffset = offset;

            // 添加渐变定义
            const svg = circle.closest('svg');
            if (!svg.querySelector('defs')) {
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                defs.innerHTML = `
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#667eea"/>
                        <stop offset="100%" style="stop-color:#764ba2"/>
                    </linearGradient>
                `;
                svg.insertBefore(defs, svg.firstChild);
            }
        }, 100);

        // 隐藏/显示查看错题按钮
        document.getElementById('reviewBtn').style.display =
            this.wrongQuestions.length > 0 ? 'inline-block' : 'none';
    }

    // 显示错题回顾
    showReview() {
        const reviewScreen = document.getElementById('reviewScreen');
        const reviewList = document.getElementById('reviewList');

        reviewList.innerHTML = '';

        this.wrongQuestions.forEach((item, index) => {
            const q = item.question;
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';

            let optionsHtml = '';

            if (q.type === 'multiple') {
                q.options.forEach(option => {
                    const letter = option.charAt(0);
                    let optionClass = '';
                    if (letter === q.answer) {
                        optionClass = 'correct';
                    } else if (letter === item.userAnswer) {
                        optionClass = 'user-wrong';
                    }
                    optionsHtml += `<div class="review-option ${optionClass}">${option}</div>`;
                });
            } else if (q.type === 'trueFalse') {
                optionsHtml = `
                    <div class="review-option ${q.answer ? 'correct' : (item.userAnswer === 'T' ? 'user-wrong' : '')}">T. True (正确)</div>
                    <div class="review-option ${!q.answer ? 'correct' : (item.userAnswer === 'F' ? 'user-wrong' : '')}">F. False (错误)</div>
                `;
            } else if (q.type === 'fillBlank') {
                optionsHtml = `
                    <div class="review-option correct">正确答案: ${q.answer}</div>
                    ${item.userAnswer ? `<div class="review-option user-wrong">你的答案: ${item.userAnswer}</div>` : '<div class="review-option user-wrong">未作答</div>'}
                `;
            }

            reviewItem.innerHTML = `
                <div class="review-item-header">
                    <span class="review-item-number">第 ${index + 1} 题</span>
                    <span class="review-item-status ${item.status}">${item.status === 'wrong' ? '答错' : '跳过'}</span>
                </div>
                <div class="review-item-question">${q.question}</div>
                <div class="review-item-options">${optionsHtml}</div>
                <div class="review-item-answer">
                    <strong>解析：</strong>
                    ${q.explanation}
                </div>
            `;

            reviewList.appendChild(reviewItem);
        });

        reviewScreen.style.display = 'block';
        document.body.classList.add('no-scroll');
    }

    // 隐藏错题回顾
    hideReview() {
        document.getElementById('reviewScreen').style.display = 'none';
        document.body.classList.remove('no-scroll');
    }

    // 重新开始
    restart() {
        this.stopTimer();
        this.showScreen('start');
    }

    // 显示指定屏幕
    showScreen(screen) {
        document.getElementById('startScreen').style.display = screen === 'start' ? 'flex' : 'none';
        document.getElementById('quizScreen').style.display = screen === 'quiz' ? 'block' : 'none';
        document.getElementById('resultScreen').style.display = screen === 'result' ? 'flex' : 'none';
    }

    // 随机打乱数组
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
