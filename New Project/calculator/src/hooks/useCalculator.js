import { useState } from 'react';

export const useCalculator = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleNumber = (value) => {
    if (currentValue === '0') {
      setCurrentValue(value.toString());
    } else {
      setCurrentValue(currentValue + value.toString());
    }
  };

  const handleOperator = (op) => {
    if (operator && previousValue !== null) {
      calculate();
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setCurrentValue('0');
  };

  const calculate = () => {
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);

    if (isNaN(current) || isNaN(previous)) return;

    let total = 0;
    switch (operator) {
      case '+':
        total = previous + current;
        break;
      case '-':
        total = previous - current;
        break;
      case '*':
        total = previous * current;
        break;
      case '/':
        total = previous / current;
        break;
      default:
        return;
    }

    const totalString = (Math.round(total * 100000000) / 100000000).toString();
    setCurrentValue(totalString);
    setOperator(null);
    setPreviousValue(null);
  };

  const handleAction = (type) => {
    switch (type) {
      case 'AC':
        setCurrentValue('0');
        setOperator(null);
        setPreviousValue(null);
        break;
      case '⌫':
        if (currentValue.length > 1) {
          if (currentValue.length === 2 && currentValue.startsWith('-')) {
            setCurrentValue('0');
          } else {
            setCurrentValue(currentValue.slice(0, -1));
          }
        } else {
          setCurrentValue('0');
        }
        break;
      case '+/-':
        setCurrentValue((parseFloat(currentValue) * -1).toString());
        break;
      case '%':
        setCurrentValue((parseFloat(currentValue) / 100).toString());
        break;
      case '.':
        if (!currentValue.includes('.')) {
          setCurrentValue(currentValue + '.');
        }
        break;
    }
  };

  const handleInput = (type, value) => {
    switch (type) {
      case 'num':
        handleNumber(value);
        break;
      case 'operator':
        handleOperator(value);
        break;
      case 'action':
        handleAction(value);
        break;
      case 'equal':
        calculate();
        break;
    }
  };

  return {
    currentValue,
    previousValue,
    operator,
    handleInput,
  };
};
