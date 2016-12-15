
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Popover from './Popover';
import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';
import PopoverMenuOption from './PopoverMenuOption';
import PopoverContent from './PopoverContent';

import {
	Chunk,
	Section
} from './layoutUtils';

storiesOf('Popover', module)
	.add('Default', () => (
	<Popover>
		<PopoverTrigger tabIndex={0}>Trigger popover</PopoverTrigger>
		<PopoverMenu>
			<PopoverMenuOption>
				Option One
			</PopoverMenuOption>
			<PopoverMenuOption>
				Option Two
			</PopoverMenuOption>
			<PopoverMenuOption>
				Option Three
			</PopoverMenuOption>
		</PopoverMenu>
	</Popover>
	))
	.add('Container', () => (
	<Popover>
		<PopoverTrigger tabIndex={1}>Trigger popover</PopoverTrigger>
		<PopoverContent>
			<Section>
				<Chunk>
					<p>Arbitrary HTML can go in here</p>
				</Chunk>
			</Section>
		</PopoverContent>
	</Popover>
	));
