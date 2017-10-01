/// <reference types="react" />
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
export declare const defaultProps: {
    className: null;
    viewBox: string;
    onClick: () => void;
    onMouseDown: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseUp: () => void;
};
export declare class SvgIcon extends React.PureComponent<SvgIconProps, {}> {
    static defaultProps: {
        className: null;
        viewBox: string;
        onClick: () => void;
        onMouseDown: () => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseUp: () => void;
    };
    render(): JSX.Element;
}
