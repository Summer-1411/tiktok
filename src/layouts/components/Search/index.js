import { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import AcountItem from '~/components/AcountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/searchServices';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchvalue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    let debounced = useDebounce(searchValue, 500);
    // useEffect(() => {
    //     if (!debounced.trim()) {
    //         setSearchResult([]);
    //         return;
    //     }
    //     setLoading(true);
    //     request
    //         .get('users/search', {
    //             params: {
    //                 q: debounced,
    //                 type: 'less',
    //             },
    //         })

    //         .then((res) => {
    //             console.log(res);
    //             setSearchResult(res.data);
    //             setLoading(false);
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });
    // }, [debounced]);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            console.log(result);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);
    const handleClear = () => {
        setSearchvalue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchvalue(searchValue);
        }
    };
    return (
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('title-acount')}>Account</h4>
                            {searchResult.map((result) => (
                                <AcountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        className={cx('input-search')}
                        type="text"
                        placeholder="Tìm kiếm tài khoản và video"
                        value={searchValue}
                        onFocus={() => setShowResult(true)}
                        onChange={handleChange}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <i className="fas fa-times-circle"></i>
                        </button>
                    )}
                    {loading && (
                        <button className={cx('loading')}>
                            <i className="fas fa-spinner"></i>
                        </button>
                    )}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
