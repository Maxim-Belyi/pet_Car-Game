import { createElementInfo } from "./create-elem-info.js";

export const arrow = document.querySelector('[data-js-arrow]');
export const arrowInfo = createElementInfo(arrow);
export const blueCar = document.querySelector('[data-js-car]');
export let gameScoreWrapper = document.querySelector('[data-js-game-score-wrapper]');
export let gameScoreValue = document.querySelector('[data-js-game-score-value]');
export let backdropEndGame = document.querySelector('[data-js-end-game-backdrop]');
export const restartButton = document.querySelector('[data-js-end-game-button]');

export const coinAlt = document.querySelector('[data-js-coin-alt]');
export const coinAltInfo = createElementInfo(coinAlt);
export const coin = document.querySelector('[data-js-coin]');
export const coinInfo = createElementInfo(coin);

export const controlLeft = document.querySelector('[data-js-left-control]');
export const controlDown = document.querySelector('[data-js-down-control]');
export const controlTop = document.querySelector('[data-js-top-control]');
export const controlRight = document.querySelector('[data-js-right-control]');

export const trees = document.querySelectorAll('[data-js-tree]');
export const road = document.querySelector('[data-js-road]');

export const roadWidth = road.clientWidth;

export let negativeRandom100 =
    -window.innerHeight - Math.floor(Math.random() * (500 - 100) + 100);
export let negativeRandom500 =
    -window.innerHeight - Math.floor(Math.random() * (900 - 500) + 500);
export let negativeRandom900 =
    -window.innerHeight - Math.floor(Math.random() * (1200 - 900) + 900);

export const treesCoords = [];