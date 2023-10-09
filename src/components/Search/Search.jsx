import React, {useCallback, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import debounce from "lodash.debounce"
import {clear, edit, selectSearchSearchQuery} from '../../redux/slices/searchSlice'
import styles from './Search.module.scss'
import search from '../../assets/img/search.svg'
import close from '../../assets/img/close.svg'

const Search = () => {
    const searchValue = useSelector(selectSearchSearchQuery)
    const [inputValue, setInputValue] = useState(searchValue)
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onClickClear = () => {
        setInputValue('')
        dispatch(clear())
        inputRef.current.focus()
    }

    const changeSearchQuery = useCallback(
        debounce(val =>
            dispatch(edit(val)), 400)
        , []
    )

    const changeInput = (val) => {
        setInputValue(val)
        changeSearchQuery(val)
    }

    return (
        <div className={styles.root}>
            <img className={styles.searchIcon} src={search} alt='SearchLogo'/>
            <input
                ref={inputRef}
                value={inputValue}
                onChange={e => changeInput(e.target.value)}
                className={styles.input}
                placeholder='Поиск пиццы'
            />
            {searchValue &&
                <img onClick={() => onClickClear()} className={styles.clearIcon} src={close} alt='CloseLogo'/>
            }
        </div>
    );

};

export default Search;
