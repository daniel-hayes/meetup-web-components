import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TogglePill from './TogglePill';

const onChange = label => e => {
	action(`The value of the Toggle Pill ${label} clicked is: ${e.target.value}`)(e);
};


storiesOf('TogglePill', module)
	.add('Default', () => (
		<TogglePill
			onChange={onChange('OFF`')}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'>Toggle Pill Label</TogglePill>
	))
	.add('Default Selected', () => (
		<TogglePill
			onChange={onChange('ON')}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			checked
		>
			Toggle Pill Label
		</TogglePill>
	))
	.add('Pair of pills - action should be unique', () => (
		<div>
			<TogglePill
				onChange={onChange('START_OFF')}
				id='togglePillId'
				name='togglePillName'
				value='toggle-pill'>Toggle Pill Label</TogglePill>

			<br />

			<TogglePill
				onChange={onChange('START_ON')}
				id='togglePillId'
				name='togglePillName'
				value='toggle-pill'
				checked>Toggle Pill Label</TogglePill>
		</div>
	))
	.add('Topic Pill', () => (
		<TogglePill
			topic
			onChange={onChange('TOPIC_START_OFF')}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'>Toggle Pill Label</TogglePill>
	))
	.add('Topic Pill Selected', () => (
		<TogglePill
			topic
			onChange={onChange('TOPIC_START_ON')}
			id='togglePillId'
			name='togglePillName'
			value='toggle-pill'
			checked>Toggle Pill Label</TogglePill>
	));
