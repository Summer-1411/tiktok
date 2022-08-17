import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items, hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    const handleBack = () => {
        setHistory((pre) => pre.slice(0, pre.length - 1));
    };
    const renderResult = (attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('content-main')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}> {renderItem()}</div>
            </PopperWrapper>
        </div>
    );

    const handleResetToFirstPage = () => {
        setHistory((pre) => pre.slice(0, 1));
    };
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[10, 10]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
