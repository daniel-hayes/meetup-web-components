import PropTypes from 'prop-types';
import React from 'react';
import Link from 'react-router-dom/Link';
import Icon from '../media/Icon';

import { Button as SwarmButton, LinkButton as SwarmLink } from '@meetup/swarm-components';

import {
	getButtonType,
	getSwarmSize,
	getIconPosition,
} from '@meetup/swarm-components/lib/utils/buttonUtils';

const BUTTON_COMPONENT_TYPES = ['a', 'button', 'Link'];

/**
 * @module Button
 */
class Button extends React.PureComponent {
	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			fullWidth,
			icon,
			hasHoverShadow, // eslint-disable-line no-unused-vars
			component,
			to,
			...other
		} = this.props;

		// checking for the icon component signature if passed as icon={<Icon shape="search"/>} and grabbing the shape prop
		const iconShape = icon && icon.props && icon.props.shape;

		// this.props.component is either a string or a Link component with a `component.name` prop
		const componentName = component
			? component.name
				? component.name
				: component
			: undefined;

		if (componentName && !BUTTON_COMPONENT_TYPES.includes(componentName)) {
			console.error(
				'Invalid component prop for <Button>. All Swarm UI v2 Button components are button, anchor, or Link elements.'
			);
		}

		// support for react-router Link component
		if (componentName === 'Link' && to !== undefined) {
			const {
				children,
				right,
				primary, // eslint-disable-line no-unused-vars
				small, // eslint-disable-line no-unused-vars
				bordered, // eslint-disable-line no-unused-vars
				neutral, // eslint-disable-line no-unused-vars
				inverted, // eslint-disable-line no-unused-vars
				grow, // eslint-disable-line no-unused-vars
				...linkProps
			} = other;
			const buttonType = getButtonType(this.props);

			return (
				<Link
					data-swarm-button={buttonType}
					data-swarm-size={getSwarmSize(this.props)}
					data-icon={getIconPosition(this.props)}
					data-swarm-width={fullWidth ? 'grow' : 'default'}
					to={to}
					{...linkProps}
				>
					{icon ? (
						<span>
							{right ? (
								<React.Fragment>
									{children}
									<Icon shape={iconShape} size="xs" />
								</React.Fragment>
							) : (
								<React.Fragment>
									<Icon shape={iconShape} size="xs" />
									{children}
								</React.Fragment>
							)}
						</span>
					) : (
						children
					)}
				</Link>
			);
		} else if (component === 'a') {
			return <SwarmLink icon={iconShape} grow={fullWidth} {...other} />;
		}

		return <SwarmButton icon={iconShape} grow={fullWidth} {...other} />;
	}
}

Button.propTypes = {
	/** Used to highlight the most important action on a screen. Not intended to be used more than once on a screen/modal/section. */
	primary: PropTypes.bool,

	/** The standard button for most use cases. Other styles are available for buttons that need more visual weight */
	neutral: PropTypes.bool,

	/** Takes an `Icon` element to render inside of the button */
	icon: PropTypes.element,

	/** Renders the icon on the right side of the button text */
	right: PropTypes.bool,

	/** Reduces the size of the button */
	small: PropTypes.bool,

	/** Sometimes used in place of a Neutral button on shaded backgrounds to maintain the appropriate visual weight */
	bordered: PropTypes.bool,

	/** Which component or html element type to use */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	/** Whether to use disabled attribute and disabled button styles */
	disabled: PropTypes.bool,
};
export default Button;
