/**
 * This file contains the implementation of the Solitaire component.
 * The Solitaire component is a React component that represents a Solitaire game.
 * It includes functions for moving cards, checking game finish, and rendering the game.
 * @module Solitaire
 */
import spriteImg from './sprite';
import './index.scss';
import React from 'react';
function Solitaire() {

            state.moving.capture = true;
            state.moving.index = index;
            state.moving.card = getCard(index);
            state.moving.origin = getCardLocation(index);

            startMovingPosition(event);

            const destinations = getAvailableDestinations(index);
            state.moving.destinations = destinations;

            for (const dest of destinations) {
                dest.el.classList.add('finish-dest');
            }

            for (let i = 0, l = destinations.length; i < l; i++) {
                const { top, left, width, height } = destinations[i].el.getBoundingClientRect();
                state.moving.destinations[i].offset = {
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                }
            }200;

const dropCard = (x, y) => {
    for (const destination of state.moving.destinations) {
        const { width, height, left, top } = destination.offset;
        destination.el.classList.remove('finish-dest');
        if (
            (x > left && x < left + width) &&
            (y > top && y < top + height)
        ) {
            const { dest, pile, card } = destination.target;
            moveCardTo(dest, pile, card);

            destination.el.appendChild(state.moving.element);

            // check game finish
            gameFinish();

            // face up last on desk
            const {
                location: originLocation,
                pile: originPile
            } = state.moving.origin;

            if (originLocation === 'desk') {
                faceUpLastOnDesk(originPile);
            }
        }
    }
};

let release;
const releaseMove = event => {
    clearTimeout(moving);
    clearTimeout(release);
    if (state.moving.capture) {
        release = setTimeout(() => {
            const { x, y } = getMousePosition(event);
            requestAnimationFrame(() => {
                dropCard(x, y);

                state.moving.element.classList.remove('card--moving');
                state.moving.element.style.left = '';
                state.moving.element.style.top = '';
                state.moving.element = null;
                state.moving.capture = false;
                // console.log('release');
            });
        }, 100);
    }
};

const getAvailableDestinations = (index, first = false) => {
    const { type, number } = getCard(index);
    const destinations = [];
    if (number === 1) { // aces
        // finish pile
        for (let i = 0; i < 4; i++) {
            const { cards, el} = getPile('finish', i);
            if (cards.length === 0) {
                destinations.push({
                    el: el,
                    target: {
                        dest: 'finish',
                        pile: i,
                        card: index
                    }
                });

                if (first) return destinations;
            }
        }
    }
    // other cards
    // move to finish pile
    const subCards = getSubCards(index);
    if (!subCards.length > 0) {
        for (let i = 0; i < 4; i++) {
            const l = state.finish[i].cards.length;
            if (l + 1 === number) {
                const {
                    type: lastType
                } = getLastOnPile('finish', i);

                if (lastType === type) {
                    destinations.push({
                        el: state.finish[i].el,
                        target: {
                            dest: 'finish',
                            pile: i,
                            card: index
                        }
                    });
                    if (first) return destinations;
                    break;
                }
            }
        }
    }
    // desk pile
    for (let i = 0; i < 7; i++) {
        const last = getLastOnDesk(i);
        if (last !== null) {
            if (canBePlacedOnCard(index, last)) {
                destinations.push({
                    el: state.cards[last].el,
                    target: {
                        dest: 'desk',
                        pile: i,
                        card: index
                    }
                });
                if (first) return destinations;
            }
        } else { // empty desk, accepts only kings
            if (number === 13) { // kings
                destinations.push({
                    el: state.desk[i].el,
                    target: {
                        dest: 'desk',
                        pile: i,
                        card: index
                    }
                });
                if (first) return destinations;
            }
        }
    }
    return destinations;
};


const gameFinish = () => {
    // game finish check
    for (let i = 3; i >= 0; i--) {
        const l = state.finish[i].cards.length;
        if (l < 13) return;
    }

    const { width, height, left, top } = gameEl.getBoundingClientRect();
    win(width, height, left, top);
};

window.win = () => {
    const { width, height, left, top } = gameEl.getBoundingClientRect();
    win(width, height, left, top);
};

const win = (canvasWidth, canvasHeight, canvasLeft, canvasTop) => {
    const image = document.createElement('img');
    image.src = spriteImg;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    gameEl.appendChild(canvas);

    const context = canvas.getContext('2d');
    let card = 52;
    const particles = [];

    const drawCard = (x, y, spriteX, spriteY) => {
        context.drawImage(
            image,
            spriteX,
            spriteY,
            cardWidth,
            cardHeight,
            x,
            y,
            cardWidth,
            cardHeight
        );
    };

    const Particle = function (id, x, y, sx, sy) {
        if (sx === 0) sx = 2;
        const spriteX = ( id % 4 ) * cardWidth;
        const spriteY = Math.floor(id / 4) * cardHeight;

        // initial position of the card
        drawCard(x, y, spriteX, spriteY);

        this.update = () => {
            x += sx;
            y += sy;

            // is particle out of canvas
            if (x < -cardWidth || x > (canvas.width + cardWidth)) {
                const index = particles.indexOf(this);
                particles.splice(index, 1);
                return false;
            }

            // bounce from floor
            if (y > canvas.height - cardHeight) {
                y = canvas.height - cardHeight;
                sy = -sy * 0.85;
            }
            sy += 0.98;

            drawCard(
                Math.floor(x),
                Math.floor(y),
                spriteX,
                spriteY
            );
            return true;
        };
    };

    const throwCard = (x, y) => {
        if (card < 1) return;
        card--;
        const particle = new Particle(
            card,
            x,
            y,
            Math.floor(Math.random() * 6 - 3) * 2,
            -Math.random() * 16
        );

        // const particle = new Particle(card, x, y, 0, 0);
        particles.push(particle);
    };

    let throwInterval = [];
    for (let i = 0; i < 4; i++) {
        const { left, top } = state.finish[i].el.getBoundingClientRect();
        throwInterval[i] = setInterval(function () {
            throwCard(left - canvasLeft, top - canvasTop);
        }, 1000);
        // throwCard(left - canvasLeft, top - canvasTop);
    }

    const updateInterval = setInterval(function () {
        let i = 0, l = particles.length;
        while (i < l) {
            particles[i].update() ? i++ : l--;
        }
        // clearInterval(updateInterval)
    }, 1000 / 60);

    function removeAnimation(event) {
        event.preventDefault();
        clearInterval(updateInterval);
        for (let i = 0; i < 4; i++) {
            clearInterval(throwInterval[i]);
        }
        canvas.parentNode.removeChild(canvas);
        document.removeEventListener('click', removeAnimation)
    }
    document.addEventListener('click', removeAnimation, false);
};

function initSolitaire() {
    // add sprite
    const css = document.createElement('style');
    const styles = `.card--front { background-image: url("${spriteImg}"); }`;
    css.appendChild(document.createTextNode(styles));
    document.head.appendChild(css);

    // create all cards
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            const el = document.createElement('div');
            el.classList.add(
                'card',
                `card--${state.types[i]}-${j}`,
                'card--back'
            );

            state.cards.push({
                el: el,
                type: state.types[i],
                number: j,
                facingUp: false
            });
        }
    }

    // create aces decks
    for (let i = 0; i < 4; i++) {
        const el = document.createElement('div');
        el.classList.add(
            'aces',
            `aces--${i}`
        );
        state.finish.push({
            el: el,
            cards: []
        });
        finishContainerEl.appendChild(el);
    }

    // create desk decks
    for (let i = 0; i < 7; i++) {
        const el = document.createElement('div');
        el.classList.add(
            'seven',
            `seven--${i}`
        );
        state.desk.push({
            el: el,
            cards: []
        });
        deskContainerEl.appendChild(el);
    }

    dealPileEl.onclick = restartDeal;
    resetEl.onclick = resetGame;
    window.onmousemove = handleMove;
    window.onmouseup = releaseMove;

    resetGame();
}

export default Solitaire;

window.onload = initSolitaire;
}
