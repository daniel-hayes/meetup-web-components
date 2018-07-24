import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Button from '../forms/Button';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import withErrorList from '../utils/components/withErrorList';

export const DECREMENT_BTN_CLASS = 'decrementButton';
export const FAUX_INPUT_CLASS = 'fauxInput';
export const FOCUSED_INPUT_CLASS = 'focused';
export const INCREMENT_BTN_CLASS = 'incrementButton';

/**
 * @module NumberInput
 */
export class NumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
		};

		this._updateValueByStep = this._updateValueByStep.bind(this);
		this.decrementAction = this.decrementAction.bind(this);
		this.incrementAction = this.incrementAction.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const isNewValue = nextProps.onChange && nextProps.value !== prevState.value;

		return {
			value: isNewValue ? nextProps.value : prevState.value,
		};
	}

	_updateValueByStep(isIncreasing) {
		const currentVal = new Number(this.state.value);
		const step = new Number(this.props.step);
		let newValue = isIncreasing ? currentVal + step : currentVal - step;

		if (newValue > this.props.max) {
			newValue = this.props.max;
		} else if (newValue < this.props.min) {
			newValue = this.props.min;
		}

		return newValue;
	}

	onBlur(e) {
		const formControls = [this.fauxInputEl, this.decrementBtnEl, this.incrementBtnEl];
		if (formControls.every(c => c !== document.activeElement)) {
			this.fauxInputEl.classList.remove(FOCUSED_INPUT_CLASS);
		}
	}

	onChange(e) {
		const { onChange } = this.props;
		const { value, name } = e.target;

		this.setState(() => ({
			value,
		}));

		if (onChange) {
			onChange({ target: { value, name } });
		}
	}

	onFocus(e) {
		this.fauxInputEl.classList.add(FOCUSED_INPUT_CLASS);
	}

	onKeyDown(e) {
		// Disable the 'e' or 'E' values because we don't
		// support scientific notation at the moment
		if (e.key.toLowerCase() === 'e') {
			e.preventDefault();
		}
	}

	incrementAction(e) {
		e.preventDefault();
		this.onChange({
			target: { value: this._updateValueByStep(true), name: this.props.name },
		});
	}

	decrementAction(e) {
		e.preventDefault();
		this.onChange({
			target: { value: this._updateValueByStep(false), name: this.props.name },
		});
	}

	render() {
		const {
			children,
			className,
			error,
			id,
			label,
			labelClassName,
			max,
			min,
			name,
			onBlur, // eslint-disable-line no-unused-vars
			onFocus, // eslint-disable-line no-unused-vars
			onChange, // eslint-disable-line no-unused-vars
			step,
			disabled,
			value, // eslint-disable-line no-unused-vars
			helperText,
			required,
			requiredText,
			...other
		} = this.props;

		const classNames = {
			field: cx('field--reset', { 'field--error': error }, className, 'span--100'),
			fauxInput: cx(FAUX_INPUT_CLASS, {
				disabled,
				error,
			}),
			label: cx(
				'label--field',
				{
					'label--disabled': disabled,
					'label--required': required,
					'flush--bottom': helperText,
				},
				labelClassName
			),
			helperText: cx('helperTextContainer', { required, disabled }),
			incrementBtn: cx('button--reset', INCREMENT_BTN_CLASS),
			decrementBtn: cx('button--reset', DECREMENT_BTN_CLASS),
		};

		return (
			<div>
				{label && (
					<label
						className={classNames.label}
						htmlFor={id}
						data-requiredtext={required && requiredText}
					>
						{label}
					</label>
				)}
				{helperText && <div className={classNames.helperText}>{helperText}</div>}
				<div className={classNames.fauxInput} ref={el => (this.fauxInputEl = el)}>
					<Flex align="center">
						<FlexItem>
							<input
								type="number"
								id={id}
								name={name}
								max={max}
								min={min}
								step={step}
								value={this.state.value}
								required={required}
								className={classNames.field}
								onBlur={this.onBlur}
								onFocus={this.onFocus}
								onChange={this.onChange}
								onKeyDown={this.onKeyDown}
								disabled={disabled}
								{...other}
							/>
						</FlexItem>

						<FlexItem shrink>
							<Button
								reset
								tabIndex="-1"
								className={classNames.decrementBtn}
								onBlur={this.onBlur}
								onClick={this.decrementAction}
								onFocus={this.onFocus}
								ref={el => (this.decrementBtnEl = el)}
							>
								<Icon shape="minus" size="xs" />
							</Button>
						</FlexItem>

						<FlexItem shrink>
							<Button
								reset
								tabIndex="-1"
								className={classNames.incrementBtn}
								onBlur={this.onBlur}
								onClick={this.incrementAction}
								onFocus={this.onFocus}
								ref={el => (this.incrementBtnEl = el)}
							>
								<Icon shape="plus" size="xs" />
							</Button>
						</FlexItem>

						{children}
					</Flex>
				</div>
			</div>
		);
	}
}

NumberInput.defaultProps = {
	requiredText: '*',
	step: 1,
	min: 0,
};

NumberInput.propTypes = {
	/** Adds an `id` attribute to the input, and associates it with the `<label />` */
	id: PropTypes.string,

	/** Error content to render */
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** What we render into the input's `<label />` */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** The class name/s to add to the `<label />` element */
	labelClassName: PropTypes.string,

	/** The largest number value the input can have */
	max: PropTypes.number,

	/** The smallest number value the input can have */
	min: PropTypes.number,

	/** The `name` attribute for the input */
	name: PropTypes.string.isRequired,

	/** Callback that happens when the input changes */
	onChange: PropTypes.func,

	/** How much the number input should increase or decrease */
	step: PropTypes.number,

	/** Whether to use disabled attribute and disabled field styles */
	disabled: PropTypes.bool,

	/** Value of the input */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	/** An additional piece of helpful info rendered with the field */
	helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

	/** Whether the field is required to have a value */
	required: PropTypes.bool,

	/** What to render in order to indicate the field is required */
	requiredText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default withErrorList(NumberInput);
