       let score = 0;
        let energy = 100;
        const totalToDestroy = 1000;
        // Trivia questions - environmental themed
const questions = [
    { q: "Which gas contributes MOST to greenhouse effect?", a: ["Oxygen", "CO₂", "Nitrogen", "Helium"], correct: 1 },
    { q: "How long does plastic take to decompose?", a: ["50 years", "450+ years", "10 years", "100 years"], correct: 1 },
    { q: "What percentage of Earth's oxygen comes from oceans?", a: ["30%", "90%", "70%", "50%"], correct: 2 },
    { q: "Largest cause of deforestation globally?", a: ["Logging", "Cattle farming", "Mining", "Urban growth"], correct: 1 },
    { q: "What % of rainforest has been destroyed?", a: ["~10%", "~80%", "~30%", "~50%"], correct: 3 },
    { q: "What year did global warming become widely recognized?", a: ["1990s", "2000s", "1970s", "1980s"], correct: 3 },
    { q: "How many plastic items enter oceans yearly?", a: ["1 million tons", "100 thousand tons", "8 million tons", "50 million tons"], correct: 2 },
    { q: "Which continent produces the most e-waste annually?", a: ["Europe", "Africa", "Asia", "North America"], correct: 2 },
    { q: "What % of global freshwater is used by agriculture?", a: ["30%", "90%", "50%", "70%"], correct: 3 },
    { q: "How many trees are cut down globally each year?", a: ["~5 billion", "~30 billion", "~1 billion", "~15 billion"], correct: 3 },
    { q: "What percentage of ocean plastic comes from land?", a: ["~20%", "~80%", "~40%", "~50%"], correct: 1 },
    { q: "Which country emits the most CO₂ currently?", a: ["USA", "India", "Russia", "China"], correct: 3 },
    { q: "How many species go extinct daily due to human activity?", a: ["~50", "~1000", "~50", "~200"], correct: 3 },
    { q: "What % of coral reefs have been lost since 1950?", a: ["~20%", "~30%", "~50%", "~80%"], correct: 2 },
    { q: "Which renewable energy source grows fastest globally?", a: ["Wind", "Hydroelectric", "Solar", "Geothermal"], correct: 2 }
];
        
        function useAction(damage, cost) {
            if (energy >= cost) {
                energy -= cost;
                score += damage;
                if (score > totalToDestroy) score = totalToDestroy;
                
                document.body.classList.add('shake');
                setTimeout(() => document.body.classList.remove('shake'), 300);
                
                updateDisplay();
            }
        }
        
        let currentQuestion = null;
        
        function loadQuestion() {
            currentQuestion = questions[Math.floor(Math.random() * questions.length)];
            document.getElementById('question').textContent = currentQuestion.q;
            const btns = document.querySelectorAll('.answer-btn');
            currentQuestion.a.forEach((ans, i) => {
                btns[i].textContent = ans;
                btns[i].className = 'answer-btn'; // Reset classes
                btns[i].disabled = false;
            });
            document.getElementById('feedback').textContent = '';
            document.getElementById('feedback').className = 'feedback';
        }
        
        function checkAnswer(selected) {
            const btns = document.querySelectorAll('.answer-btn');
            
            // Highlight selected answer
            if (selected === currentQuestion.correct) {
                // Correct answer
                btns[selected].classList.add('correct-answer');
                energy = Math.min(energy + 25, 100);
                document.getElementById('feedback').innerHTML = `
                    ✓ <strong>Correct!</strong> +25 Energy
                    <div class="show-answer">✅ Correct Answer: ${currentQuestion.a[currentQuestion.correct]}</div>
                `;
                document.getElementById('feedback').className = 'feedback correct-feedback';
            } else {
                // Wrong answer - show both
                btns[selected].classList.add('selected-wrong');
                btns[currentQuestion.correct].classList.add('correct-answer');
                document.getElementById('feedback').innerHTML = `
                    ✗ <strong>Wrong!</strong> No energy gained.
                    <div class="show-answer">✅ Correct Answer: ${currentQuestion.a[currentQuestion.correct]}</div>
                `;
                document.getElementById('feedback').className = 'feedback wrong-feedback';
            }
            
            // Disable all buttons
            btns.forEach(b => b.disabled = true);
            setTimeout(loadQuestion, 2000); // Longer delay to see the correct answer
            updateDisplay();
        }
        
        function updateDisplay() {
            const damagePct = (score / totalToDestroy) * 100;
            const energyPct = (energy / 100) * 100;
            
            document.getElementById('score').textContent = score;
            document.getElementById('progress').style.width = damagePct + '%';
            document.getElementById('progress').textContent = Math.round(damagePct) + '%';
            
            document.getElementById('energy').textContent = energy;
            document.getElementById('energyBar').style.width = energyPct + '%';
            
            // Disable buttons if not enough energy
            document.getElementById('btn-pollute').disabled = energy < 10;
            document.getElementById('btn-deforest').disabled = energy < 25;
            document.getElementById('btn-overfish').disabled = energy < 50;
            document.getElementById('btn-oil').disabled = energy < 100;
            
            if (score >= totalToDestroy) {
                alert('🌍 PLANET DESTROYED! You killed the Earth! Game Over.');
                resetGame();
            }
        }
        
        function resetGame() {
            score = 0;
            energy = 100;
            updateDisplay();
            loadQuestion();
        }
        
        // Initialize
        loadQuestion();
        updateDisplay();
   