import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { decorateWithLocale } from '../utils/decorators';
import {
	InfoWrapper,
	Inverted,
} from '../utils/storyComponents';

import Button from './Button';
import Icon from '../media/Icon';

storiesOf('Button', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'Default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Button onClick={action('clicked')}>Button Label</Button>
			</InfoWrapper>
		)
	)
	.add('Default - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')}>Button Label</Button>
		</Inverted>
	))
	.add('Default - with hover shadow', () => (
		<Button onClick={action('clicked')} hasHoverShadow>Button Label</Button>
	))
	.add('Disabled', () => (
		<Button onClick={action('clicked')} disabled hasHoverShadow>Button Label</Button>
	))
	.add('Disabled - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} disabled>Button Label</Button>
		</Inverted>
	))
	.add('Bordered', () => (
		<div
			className='stripe stripe--collection'
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Button onClick={action('clicked')} bordered>Button Label</Button>
		</div>
	))
	.add('Bordered - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} bordered>Button Label</Button>
		</Inverted>
	))
	.add('Reset', () => (
		<Button onClick={action('clicked')} reset>Button Label</Button>
	))
	.add('Reset - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} reset>Button Label</Button>
		</Inverted>
	))
	.add('Reset - Disabled', () => (
		<Button onClick={action('clicked')} reset disabled>Button Label</Button>
	))
	.add('Full Width', () => (
		<Button onClick={action('clicked')} fullWidth>Button Label</Button>
	))
	.add('Primary', () => (
		<Button onClick={action('clicked')} primary>Button Label</Button>
	))
	.add('Primary - with hover shadow', () => (
		<Button onClick={action('clicked')} primary hasHoverShadow>Button Label</Button>
	))
	.add('Primary - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')}primary>Button Label</Button>
		</Inverted>
	))
	.add('Small', () => (
		<Button onClick={action('clicked')} small>Button Label</Button>
	))
	.add('Icon', () => (
		<Button onClick={action('clicked')} icon={<Icon shape='search' size='xxs' />}>Button Label</Button>
	))
	.add('Icon - fullWidth', () => (
		<Button onClick={action('clicked')} fullWidth icon={<Icon shape='search' size='xxs' />}>Button Label</Button>
	))
	.add('Icon - inverted', () => (
		<Inverted>
			<Button onClick={action('clicked')} icon={<Icon shape='search' size='xxs' />}>Button Label</Button>
		</Inverted>
	))
	.add('Icon Right', () => (
		<Button onClick={action('clicked')} icon={<Icon shape='search' size='xxs' />} right>Button Label</Button>
	))
	.add('No Label', () => (
		<Button></Button>
	));
