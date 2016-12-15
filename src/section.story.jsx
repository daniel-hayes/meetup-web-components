
import React from 'react';
import { IntlProvider } from 'react-intl';
import Section from './Section';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';

storiesOf('Section', module)
	.add('default', () => {
		<Section>This text is in a section</Section>;
	});
