async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    createCard(json.data);
  } catch (error) {
    console.error(error.message);
  }
}

// Example usage with a card ID

let url = "https://api.pokemontcg.io/v2/cards?q=name:venusaur";
let myApp = document.getElementById("myApp");

getData(url);

function createCard(card) {
  let cardHtml = "";

  card.forEach((cardInfo) => {
    console.log(cardInfo);

    // Start building the card HTML
    cardHtml += `<section class="card-info">
        <figure>
          <img src="${cardInfo.images.small}" alt="${cardInfo.name}">
          <figcaption>
            <h2>${cardInfo.name}</h2>`;

    // healthPoints / types
    cardHtml += `<section class="healthPoints"><p>HP ${cardInfo.hp} ${cardInfo.types}</p></section>`;

    // attack
    cardHtml += `
            <section class="attack">`;
    if (cardInfo.attacks && cardInfo.attacks.length > 0) {
      cardInfo.attacks.forEach((attack) => {
        cardHtml += `
            <div class="attackInfo">
              <h3>${attack.name}</h3>
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
}
