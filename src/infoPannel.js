const formatNumber = num => `${Math.round((num + Number.EPSILON) * 100) / 100}`;

export const renderPlayerInfo = player => {
  const hudElement = document.getElementById('playerInfoHUD');
  hudElement.innerHTML = '';

  const posContainerElement = document.createElement('div');
  posContainerElement.className = 'infoContainer';

  const posX = document.createElement('p');
  posX.innerText = `posX: ${formatNumber(player.getPosition().x)}`;
  posContainerElement.appendChild(posX);

  const posY = document.createElement('p');
  posY.innerText = `posY: ${formatNumber(player.getPosition().y)}`;
  posContainerElement.appendChild(posY);

  const posZ = document.createElement('p');
  posZ.innerText = `posZ: ${formatNumber(player.getPosition().z)}`;
  posContainerElement.appendChild(posZ);

  const rotY = document.createElement('p');
  rotY.innerText = `rotY: ${formatNumber(player.getRotation().y)}`;
  posContainerElement.appendChild(rotY);

  const moveSpeed = document.createElement('p');
  moveSpeed.innerText = `moveSpeed: ${player.speed}`;
  posContainerElement.appendChild(moveSpeed);

  const turnSpeed = document.createElement('p');
  turnSpeed.innerText = `turnSpeed: ${formatNumber(player.turnSpeed)}`;
  posContainerElement.appendChild(turnSpeed);

  hudElement.appendChild(posContainerElement);
};
