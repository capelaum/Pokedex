const cards = document.querySelector('.cards');
const card = document.querySelector('.card');

for (let i = 0; i < 30; i++) {
  const clone = card.cloneNode(true);
  cards.appendChild(clone);
}