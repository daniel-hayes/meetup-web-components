import React from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import PopoverMenuOption from './PopoverMenuOption';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			activeIndex: 0,
		};

		this.onSelectionMade = this.onSelectionMade.bind(this);
		this.moveSelectionUp = this.moveSelectionUp.bind(this);
		this.moveSelectionDown = this.moveSelectionDown.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.normalizeSelectedBy = this.normalizeSelectedBy.bind(this);
		this.focusOption = this.focusOption.bind(this);
		this.updateFocusIndexBy = this.updateFocusIndexBy.bind(this);
		this.renderOptions = this.renderOptions.bind(this);
	}

	onSelectionMade() {
		this.props.onSelectionMade();
	}

	moveSelectionUp() {
		this.updateFocusIndexBy(-1);
	}

	moveSelectionDown() {
		this.updateFocusIndexBy(1);
	}

	handleKeys(e) {
		const options = {
			ArrowDown: this.moveSelectionDown,
			ArrowUp: this.moveSelectionUp
		};
		if(options[e.key]){
			options[e.key].call(this);
		}
	}

	normalizeSelectedBy(delta, numOptions) {
		this.selectedIndex += delta;
		if (this.selectedIndex > numOptions - 1) {
			this.selectedIndex = 0;
		} else if (this.selectedIndex < 0) {
			this.selectedIndex = numOptions - 1;
		}
	}

	focusOption(index) {
		this.selectedIndex = index;
		this.updateFocusIndexBy(0);
	}

	updateFocusIndexBy(delta) {
		const optionNodes = findDOMNode(this).querySelectorAll('.popover-option');
		this.normalizeSelectedBy(delta, optionNodes.length);
		this.setState({activeIndex: this.selectedIndex}, function () {
			optionNodes[this.selectedIndex].focus();
		});
	}

	renderOptions() {
		let index = 0;
		return React.Children.map(this.props.children, function(c){
			let clonedOption = c;
			if (c === null) {
				return false;
			} else if (c.type === PopoverMenuOption) {
				const active = this.state.activeIndex === index;
				clonedOption = React.cloneElement(c, {
					active: active,
					index: index,
					_internalFocus: this.focusOption,
					_internalSelect: this.onSelectionMade
				});
				index++;
			}
			return clonedOption;
		}.bind(this));
	}

	render() {
		const {
			className,
			isActive,
			horizontalPlacement,
			verticalPlacement,
			height,
			...other
		} = this.props;

		const classNames = cx(
			'popover-container',
			'popover-container--menu',
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
				role='menu'
				tabIndex='-1'
				aria-hidden={!isActive}
				aria-expanded={isActive}
				onKeyDown={this.handleKeys}
				style={{bottom: verticalPlacement == 'top' ? `${height}px` : 'initial'}}
				{...other}
			>
				{this.renderOptions()}
			</div>
		);
	}

}
PopoverMenu.propTypes = {
	isActive: React.PropTypes.bool,
	horizontalPlacement: React.PropTypes.string,
	verticalPlacement: React.PropTypes.string,
	height: React.PropTypes.string,
};
export default PopoverMenu;
