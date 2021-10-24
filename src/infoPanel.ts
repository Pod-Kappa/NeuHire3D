import { Player } from './player';

const formatNumber = (num: number) => `${Math.round((num + Number.EPSILON) * 100) / 100}`;

var isOpen = true;

export const renderPlayerInfoPannel = (player: Player) => {
  const hudElement = document.getElementById('playerInfoHUD');
  const child = document.getElementById('infoContainer');
  child && hudElement && hudElement.removeChild(child);

  if (isOpen) {
    const containerElement = document.createElement('div');
    containerElement.id = 'infoContainer';

    const posX = document.createElement('p');
    posX.innerText = `posX: ${formatNumber(player.getPosition().x)}`;
    containerElement.appendChild(posX);

    const posY = document.createElement('p');
    posY.innerText = `posY: ${formatNumber(player.getPosition().y)}`;
    containerElement.appendChild(posY);

    const posZ = document.createElement('p');
    posZ.innerText = `posZ: ${formatNumber(player.getPosition().z)}`;
    containerElement.appendChild(posZ);

    const rotY = document.createElement('p');
    rotY.innerText = `rotY: ${formatNumber(player.getRotation().y)}`;
    containerElement.appendChild(rotY);

    const moveSpeed = document.createElement('p');
    moveSpeed.innerText = `moveSpeed: ${player.speed}`;
    containerElement.appendChild(moveSpeed);

    const turnSpeed = document.createElement('p');
    turnSpeed.innerText = `turnSpeed: ${formatNumber(player.turnSpeed)}`;
    containerElement.appendChild(turnSpeed);

    hudElement && hudElement.insertBefore(containerElement, document.getElementById('infoPanelButton'));
  }
};

const setInfoPanelButton = () => {
  const button = document.getElementById('infoPanelButton');
  if (button) {
    button.innerText = isOpen ? `X` : `Player Info`;
    button.onclick = function (event) {
      isOpen = !isOpen;
      button.innerText = isOpen ? `X` : `Player Info`;
    };
  }
};

setInfoPanelButton();
