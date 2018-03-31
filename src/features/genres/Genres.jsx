import React from "react";
import { Button, Icon,  Segment } from "semantic-ui-react";

const Genres = () => {

	return (
		<div>
		<Segment>
		<Button fluid animated='fade'>
      <Button.Content visible>Rock</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
		<Segment>
		<Button fluid animated='fade'>
      <Button.Content visible>Metal</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
 		<Segment>
		<Button fluid animated='fade'>
      <Button.Content visible>Acoustic</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
    <Segment>
		<Button fluid animated='fade'>
      <Button.Content visible>Alternative</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
    </Segment>
   </div>
	);
}

export default Genres;
