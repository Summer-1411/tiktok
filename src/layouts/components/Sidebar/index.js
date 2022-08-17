import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/configs';
import icons from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to="/" icon={icons.homeIcon} />
                <MenuItem title="Following" to={config.routes.following} icon={icons.userGroupIcon} />
                <MenuItem title="Live" to={config.routes.live} icon={icons.liveIcon} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
