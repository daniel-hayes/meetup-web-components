import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverMenuOption
 */
class PopoverMenuOption extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			activeIndex: 0,
		};

		this.onSelect = this.onSelect.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleHover = this.handleHover.bind(this);
	}

	onSelect() {
		if (this.props.onSelect) {
			this.props.onSelect();
		}
		this.props._internalSelect();
	}

	handleKeyDown(e) {
		e.preventDefault();
		if (e.key === 'Enter') {
			this.onSelect();
		}
	}

	handleClick() {
		this.onSelect();
	}

	handleHover() {
		this.props._internalFocus(this.props.index);
	}

	render() {
		const {
			isActive,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'popover-option',
			{
				'popover-option--active': isActive
			},
			className
		);

		return (
			<div
				onClick={this.handleClick}
				onKeyUp={this.handleKeyUp}
				onKeyDown={this.handleKeyDown}
				onMouseOver={this.handleHover}
				className={classNames}
				role='menuitem'
				tabIndex='-1'
				{...other}
			>
				{children}
			</div>
		);
	}

}
PopoverMenuOption.propTypes = {
	isActive: React.PropTypes.bool,
	onSelect: React.PropTypes.func,
};

export default PopoverMenuOption;
