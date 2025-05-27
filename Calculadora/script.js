const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            display.textContent = '';
        } else if (value === '<') {

            display.textContent = display.textContent.slice(0, -1);
        } else if (value === '=') {
            try {
                
                const resultado = eval(display.textContent.replace(/x/g, '*'));
                display.textContent = resultado;
            } catch (err) {
                display.textContent = 'Erro';
            }
        } else {
            display.textContent += value;
        }
    });
});
