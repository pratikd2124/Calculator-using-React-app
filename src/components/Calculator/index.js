import React, { useState } from 'react';
import { Container, Screen, Previous, Current, Button } from './Styled'
import './index.css';

export default function Calculator() {

    const [previous, setPrevious] = useState('');
    const [current, setCurrent] = useState('');
    const [operation, setOperation] = useState('');
    
    
    const appendValue = (el) => {
        const value = el.target.getAttribute('data');
        
        if (value === '.' && current.includes('.')) return 
        setCurrent(current + value)
        
    }
    
    const handledelete = () => {
        setCurrent(String(current.slice(0, -1)))
    }
    const allclear = () => {
        setCurrent('');
        setPrevious('');
        setOperation('');
    }

    const chooseoperation = (el) => {
        
        if (current === '') return
        if (previous !== '') {
            let value = compute();
            setPrevious(value) 
        }
        else {
            setPrevious(current)
        }
        setCurrent('')
        setOperation(el.target.getAttribute('data'))

    }

    const equals = () => {
        let value = compute();
        if (value === undefined) return
        
        setCurrent(value)
        setPrevious('')
        setOperation('')
    }

    const compute = () => {
        let result
        let previousnum = parseFloat(previous)
        let currentnum = parseFloat(current)

        if (isNaN(previousnum) || isNaN(currentnum)) return
        
        switch (operation) {
            case '÷':
                result = previousnum / currentnum;
                break;
            
            case 'x':
                result = previousnum * currentnum;
                break;
            
            case '+':
                result = previousnum + currentnum;
            break;
        
            case '-':
                result = previousnum - currentnum;
                break;
            default:
                return 
        }
        return result;
    }

    return (
        <Container>
            <Screen>
                <Previous>{previous} { operation }</Previous>
                <Current>{ current }</Current>
            </Screen>
            <Button id="ac" gridSpan={2} onClick={ allclear }>AC</Button>
            <Button control onClick={ handledelete }>DEL</Button>
            <Button data={ '÷' } onClick={chooseoperation} operation>÷</Button>
            <Button data={ '7' } onClick={appendValue}>7</Button>
            <Button data={ '8' } onClick={appendValue}>8</Button>
            <Button data={ '9' } onClick={appendValue}>9</Button>
            <Button data={ 'x' } onClick={chooseoperation} operation>x</Button>
            <Button data={ '4' } onClick={appendValue}>4</Button>
            <Button data={ '5' } onClick={appendValue}>5</Button>
            <Button data={ '6' } onClick={appendValue}>6</Button>
            <Button data={ '+' } onClick={chooseoperation} operation>+</Button>
            <Button data={ '1' } onClick={appendValue}>1</Button>
            <Button data={ '2' } onClick={appendValue}>2</Button>
            <Button data={ '3' } onClick={appendValue}>3</Button>
            <Button data={ '-' } onClick={chooseoperation} operation>-</Button>
            <Button data={ '.' } period onClick={appendValue}>.</Button>
            <Button data={ '0' } onClick={appendValue}>0</Button>
            <Button id="equals" onClick={equals} gridSpan={2}>=</Button>
            

        </Container>
        
    )
}