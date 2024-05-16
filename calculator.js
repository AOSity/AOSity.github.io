document.addEventListener("DOMContentLoaded", function () {
    const primaryDisplay = document.querySelector('.fc-prim');
    const secondaryDisplay = document.querySelector('.fc-sec');
    let currentValue = '';
    let previousValue = '';
    let currentOperator = '';

    function updatePrimaryDisplay(value) {
        primaryDisplay.value = value;
    }

    function updateSecondaryDisplay(value) {
        secondaryDisplay.value = value;
    }

    function handleNumberClick(number) {
        currentValue += number;
        updatePrimaryDisplay(currentValue);
    }

    function handleOperatorClick(operator) {
        if (currentValue !== '') {
            if (currentOperator !== '') {
                calculate();
            }
            previousValue = currentValue;
            currentOperator = operator;
            currentValue = '';
            updatePrimaryDisplay(currentValue);
            updateSecondaryDisplay(previousValue + ' ' + currentOperator);
        } else {
            if (currentOperator !== '') {
                currentOperator = operator;
                updateSecondaryDisplay(previousValue + ' ' + currentOperator);
            }
        }
    }

    function calculate() {
        const newValue = parseFloat(currentValue);
        let result;

        switch (currentOperator) {
            case '+':
                result = parseFloat(previousValue) + newValue;
                break;
            case '-':
                result = parseFloat(previousValue) - newValue;
                break;
            case '*':
                result = parseFloat(previousValue) * newValue;
                break;
            case '/':
                result = parseFloat(previousValue) / newValue;
                break;
            case '%':
                result = (parseFloat(previousValue) * parseFloat(currentValue)) / 100;
                break;
            default:
                return;
        }

        currentValue = result.toString();
        updatePrimaryDisplay(currentValue);
        currentOperator = '';
        updateSecondaryDisplay('');
    }

    function handleClear() {
        currentValue = '';
        previousValue = '';
        currentOperator = '';
        updatePrimaryDisplay('');
        updateSecondaryDisplay('');
    }

    function handleClearEntry() {
        currentValue = '';
        updatePrimaryDisplay('');
    }

    function handleBackspace() {
        currentValue = currentValue.slice(0, -1);
        updatePrimaryDisplay(currentValue);
    }

    function handleInverse() {
        if (currentValue !== '') {
            const value = parseFloat(currentValue);
            currentValue = (1 / value).toString();
            updatePrimaryDisplay(currentValue);
        }
    }

    function handleSquare() {
        if (currentValue !== '') {
            const value = parseFloat(currentValue);
            currentValue = (value * value).toString();
            updatePrimaryDisplay(currentValue);
        }
    }

    function handleSquareRoot() {
        if (currentValue !== '') {
            const value = parseFloat(currentValue);
            currentValue = Math.sqrt(value).toString();
            updatePrimaryDisplay(currentValue);
        }
    }

    function handleNegate() {
        if (currentValue !== '') {
            const value = parseFloat(currentValue);
            currentValue = (-value).toString();
            updatePrimaryDisplay(currentValue);
        }
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (!isNaN(value)) {
                handleNumberClick(value);
            } else if (value === '.') {
                if (!currentValue.includes('.')) {
                    if (currentValue === '') {
                        handleNumberClick('0');
                    }
                    handleNumberClick(value);
                }
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                handleOperatorClick(value);
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                handleClear();
            } else if (value === 'CE') {
                handleClearEntry();
            } else if (value === '←') {
                handleBackspace();
            } else if (value === '1/x') {
                handleInverse();
            } else if (value === 'x²') {
                handleSquare();
            } else if (value === '√x') {
                handleSquareRoot();
            } else if (value === '+/-') {
                handleNegate();
            }
        });
    });
});
