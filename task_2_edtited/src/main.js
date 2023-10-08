
let currencies = fetch('https://v6.exchangerate-api.com/v6/14b528c322e36750a4876fc8/latest/USD')
    .then(response => response.text())
    .then(text => {
        let rate = JSON.parse(text);
        let currencyKeys = Object.entries(rate.conversion_rates);

        for (let i = 0; i < currencySelect.length; i++) {
            for (let j = 0; j < currencyKeys.length; j++) {
                let currencyName = currencyKeys[j][0];
                let option = document.createElement('option');
                option.className = `currency ${currencyName}`;
                option.innerHTML = `${currencyName}`;
                currencySelect[i].appendChild(option);
            }
        }
        
    });

const currencySelect = document.querySelectorAll('#currencySelect'),
    currencyInputs = document.querySelectorAll('#currencyInput');

currencyInputs.forEach((input) => {
    input.addEventListener('input', () => {

        let selectedCurs = [currencySelect[0].value, currencySelect[1].value];

        if (selectedCurs[0] === selectedCurs[1]) {
            alert('Пожалуйста, измените одну из валют');
            input.value = '';
        } else {
            let conversionAPI = fetch(`https://v6.exchangerate-api.com/v6/14b528c322e36750a4876fc8/pair/${selectedCurs[0]}/${selectedCurs[1]}`)
                .then(response => response.text())
                .then(text => {
                    let conversion = JSON.parse(text),
                        conversionRate = conversion.conversion_rate;

                    if (input.className === 'input-left') {
                        currencyInputs[1].value = Math.round(input.value * conversionRate * 100) / 100;
                    } else if (input.className === 'input-right') {
                        currencyInputs[0].value = Math.round(input.value / conversionRate * 100) / 100;
                    }
                });
        }
    });
});

currencySelect.forEach((selection) => {
    selection.addEventListener('change', () => {
        if (currencyInputs[0].value || currencyInputs[1].value) {
            let selectedCurs = [currencySelect[0].value, currencySelect[1].value];

            let conversion = fetch(`https://v6.exchangerate-api.com/v6/14b528c322e36750a4876fc8/pair/${selectedCurs[0]}/${selectedCurs[1]}`)
                .then(response => response.text())
                .then(text => {
                    let conversion = JSON.parse(text),
                        conversionRate = conversion.conversion_rate;

                    console.log(conversionRate);

                    let input = selection.parentElement.querySelector('input'),
                        siblingInput = input.className === 'input-left' ? document.querySelector('.input-right')
                            : document.querySelector('.input-left');

                    if (input.className === 'input-left') {
                        currencyInputs[0].value = Math.round(siblingInput.value * conversionRate * 100) / 100;
                    } else if (input.className === 'input-right') {
                        currencyInputs[1].value = Math.round(siblingInput.value / conversionRate * 100) / 100;
                    }
                });
        }
    });
});
