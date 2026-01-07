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

        // 关闭错题回顾
        document.getElementById('closeReviewBtn').addEventListener('click', () => this.hideReview());
    }

    // 设置模式
    setMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.mode === mode);
        });
    }

    // 更新统计数据
    updateStats() {
        const multipleCount = questionData.multipleChoice.length;
        const tfCount = questionData.trueFalse.length;
        const total = multipleCount + tfCount;

        document.getElementById('totalQuestions').textContent = total;
        document.getElementById('multipleCount').textContent = multipleCount;
        document.getElementById('tfCount').textContent = tfCount;
    }

    // 开始答题
    startQuiz() {
        const includeMultiple = document.getElementById('includeMultiple').checked;
        const includeTF = document.getElementById('includeTF').checked;

        if (!includeMultiple && !includeTF) {
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

        // 显示答题界面
        this.showScreen('quiz');
        this.showQuestion();
    }

    // 显示当前题目
    showQuestion() {
        const question = this.questions[this.currentIndex];
        this.selectedAnswer = null;
        this.answered = false;

        // 更新进度
        document.getElementById('currentNum').textContent = this.currentIndex + 1;
        document.getElementById('totalNum').textContent = this.questions.length;
        document.getElementById('correctCount').textContent = this.correctCount;
        document.getElementById('wrongCount').textContent = this.wrongCount;

        // 更新进度条
        const progress = ((this.currentIndex) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        // 更新题型标签
        const badge = document.getElementById('questionTypeBadge');
        if (question.type === 'multiple') {
            badge.textContent = '选择题';
            badge.classList.remove('tf');
        } else {
            badge.textContent = '判断题';
            badge.classList.add('tf');
        }

        // 显示题目
        document.getElementById('questionText').textContent = question.question;

        // 显示选项
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';

        if (question.type === 'multiple') {
            question.options.forEach((option, index) => {
                const letter = option.charAt(0);
                const text = option.substring(3);
                const btn = this.createOptionButton(letter, text);
                container.appendChild(btn);
            });
        } else {
            const trueBtn = this.createOptionButton('T', 'True (正确)');
            const falseBtn = this.createOptionButton('F', 'False (错误)');
            container.appendChild(trueBtn);
            container.appendChild(falseBtn);
        }

        // 隐藏反馈
        document.getElementById('feedbackSection').style.display = 'none';

        // 禁用下一题按钮
        document.getElementById('nextBtn').disabled = true;

        // 添加动画效果
        const card = document.getElementById('questionCard');
        card.style.animation = 'none';
        card.offsetHeight; // 触发重绘
        card.style.animation = 'slideUp 0.5s ease-out';
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
        if (this.answered) return;

        // 移除之前的选中状态
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

        // 标记选中
        btn.classList.add('selected');
        this.selectedAnswer = answer;

        // 检查答案
        this.checkAnswer();
    }

    // 检查答案
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
            this.showResult();
        } else {
            this.showQuestion();
        }
    }

    // 显示结果
    showResult() {
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
            } else {
                const correctAnswer = q.answer ? 'T' : 'F';
                optionsHtml = `
                    <div class="review-option ${q.answer ? 'correct' : (item.userAnswer === 'T' ? 'user-wrong' : '')}">T. True (正确)</div>
                    <div class="review-option ${!q.answer ? 'correct' : (item.userAnswer === 'F' ? 'user-wrong' : '')}">F. False (错误)</div>
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
