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
export declare const defaultProps: Partial<SvgIconProps>;
export declare class SvgIcon extends React.PureComponent<SvgIconProps, {}> {
    static defaultProps: Partial<SvgIconProps>;
    render(): JSX.Element;
}
