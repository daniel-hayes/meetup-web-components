import PropTypes from "prop-types";
import React from "react";
import cx from "classnames";
import Portal from "react-portal";

import bindAll from "../utils/bindAll";

const throttle = (fn, wait) => {
	let time = Date.now();
	return () => {
		if (time + wait - Date.now() < 0) {
			fn();
			time = Date.now();
		}
	};
};

const ConditionalWrap = ({condition, wrap, children}) => condition ? wrap(children) : children;

/**
 * @module Dropdown
 */
class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		bindAll(
			this,
			"getContentPosition",
			"toggleContent",
			"onClick",
			"onKeyDown",
			"onBodyClick",
			"onBodyKeyDown"
		);

		this.state = {
			isActive: props.isActive || false,
			left: "0px",
			top: "0px"
		};
	}

	getContentPosition() {
		if (!this.triggerRef) {
			return;
		}

		const positionTarget = this.triggerRef.offsetParent ? this.triggerRef.offsetParent : this.triggerRef;
		const {
			left,
			top,
			width,
			height
		} = positionTarget.getBoundingClientRect();

		const scrollTop = window.scrollY || window.pageYOffset;
		const getLeftPos = alignment => {
			switch (alignment) {
				case 'left':
					return `${left}px`;
				case 'center':
					return `${left + width / 2}px`;
				default:
					return `${left + width}px`;
			}
		};

		const ddPosition = {
			left: this.props.shouldPortal && getLeftPos(this.props.align),
			top: this.props.shouldPortal && (scrollTop + top + height)
		};

		this.setState(() => ({
			left: ddPosition.left,
			top: ddPosition.top
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
		if (e.key === "Enter") {
			this.toggleContent();
		}
	}

	onBodyClick(e) {
		if (!this.contentRef || !this.triggerRef) {
			return;
		}

		const isNotDropdownClick = [this.contentRef, this.triggerRef].every(
			ref => !ref.contains(e.target)
		);

		if (isNotDropdownClick) {
			this.closeContent(e);
		}
	}

	onBodyKeyDown(e) {
		if (e.key === "Escape") {
			this.closeContent();
		}
	}

	componentDidMount() {
		document.body.addEventListener("click", this.onBodyClick);
		document.body.addEventListener("keydown", this.onBodyKeyDown);
		window.addEventListener(
			"resize",
			throttle(this.getContentPosition, 1000 / 60)
		); // 1000/60 because 60fps
		document.addEventListener(
			"scroll",
			throttle(this.getContentPosition, 1000 / 60),
			true
		); // 1000/60 because 60fps
	}

	componentWillUnmount() {
		document.body.removeEventListener("click", this.onBodyClick);
		document.body.removeEventListener("keydown", this.onBodyKeyDown);
		window.removeEventListener("resize", this.getContentPosition);
		document.removeEventListener("scroll", this.getContentPosition);
	}

	render() {
		const isActive = this.props.manualToggle
			? this.props.isActive
			: this.state.isActive;
		const {
			className,
			trigger,
			content,
			align, // eslint-disable-line no-unused-vars
			maxWidth,
			minWidth,
			shouldPortal,
			...other
		} = this.props;

		// this.props.onClick is consumed in this.onClick
		// Do not pass along to children
		delete other.onClick;

		const classNames = {
			dropdown: cx(
				className,
				"dropdown", {
					"dropdown--noPortal": !shouldPortal
				}
			),
			trigger: cx("dropdown-trigger", {
				"dropdown-trigger--active": isActive
			}),
			content: cx("dropdown-content", {
				"dropdown-content--right": align === "right",
				"dropdown-content--left": align === "left",
				"dropdown-content--center": align === "center",
				"display--none": !isActive,
				"display--block": isActive
			})
		};

		return (
			<div
				className={classNames.dropdown}
				aria-haspopup="true"
				onKeyDown={this.onKeyDown}
				{...other}
			>
				<div
					ref={el => (this.triggerRef = el)}
					className={classNames.trigger}
					tabIndex="0"
					onClick={this.onClick}
				>
					{trigger}
				</div>

				<ConditionalWrap
					condition={shouldPortal}
					wrap={children => <Portal isOpened={isActive}>{children}</Portal>}
				>
					<div
						ref={el => (this.contentRef = el)}
						className={classNames.content}
						aria-hidden={!isActive}
						style={{
							left: this.state.left,
							right: !shouldPortal && `-${maxWidth}`,
							top: this.state.top,
							minWidth: minWidth,
							maxWidth: maxWidth
						}}
					>
						{content}
					</div>
				</ConditionalWrap>
			</div>
		);
	}
}

Dropdown.defaultProps = {
	maxWidth: "384px",
	minWidth: "0px",
	shouldPortal: true
};

Dropdown.propTypes = {
	trigger: PropTypes.element.isRequired,
	content: PropTypes.element.isRequired,
	align: PropTypes.oneOf(["left", "right", "center"]).isRequired,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	manualToggle: PropTypes.func,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	shouldPortal: PropTypes.bool,
};

export default Dropdown;
