import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverTrigger
 */
class PopoverTrigger extends React.Component {
	constructor (props) {
		super(props);

		this.toggleActive = this.toggleActive.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	toggleActive() {
		this.props.onToggleActive(!this.props.active);
	}

	handleKeyDown(e) {
		if (e.key === 'Enter'){
			this.toggleActive();
		}
	}

	handleClick() {
		this.toggleActive();
	}

	render() {
		const {
			children,
			className,
			isActive,
			tabIndex,
			...other
		} = this.props;

		const classNames = cx(
			'popover-trigger',
			{
				'popover-trigger--active': isActive,
				'popover-trigger--inactive': !isActive
			},
			className
		);

		return (
			<div
				className={classNames}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				tabIndex={tabIndex ? tabIndex : -1}
				role='button'
				{...other}
			>
				{children}
			</div>
		);
	}

}
PopoverTrigger.propTypes = {
	isActive: React.PropTypes.bool,
	tabIndex: React.PropTypes.number
};

export default PopoverTrigger;
