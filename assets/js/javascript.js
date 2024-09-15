async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    createCard(json.data);
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

// Example usage with a card ID

const url = "https://api.pokemontcg.io/v2/cards?q=name:bulbasaur";
const myApp = document.getElementById("myApp");

getData(url);

function createCard(cards) {
  let cardHtml = "";

  cards.forEach((cardInfo, index) => {
    // Start building the card HTML
    cardHtml += `<section class="card-info" >
        <figure>
        <div class ="imgHolder">
          <img id="cardImg-${index}" src="${cardInfo.images.small}" alt="${cardInfo.name}">
          </div>
          <figcaption>
            <h1>${cardInfo.name}</h1>`;

    // healthPoints / types
    cardHtml += `<section class="healthPoints"><p>HP ${cardInfo.hp} ${cardInfo.types}</p></section>`;

    // attack
    cardHtml += `
            <section class="attack">`;
    if (cardInfo.attacks && cardInfo.attacks.length > 0) {
      cardInfo.attacks.forEach((attack) => {
        cardHtml += `
            <div class="attackInfo">
              <h2>${attack.name}</h2>
              <p>Damage: ${attack.damage}</p>
              <p>Cost: ${attack.cost.join(", ")}</p>
              <p>Description: ${attack.text}</p>
            </div>`;
      });
    } else {
      // no attacks
      cardHtml += `<p>No attacks available</p>`;
    }

    // Close the card
    cardHtml += `</section>
          </figcaption>
        </figure>
      </section>`;
  });
  // Insert generated HTML into the DOM
  myApp.innerHTML = cardHtml;

  //  rotateElement && hover

  cards.forEach((cardInfo, index) => {
    const cardElement = document.getElementById(`cardImg-${index}`);
    // Check if cardElement exists
    if (cardElement) {
      cardElement.addEventListener("mousemove", (e) => {
        // Rotate element
        rotateElement(e, cardElement);
        cardElement.classList.add(".card__rotator");
      });
      cardElement.addEventListener("mouseleave", () => {
        // Reset rotation and transition
        cardElement.style.transform = "";
        cardElement.style.transition = "transform 0.3s";
        cardElement.classList.remove(".card__rotator");
      });
    }
  });
}

// function rotateElement && hover
function rotateElement(e, cardElement) {
  const rect = cardElement.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const middleX = rect.width / 2;
  const middleY = rect.height / 2;
  const offsetX = ((x - middleX) / middleX) * 15; // Rotation amount on Y-axis
  const offsetY = ((y - middleY) / middleY) * 15; // Rotation amount on X-axis
  cardElement.style.transform = `perspective(1000px) rotateY(${offsetX}deg) rotateX(${-offsetY}deg)`;
  cardElement.style.transition = "none"; // Disable transition while rotating
}
