import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Portal from 'react-portal';

import bindAll from '../utils/bindAll';

const throttle = (fn, wait) => {
	let time = Date.now();
	return () => {
		if ((time + wait - Date.now()) < 0) {
			fn();
			time = Date.now();
		}
	};
};
/**
 * @module Dropdown
 */
class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		bindAll(this,
			'getContentPosition',
			'toggleContent',
			'onClick',
			'onKeyDown',
			'onBodyClick',
			'onBodyKeyDown'
		);

		this.state = {
			isActive: props.isActive || false,
			posX: 0,
			posY: 0
		};
	}

	getContentPosition() {
		const {left, top, width, height} = this.triggerRef.getBoundingClientRect();
		const scrollTop = window.scrollY || window.pageYOffset;
		const contentWidth = parseInt(this.props.maxWidth);
		const getCoordX = (alignment) => {
			switch (alignment) {
				case 'left':
					return left;
				case 'center':
					return left + (width/2);
				default:
					return left - (contentWidth - width);
			}
		};

		const ddPosition = {
			x: getCoordX(this.props.align),
			y: scrollTop + top + height
		};

		this.setState(() => ({
			posX: ddPosition.x,
			posY: ddPosition.y
		}));
	}

	closeContent(e) {
		if (this.props.manualToggle && this.props.isActive) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({ isActive: false }));
		}
	}

	toggleContent(e) {
		this.getContentPosition();

		if (this.props.manualToggle) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({ isActive: !this.state.isActive }));
		}
	}

	onClick(e) {
		e.preventDefault();
		this.toggleContent(e);

		if (this.props.onClick) {
			this.props.onClick(e);
		}
	}

	onKeyDown(e) {
		if (e.key === 'Enter') {
			this.toggleContent();
		}
	}

	onBodyClick(e) {
		const isNotDropdownClick = [
			this.contentRef,
			this.triggerRef
		].every(ref => !ref.contains(e.target));

		if (isNotDropdownClick) {
			this.closeContent(e);
		}
	}

	onBodyKeyDown(e) {
		if (e.key === 'Escape') {
			this.closeContent();
		}
	}

	componentDidMount() {
		document.body.addEventListener('click', this.onBodyClick);
		document.body.addEventListener('keydown', this.onBodyKeyDown);
		window.addEventListener('resize', throttle(this.getContentPosition, 1000/60)); // 1000/60 because 60fps
		document.addEventListener('scroll', throttle(this.getContentPosition, 1000/60), true); // 1000/60 because 60fps
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.onBodyClick);
		document.body.removeEventListener('keydown', this.onBodyKeyDown);
		window.removeEventListener('resize', this.getContentPosition);
		document.removeEventListener('scroll', this.getContentPosition);
	}

	render() {
		const isActive = this.props.manualToggle ? this.props.isActive : this.state.isActive;
		const {
			className,
			trigger,
			content,
			align, // eslint-disable-line no-unused-vars
			maxWidth,
			minWidth,
			...other
		} = this.props;

		// this.props.onClick is consumed in this.onClick
		// Do not pass along to children
		delete other.onClick;

		const classNames = {
			dropdown: cx(
				className,
				'dropdown'
			),
			trigger: cx(
				'dropdown-trigger',
				{
					'dropdown-trigger--active': isActive
				}
			),
			content: cx(
				'dropdown-content',
				{
					'dropdown-content--right': (align === 'right'),
					'dropdown-content--left': (align === 'left'),
					'dropdown-content--center': (align === 'center'),
					'display--none': !isActive,
					'display--block': isActive
				}
			)
		};

		return (
			<div
				className={classNames.dropdown}
				aria-haspopup='true'
				onKeyDown={this.onKeyDown}
				{...other}
			>

				<div
					ref={(el) => this.triggerRef = el}
					className={classNames.trigger}
					tabIndex='0'
					onClick={this.onClick}
				>
					{trigger}
				</div>

				<Portal isOpened={isActive}>
					<div
						ref={(el) => this.contentRef = el}
						className={classNames.content}
						aria-hidden={!isActive}
						style={{
							left: `${this.state.posX}px`,
							top: `${this.state.posY}px`,
							minWidth: `${minWidth}`,
							maxWidth: `${maxWidth}`
						}}
					>
						{content}
					</div>
				</Portal>
			</div>
		);
	}
}

Dropdown.defaultProps = {
	maxWidth: '384px',
	minWidth: '0px'
};

Dropdown.propTypes = {
	trigger: PropTypes.element.isRequired,
	content: PropTypes.element.isRequired,
	align: PropTypes.oneOf(['left', 'right', 'center']).isRequired,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	manualToggle: PropTypes.func,
	maxWidth: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	minWidth: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
};

export default Dropdown;
