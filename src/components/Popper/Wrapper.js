import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Wraper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Wraper;
