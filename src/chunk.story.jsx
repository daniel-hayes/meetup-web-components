
import React from 'react';

import Chunk from './Chunk';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';

storiesOf('Chunk', module)
	.add('default', () => {
		return (
			<Annotate notes='chunk is used to group elements, adding a standard bottom margin'>
				<Chunk>This text is in a `chunk`</Chunk>
			</Annotate>
		);
	});
