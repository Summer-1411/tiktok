import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import Image from '../Image/Image';
import styles from './AcountItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function AcountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wraper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <p>{data.full_name}</p>
                    {data.tick && (
                        <span className={cx('icon-check')}>
                            <i className="fas fa-check-circle"></i>
                        </span>
                    )}
                </h4>
                <span className={cx('use-name')}>{data.nickname}</span>
            </div>
        </Link>
    );
}
AcountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AcountItem;
