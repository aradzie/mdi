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
export declare const propTypes: {
    children: React.Validator<any>;
    className: React.Requireable<any>;
    viewBox: React.Requireable<any>;
    onClick: React.Requireable<any>;
    onMouseDown: React.Requireable<any>;
    onMouseEnter: React.Requireable<any>;
    onMouseLeave: React.Requireable<any>;
    onMouseUp: React.Requireable<any>;
};
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
    static propTypes: {
        children: React.Validator<any>;
        className: React.Requireable<any>;
        viewBox: React.Requireable<any>;
        onClick: React.Requireable<any>;
        onMouseDown: React.Requireable<any>;
        onMouseEnter: React.Requireable<any>;
        onMouseLeave: React.Requireable<any>;
        onMouseUp: React.Requireable<any>;
    };
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
