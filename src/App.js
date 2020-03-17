import React, { Component } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
        <Container>
            <section className="posts-box">
                <Row>
                    <Col md={8} className="mx-auto">
                        <Row>
                            <Col md={12}>
                                <textarea className="col-12" placeholder="type your post.."></textarea>
                            </Col>
                            <Col md={12} className="text-right">
                                <Button variant="success">Post</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </section>
            <section className="contents">
                <Tab.Container defaultActiveKey="mypost">
                    <Row>
                        <Col md={12}>
                            <Nav variant="pills" justify>
                                <Nav.Item>
                                    <Nav.Link eventKey="mypost">My Posts</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="users">Users</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="myalbum">My Album</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="mypost">
                                    First
                                </Tab.Pane>
                                <Tab.Pane eventKey="users">
                                    Second
                                </Tab.Pane>
                                <Tab.Pane eventKey="myalbum">
                                    Second
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </section>
        </Container>
    );
  }
}

export default App;
