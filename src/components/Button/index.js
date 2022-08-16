import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    primary,
    rounded,
    disabled,
    text,
    outline,
    large,
    small,
    children,
    onClick,
    className,
    ...passProps
}) {
    // console.log(styles);
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    //remove event listener when button disabled
    if (disabled) {
        Object.keys(props).forEach((propKey) => {
            console.log(props[propKey]);
            if (propKey.startsWith('on') && typeof props[propKey] === 'function') {
                delete props[propKey];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', className, {
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
    });
    return (
        <Comp className={classes} {...props}>
            <span>{children}</span>
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.bool,
    outline: PropTypes.bool,
    large: PropTypes.bool,
    small: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};
export default Button;
