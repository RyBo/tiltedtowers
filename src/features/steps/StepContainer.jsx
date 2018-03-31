import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';

export default class StepContainer extends Component {

	render() {
		return (
		  <Step.Group items={this.props.items}/>
		);
	}
}
