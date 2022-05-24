const cards = document.querySelectorAll('.memory-card');
//Validação Usuario
const userNameRef = selectElement('#userName')
const userImageRef = selectElement('#userImage')
const closeAppRef = selectElement('#closeApp')
//Validação Jogo
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const login = {
  headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
  }
}

//Volta p/o login se não houver token no localStorage
if(localStorage.getItem('token') === null){
  window.location.href = './index.html'
}

userImageRef.classList.add('user-image')

//Mostrar nome do Usuario
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', login).then(
  response => response.json().then(
      data => {
          nome = data.firstName
          lastName = data.lastName
          userNameRef.innerHTML = `${nome}`
          
          const githubAvatar = `${lastName})`
          userImageRef.innerHTML = `<p>${nome[0]}</p>`
          if(githubAvatar) {
              userImageRef.innerHTML = ''
              userImageRef.style.opacity = 1
              userImageRef.style.backgroundImage = `url(https://avatars.githubusercontent.com/${githubAvatar}`
          }
      }
  )
)

//Botao finalizar sessão
closeAppRef.addEventListener('click',  () => {
  localStorage.clear()
  window.location.href = './index.html'
})


// **************JOGO DA MEMÓRIA**************** //

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
