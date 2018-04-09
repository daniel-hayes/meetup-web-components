import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import WithLoading from '../utils/components/withLoading';

/**
 * Design System Component: Provides `stripe` styled container for components
 * @module Chunk
 */
export class Chunk extends React.Component {
	render() {
		const {
			children,
			className,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			loadingComponent,
			...other
		} = this.props;

		const classNames = cx(
			'chunk',
			{'component--isLoading': isLoading},
			className
		);

		return (
			<div
				className={classNames}
				{...other}
			>
				{children}
				{loadingComponent}
			</div>
		);
	}
}

Chunk.propTypes = {
	isLoading: PropTypes.bool,
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string
	})
};


export default WithLoading(Chunk);
