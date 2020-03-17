import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Tab, Nav, Button, Card } from 'react-bootstrap'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.getListUsers()
    }

    getListUsers () {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    UsersList () {
        let listItems = this.state.users.map( (item, index) => {
            return (
                <Col md={4} key={item.id} className="p-2">
                    <Card style={{ width: '18rem' }} className="text-center mx-auto">
                        <Card.Body>
                            <Card.Title>{ item.name }</Card.Title>
                            <Card.Text>
                                email@gmail.com
                            </Card.Text>
                            <Button variant="info" size="sm" className="mr-2">Info User</Button>
                            <Button variant="info" size="sm" className="mr-2">List Posts</Button>
                            <Button variant="info" size="sm">Albums</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        } )
        return listItems
    }

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
                <section className="contents" className="mx-auto">
                    <Tab.Container defaultActiveKey="mypost">
                        <Row className="tab-navigation">
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
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    {this.UsersList()}
                                                </Row>
                                            </Col>
                                        </Row>
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
