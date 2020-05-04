import React, { Component } from "react";
import {Card, Image} from "semantic-ui-react";
//import ZombieChar from "./zombieChar";

class EvidenceCardContent extends Component {
   random_images_array = [
    'static/images/evidence/broken hdd.jpg',
    'static/images/evidence/broken phone.jpg',
    'static/images/evidence/hacked phone.jpg',
    'static/images/evidence/police-tape-laptop.jpg'
  ]

  truncate = (text) => {
    if (text.length > 30) {
      var start = text.substring(0, 30);
      return start + "...";
    }
    return text;
  };

  render() {
    return (
      <>
        <Image src= {this.random_images_array[3]}/>
        <Card.Content>
          <Card.Header>Evidence Description: </Card.Header>
          <Card.Description>
            {this.truncate(this.props.evidence.evidenceDescription)}
          </Card.Description>
        </Card.Content>
      </>

    );
  }
}
export default EvidenceCardContent;
