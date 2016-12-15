import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverContent
 */
class PopoverContent extends React.Component {
	render() {
		const {
			className,
			isActive,
			horizontalPlacement,
			verticalPlacement,
			height,
			children,
			...other
		} = this.props;

		const classNames = cx(
			'popover-container',
			{
				'visibility--a11yHide': !isActive,
				'visibility--a11yShow': isActive,
				[`popover-container--horizontal-${horizontalPlacement}`]: typeof horizontalPlacement === 'string',
				[`popover-container--vertical-${verticalPlacement}`]: typeof verticalPlacement === 'string',
			},
			className
		);

		return (
			<div
				className={classNames}
				aria-hidden={!isActive}
				aria-expanded={isActive}
				style={{bottom: verticalPlacement == 'top' ? `${height}px` : 'initial'}}
				{...other}
			>
				{children}
			</div>
		);
	}
}
PopoverContent.propTypes = {
	isActive: React.PropTypes.bool,
	horizontalPlacement: React.PropTypes.string,
	verticalPlacement: React.PropTypes.string,
	height: React.PropTypes.string,
};
export default PopoverContent;
