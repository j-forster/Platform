import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system'
import FullWidthSection from './FullWidthSection'
import Page from '../App'

class MVPAgri extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">MVP Agriculture</h1>
        <Container>
          <FullWidthSection useContent={true}>        </FullWidthSection>
        </Container>
      </div>
      );
  }
}

export default MVPAgri;

