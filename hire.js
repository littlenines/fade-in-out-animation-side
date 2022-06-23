const clientsAnimationSlide = document.querySelector('[data-clients-animation]');
const parentClients = document.querySelectorAll('[data-clients-img]');
const listOfClients = [...parentClients];
const clonedClientsDesktop = listOfClients.map(data => data.cloneNode(true));
const clonedClientsMobile = listOfClients.map(data => data.cloneNode(true));

const ANIMATION_INTERVAL = 4000;
const ANIMATION_TIMEOUT = 1000;

const WINDOW_BREAKPOINT = 1366;

const showClients = () => {
    for (let i = 0; i < 5; i++) {
        if (clonedClientsDesktop.length % 10 !== 0 && clonedClientsDesktop.length % 10 !== 5) {
            clonedClientsDesktop.push(clonedClientsDesktop[i])
        }
        clientsAnimationSlide.appendChild(clonedClientsDesktop[i]);
    }
}

const startFadeAnimation = () => {
    clientsAnimationSlide.innerHTML = '';
    clientsAnimationSlide.classList.remove('infinite-slide');
    showClients();
    setInterval(() => {
        clientsAnimationSlide.classList.remove('fade-in');
        clientsAnimationSlide.classList.add('fade-out');
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                clientsAnimationSlide.removeChild(clonedClientsDesktop[i]);
            }
            for (let i = 0; i < 5; i++) {
                const clients = clonedClientsDesktop.shift()
                clonedClientsDesktop.push(clients)
            }
            for (let i = 0; i < 5; i++) {
                clientsAnimationSlide.classList.remove('fade-out');
                clientsAnimationSlide.classList.add('fade-in');
                clientsAnimationSlide.appendChild(clonedClientsDesktop[i]);
            }
        }, ANIMATION_TIMEOUT)
    }, ANIMATION_INTERVAL)
}

const startSlideAnimation = () => {
    clientsAnimationSlide.innerHTML = '';
    clonedClientsMobile.concat(clonedClientsMobile)
        .map(data => {
            const slideClient = data.cloneNode(true);
            clientsAnimationSlide.appendChild(slideClient);
        });
    clientsAnimationSlide.classList.add('infinite-slide');
}

function init() {
    const screenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if (screenWidth >= WINDOW_BREAKPOINT) { //todo: change if tablet version is added
        startFadeAnimation();
    } else {
        startSlideAnimation();
    }
}

init();