import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Section from './Section';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('SectionContainer', function() {

	it('exists', function() {
		const section = intlRender(<Chunk />);
		const sectionNode = ReactDOM.findDOMNode(section);

		expect(sectionNode).not.toBeNull();
	});

});
