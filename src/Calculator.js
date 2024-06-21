import React, { useState } from 'react';

function Calculator() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState(null);

    const calculate = async () => {
        const response = await fetch('http://localhost:5000/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num1: parseFloat(num1), num2: parseFloat(num2), operation }),
        });

        const data = await response.json();
        if (response.ok) {
            setResult(data.result);
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <h1>Calculator</h1>
            <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="Number 1" />
            <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="Number 2" />
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
                <option value="divide">Divide</option>
            </select>
            <button onClick={calculate}>Calculate</button>
            {result !== null && <h2>Result: {result}</h2>}
        </div>
    );
}

export default Calculator;