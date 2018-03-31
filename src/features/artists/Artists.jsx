import React from "react";
import { Button, Icon,  Segment } from "semantic-ui-react";

const Artists = (props) => {

	return (
		<div>
		<Segment>
		<Button fluid animated='fade' onClick={props.onClick}>
      <Button.Content visible>Nirvana</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
		<Segment>
		<Button fluid animated='fade'>
      <Button.Content visible>Metallica</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
 		<Segment>
		<Button fluid animated='fade'>
      <Button.Content visible>Iron Maiden</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
    <Segment>
		<Button fluid animated='fade'>
      <Button.Content visible>Foo Fighters</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
   </div>
	);
}

export default Artists;
