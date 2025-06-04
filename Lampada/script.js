const lamp = document.getElementById('lamp');

lamp.addEventListener('click', () => {

    document.body.classList.toggle('modo-escuro');

   
    if (document.body.classList.contains('modo-escuro')) {
        lamp.src = 'assets/lamp_off.png';
        document.body.style.background = 'radial-gradient(circle, white 8%, black 100%)';
    } else {
        lamp.src = 'assets/lamp_on.png';
        document.body.style.background = 'radial-gradient(circle, yellow 8%, white 100%)';
    }
});