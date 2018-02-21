import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithLocale, decorateWithInfo } from '../utils/decorators';

import NavItem from './components/NavItem';
import NavBar from './NavBar';

export const CLASS_UNAUTH_ITEM = 'navItem--unauthenticated';
export const CLASS_AUTH_ITEM = 'navItem--authenticated';

const group = [
	{
		id: 6622782,
		name: 'Whiskey Wednesdays',
		status: 'active',
		link: 'https://www.dev.meetup.com/Whiskey-Wednesdays/',
		urlname: 'Whiskey-Wednesdays',
		description: 'This is a description',
	},
	{
		id: 6622783,
		name: 'Mojito Mondays',
		status: 'active',
		link: 'https://www.dev.meetup.com/Mojito-Mondays/',
		urlname: 'Mojito Mondays',
		description: 'This is a description',
	},
];

const unauthItems = [
	<NavItem
		key={0}
		shrink
		linkTo="meetup.com"
		label="Login"
		className={`${CLASS_UNAUTH_ITEM} navItem--login`}
	/>,
	<NavItem
		key={1}
		shrink
		onAction={() => {}}
		label="Signup"
		className={CLASS_UNAUTH_ITEM}
	/>,
];

storiesOf('NavBar', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('Authenticated', () => (
		<NavBar
			self={{
				id: 1234,
				name: 'John Q. Testington',
				status: 'active',
			}}
			groups={group}
			notifications={[]}
		/>
	))
	.add('Unauthenticated', () => (
		<NavBar
			self={{
				id: 1234,
				status: 'prereg',
			}}
			unauthItems={unauthItems}
		/>
	))
	.add('with Badge', () => (
		<NavBar
			self={{
				id: 1234,
				name: 'John Q. Testington',
				status: 'active',
			}}
			groups={group}
			notifications={[]}
			unreadMessages={4}
			unreadNotifications={2}
		/>
	));
