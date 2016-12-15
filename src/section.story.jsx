import React from 'react';
import Section from './Section';
import { storiesOf } from '@kadira/storybook';

storiesOf('Section', module)
	.add('default', () => {
		<Section>This text is in a section</Section>;
	});
