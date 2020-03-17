import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, ListGroup } from 'react-bootstrap'
import './App.css'

class App extends Component {

    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
        this.closeModalDetailPost = this.closeModalDetailPost.bind(this)
        this.closeModalAlbum = this.closeModalAlbum.bind(this)
        this.state = {
            users: [],
            postsByUser: [],
            albumByUser: [],
            myPosts: [
                {
                    id: '1',
                    title: 'Lorem',
                    body: 'ipsum dolor'
                },
                {
                    id: '2',
                    title: 'Ipsum',
                    body: 'ipsum dolor sir amet'
                }
            ],
            listCommentByPost: [],
            userId: '',
            showModal: 0,
            showModalDetailPost: 0,
            showModalAlbum: 0
        };
    }

    componentDidMount() {
        this.getListUsers()
    }

    open(id) {
        this.setState({
            showModal: id
        })
    }

    close() {
        this.setState({
            showModal: 0
        })
    }

    openModalDetailPost(id) {
        this.setState({
            showModalDetailPost: id
        })
    }

    closeModalDetailPost() {
        this.setState({
            showModalDetailPost: 0
        })
    }

    openModalAlbum(id) {
        this.setState({
            showModalAlbum: id
        })
    }

    closeModalAlbum() {
        this.setState({
            showModalAlbum: 0
        })
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

    getPostsByUser (id) {
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + id)
            .then(res => {
                this.setState({
                    postsByUser: res.data
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    getDetailPost (id) {
        axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
            .then(res => {
                this.setState({
                    listCommentByPost: res.data
                })

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    getAlbumByUser (id) {
        axios.get('https://jsonplaceholder.typicode.com/albums?userId=' + id)
            .then(res => {
                this.setState({
                    albumByUser: res.data
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    UsersListComponent () {
        let listItems = this.state.users.map( (item, index) => {
            return (
                <Col md={4} key={item.id} className="p-2">
                    <Card style={{ width: '18rem' }} className="text-center mx-auto">
                        <Card.Body>
                            <Card.Title>{ item.name }</Card.Title>
                            <Card.Text>
                                { item.email }
                            </Card.Text>
                            <Button variant="info" size="sm" className="mr-2" onClick={() => this.open(item.id)}>List Posts</Button>
                            <Button variant="info" size="sm" onClick={() => this.openModalAlbum(item.id)}>Albums</Button>
                        </Card.Body>
                    </Card>
                    <Modal size="lg" show={this.state.showModal === item.id && this.state.showModalAlbum === 0} onHide={this.close} onShow={ () => this.getPostsByUser(item.id)}>
                        <Modal.Header closeButton>
                            <Modal.Title>List Posts</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ListGroup variant="flush">
                                {this.ListPostByUserComponent()}
                            </ListGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.close}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            )
        } )
        return listItems
    }

    ListPostByUserComponent () {
        let listItem = this.state.postsByUser.map( (item) => {
            return (
                <ListGroup.Item key={item.id}>
                    <Row>
                        <Col md={11}>
                            <h5>Title:</h5>
                            <p>{item.title}</p>
                        </Col>
                        <Col md={1} className="text-right">
                            <Button variant="info" size="sm" onClick={() => this.openModalDetailPost(item.id)}>detail</Button>
                        </Col>
                        <Modal size="lg" show={this.state.showModalDetailPost === item.id} onHide={this.closeModalDetailPost} onShow={() => this.getDetailPost(item.id)} >
                            <Modal.Header closeButton>
                                <Modal.Title>Detail Post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <h4>{item.title}</h4>
                                <p>{item.body}</p>
                                <h5>List Comments</h5>
                                <ListGroup className="text-left">
                                    {this.DetailPostComponent()}
                                </ListGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModalDetailPost}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </ListGroup.Item>
            )
        })

        return listItem
    }

    DetailPostComponent () {
        let listItem = this.state.listCommentByPost.map( (item) => {
            return (
                <ListGroup.Item key={item.id}>
                    <Row>
                        <Col md={12}>
                            <h6>Title: {item.name}</h6>
                            <h6>E-mail: {item.email}</h6>
                            <p>Comment: <br/> {item.body}</p>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        })

        return listItem
    }

    ListAlbumsByUserComponent () {
        let listItem = this.state.albumByUser.map( (item) => {
            return (
                <ListGroup.Item key={item.id}>
                    <Row>
                        <Col md={11}>
                            <h5>Title:</h5>
                            <p>{item.title}</p>
                        </Col>
                        <Col md={1} className="text-right">
                            <Button variant="info" size="sm">see photos</Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        })

        return listItem
    }

    ListMyPostComponent () {
        let listItem = this.state.myPosts.map( (item) => {
            return (
                <ListGroup.Item key={item.id}>
                    <Row>
                        <Col md={11}>
                            <p>{item.title}</p>
                            <p>{item.body}</p>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        })

        return listItem
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
                                        <ListGroup>
                                            {this.ListMyPostComponent()}
                                        </ListGroup>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="users">
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    {this.UsersListComponent()}
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
