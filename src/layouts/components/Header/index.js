import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '~/configs';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu/Menu';
import Image from '~/components/Image/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <i className="fas fa-globe-asia"></i>,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <i className="far fa-question-circle"></i>,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <i className="fas fa-keyboard"></i>,
        title: 'keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;
    const handleChangeMenu = (menuItem) => {
        console.log(menuItem);
    };

    const userMenu = [
        {
            icon: <i className="far fa-user"></i>,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <i className="fab fa-tiktok"></i>,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <i className="fas fa-cog"></i>,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <i className="fas fa-sign-out-alt"></i>,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="" />
                </Link>

                {/* Search */}
                <Search />
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <i className="far fa-paper-plane"></i>
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <i className="far fa-comment-alt"></i>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary onClick={() => alert('clicked !')}>
                                Login
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleChangeMenu}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://afamilycdn.com/zoom/700_438/150157425591193600/2020/12/28/jisoo-for-harpers-bazaar-korea-magazine-may-2019-issue-black-pink-42816517-1062-1500-1609155402285897518832-572-0-1128-1062-crop-16091554467731498658741.jpg"
                                fallback="https://static.fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png"
                                alt=""
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
