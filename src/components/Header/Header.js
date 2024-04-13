import './Header.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUrl } from '../../redux/Main/actions';

const Header = () => {

    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    const handleClick = () => {
        if (inputValue) {
            dispatch(addUrl(inputValue))
        }
    }

    return (
        <div className='header_wrap'>
            <input
                placeholder='Enter repo URL'
                value={inputValue || ''}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleClick}>Load issues</button>
        </div>
    )
}

export default Header;