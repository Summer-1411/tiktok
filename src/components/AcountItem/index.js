import classNames from 'classnames/bind';
import styles from './AcountItem.module.scss';

const cx = classNames.bind(styles);
function AcountItem() {
    return (
        <div className={cx('wraper')}>
            <img
                className={cx('avatar')}
                src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2020/08/blackpink-jisoo-phim-moi-snowdrop-1-696x1043.jpg?fit=700%2C20000&quality=95&ssl=1"
                alt="ThaoBap"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <p>Thao Bap</p>
                    <span className={cx('icon-check')}>
                        <i className="fas fa-check-circle"></i>
                    </span>
                </h4>
                <span className={cx('use-name')}>thaobap</span>
            </div>
        </div>
    );
}

export default AcountItem;
