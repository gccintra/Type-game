const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field");

let charIndex = 0

const randomParagraph = () => {
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    paragraphs[randIndex].split("").forEach(span => {
            let spanTag = `<span>${span}</span>`;
            typingText.innerHTML += spanTag
    });
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
    
  
}

const initTyping = () => {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(typedChar == null){
        charIndex--
        characters[charIndex].classList.remove("correct", "incorrect")
    }else{
        if(characters[charIndex].innerText === typedChar){
            characters[charIndex].classList.add("correct")
        }else {
            characters[charIndex].classList.add("incorrect")
        }
        charIndex++
    }
    characters.forEach(span => span.classList.remove("active"))
    characters[charIndex].classList.add("active")
}
randomParagraph() 
inpField.addEventListener("input", initTyping);