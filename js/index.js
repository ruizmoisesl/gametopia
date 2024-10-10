const apiKey = 'f596043e8724424fa72446760f43f5b6';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;
const featuredGames = document.getElementById('games')


const platformIcons = {
  "pc": `https://moisesruiz971-imgs.sirv.com/Gametopia/windows-white.svg`,
  "playstation": 'https://moisesruiz971-imgs.sirv.com/Gametopia/playstation-white.svg',
  "xbox": 'https://moisesruiz971-imgs.sirv.com/Gametopia/xbox-white.svg',
  "nintendo": 'https://moisesruiz971-imgs.sirv.com/Gametopia/nintendo-switch-white.svg',
  "apple": 'https://moisesruiz971-imgs.sirv.com/Gametopia/mac-white.svg',
  "mac": 'https://moisesruiz971-imgs.sirv.com/Gametopia/mac-white.svg',
  "android": 'https://moisesruiz971-imgs.sirv.com/Gametopia/android-white.svg'
}


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(game => {

      const platformsHTML = game.parent_platforms.map(platformInfo => {
        const platformSlug = platformInfo.platform.slug;
        const platformName = platformInfo.platform.name;
        const iconUrl = platformIcons[platformSlug];
        if (iconUrl) {
          return `<span class="platform"><img src="${iconUrl}" alt="${platformName}" width="30" height="30"></span>`;
        }
      }).join('');

      featuredGames.innerHTML += `
      <div class="card">
          <a href="#">
            <img class="img-game" src= "${game.background_image}" >
            <h3 class="game-title">${game.name}</h3>
            <div class="platform-list">
              ${platformsHTML}
            </div>
            <div class= "button">
              <a href="/" class="btn" id="btn-valueID" value="${game.id}">VER MAS</a>
            </div>
          </a>
        </div>
        `;
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });


const gameID = document.getElementById('btn-valueID').value;
const video = `${apiUrl}/games/${gameID}/movies`

fetch(video)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(video => {
      const videoHTML = `<iframe width="100%" height="315" src="${video.trailer}
      " frameborder="0" allowfullscreen></iframe>`
      const game = data.results.find(game => game.id === video.game.id);
      const gameCard = document.querySelector(`.card[data-id="${game.id}"]`)
      gameCard.innerHTML += videoHTML;
    });
  })
