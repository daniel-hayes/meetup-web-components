import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Popover from './Popover';

describe('Popover menu', function() {

	it('exists', function() {
		const popover = TestUtils.renderIntoDocument(<Popover />);
		const popoverNode = ReactDOM.findDOMNode(popover);

		expect(popoverNode).not.toBeNull();
	});

});

describe('Popover container', function() {

	it('exists', function() {
		const popover = TestUtils.renderIntoDocument(<Popover />);
		const popoverNode = ReactDOM.findDOMNode(popover);

		expect(popoverNode).not.toBeNull();
	});

});
