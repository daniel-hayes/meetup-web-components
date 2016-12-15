import React from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverContent from './PopoverContent';


/**
 * @module Popover
 */
class Popover extends React.Component {
	constructor (props) {
		super(props);

		this.closeMenu = this.closeMenu.bind(this);
		this.focusTrigger = this.focusTrigger.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleTriggerToggle = this.handleTriggerToggle.bind(this);
		this.afterTriggerToggle = this.afterTriggerToggle.bind(this);
		this.updatePositioning = this.updatePositioning.bind(this);
		this.handleKeys = this.handleKeys.bind(this);

		this.state = {
			_isMounted: false,
			isActive: false,
		};
	}

	closeMenu(callback) {
		if (callback) {
			this.setState({isActive: false}, callback);
		} else {
			this.setState({isActive: false});
		}
	}

	focusTrigger() {
		findDOMNode(this.trigger).focus();
	}

	onSelectionMade() {
		this.closeMenu(this.focusTrigger);
	}

	handleBlur(e) {
		// give next element a tick to take focus
		setTimeout(function() {
			if (!this.state._isMounted) {
				return;
			}
			if (!findDOMNode(this).contains(document.activeElement) && this.state.isActive){
				this.closeMenu();
			}
		}.bind(this), 1);
	}

	handleTriggerToggle() {
		this.setState({isActive: !this.state.isActive}, this.afterTriggerToggle);
	}

	afterTriggerToggle() {
		if (this.state.isActive) {
			this.updatePositioning();
		}
	}

	updatePositioning() {
		const triggerRect = findDOMNode(this.trigger).getBoundingClientRect();
		const containerRect = findDOMNode(this.container).getBoundingClientRect();
		const positionState = {
			horizontalPlacement: this.props.preferredHorizontal,
			verticalPlacement: this.props.preferredVertical,
			height: containerRect.height
		};
		// Only update preferred placement positions if necessary to keep menu from
		// appearing off-screen.
		if (triggerRect.left + containerRect.width > window.innerWidth) {
			positionState.horizontalPlacement = 'left';
		} else if (containerRect.left < 0) {
			positionState.horizontalPlacement = 'right';
		}
		if (triggerRect.bottom + containerRect.height > window.innerHeight) {
			positionState.verticalPlacement = 'top';
		} else if (containerRect.top < 0) {
			positionState.verticalPlacement = 'bottom';
		}
		this.setState(positionState);
	}

	handleKeys(e) {
		if (e.key === 'Escape') {
			this.closeMenu(this.focusTrigger);
		}
	}

	renderTrigger() {
		let trigger;
		React.Children.forEach(this.props.children, function(child){
			if (child.type === PopoverTrigger) {
				trigger = React.cloneElement(child, {
					ref: (div) => this.trigger = div,
					onToggleActive: this.handleTriggerToggle,
					isActive: this.state.isActive
				});
			}
		}.bind(this));
		return trigger;
	}

	renderMenuOptions() {
		let options;
		React.Children.forEach(this.props.children, function(child){
			if (child.type === PopoverMenu) {
				options = React.cloneElement(child, {
					ref: (div) => this.container = div,
					isActive: this.state.isActive,
					horizontalPlacement: this.state.horizontalPlacement,
					verticalPlacement: this.state.verticalPlacement,
					height: this.state.height,
					onSelectionMade: this.onSelectionMade.bind(this)
				});
			}
		}.bind(this));
		return options;
	}

	renderMenuContainer() {
		let container;
		React.Children.forEach(this.props.children, function(child){
			if (child.type === PopoverContent) {
				container = React.cloneElement(child, {
					ref: (div) => this.container = div,
					isActive: this.state.isActive,
					horizontalPlacement: this.state.horizontalPlacement,
					verticalPlacement: this.state.verticalPlacement,
					height: this.state.height
				});
			}
		}.bind(this));
		return container;
	}

	componentDidMount() {
		this.setState({_isMounted: true});
	}

	componentWillUnmount() {
		this.setState({_isMounted: false});
	}

	render() {
		const {
			className,
			...other
		} = this.props;

		const classNames = cx(
			'popover',
			className
		);

		return (
			<div
				className={classNames}
				onKeyDown={this.handleKeys}
				onBlur={this.handleBlur}
				{...other}
			>
				{this.renderTrigger()}
				{this.renderMenuOptions()}
				{this.renderMenuContainer()}
			</div>
		);
	}
}

export default Popover;
