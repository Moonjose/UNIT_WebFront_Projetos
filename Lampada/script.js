const lamp = document.getElementById('lamp');
let isOn = false;

lamp.addEventListener('click', () => {
    isOn = !isOn;

    
    lamp.src = isOn ? 'assets/lamp_on.png' : 'assets/lamp_off.png';

    
    document.body.style.background = isOn
        ? 'radial-gradient(circle, yellow 8%, white 100%)'
        : 'radial-gradient(circle, white 8%, black 100%)';
});
