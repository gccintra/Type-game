const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
cpmTag = document.querySelector(".cpm span"),
wpmTag = document.querySelector(".wpm span"),
tryAgainBtn = document.querySelector("button"),
mistakeTag = document.querySelector(".mistakes span");


let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0

const randomParagraph = () => {
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
            let spanTag = `<span>${span}</span>`;
            typingText.innerHTML += spanTag
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
 
  
}

const initTyping = () => {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0){


        if(!isTyping){
            timer = setInterval(initTimer, 1000)
            isTyping = 1
        }
        if(typedChar == null){
            charIndex--
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        }else{
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct")
            }else {
                mistakes++;
                characters[charIndex].classList.add("incorrect")
            }
            charIndex++
        }
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active")
    
        let wpm = Math.round((((charIndex - mistakes) / 5 ) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
    
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    
    }else{
        inpField.value = "";
        clearInterval(timer)
    }
}

const initTimer = () => {
    if(timeLeft > 0 ){
        timeLeft--;
        timeTag.innerText = timeLeft
    }else{
        clearInterval(timer)
    }
}

const resetGame = () => {
    randomParagraph()
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0
    timeTag.innerText = timeLeft

    wpmTag.innerText = 0;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = 0;

    inpField.value = "";
    clearInterval(timer)
}   



randomParagraph() 
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);