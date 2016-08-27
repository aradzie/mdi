import * as classNames from "classnames";
import * as React from "react";

export interface SvgIconProps {
    className?: any;
    viewBox?: string;
    onClick?: React.MouseEventHandler<{}>;
    onMouseDown?: React.MouseEventHandler<{}>;
    onMouseEnter?: React.MouseEventHandler<{}>;
    onMouseLeave?: React.MouseEventHandler<{}>;
    onMouseUp?: React.MouseEventHandler<{}>;
}

export const propTypes = {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.any,
    viewBox: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
};

export const defaultProps = {
    className: null,
    viewBox: "0 0 24 24",
    onClick: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
};

export class SvgIcon extends React.PureComponent<SvgIconProps, {}> {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    render() {
        const self = this;
        const {
            props: {
                children,
                className,
                viewBox,
                onClick,
                onMouseDown,
                onMouseEnter,
                onMouseLeave,
                onMouseUp,
            },
        } = self;
        const cn = classNames("Icon", className);
        return (
            <svg className={cn}
                viewBox={viewBox}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
            >
                {children}
            </svg>
        );
    }
}
