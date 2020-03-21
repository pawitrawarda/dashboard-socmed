import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Tab, Nav, Button, Card, Modal, ListGroup, Form, Spinner } from 'react-bootstrap'
import ModalAlbum from './components/ModalAlbum'
import ModalComments from './components/ModalComments'
import './App.css'

class App extends Component {

    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
        this.closeModalDetailPost = this.closeModalDetailPost.bind(this)
        this.toggleModalAlbums = this.toggleModalAlbums.bind(this)
        this.toggleModalComments= this.toggleModalComments.bind(this)
        this.addMyPost = this.addMyPost.bind(this)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeText = this.onChangeText.bind(this)

        this.state = {
            users: [],
            postsByUser: [],
            myPosts: [],
            listCommentByPost: [],
            userId: '',
            showModal: 0,
            showModalDetailPost: 0,
            showModalAlbum: false,
            showModalComments: false,
            isLoading: false,
            dataPost: null,
            title: '',
            text:'',
            validated: false
        };
    }

    setValidated (param) {
        this.setState({
            validated: !param
        })
    }

    componentDidMount() {
        this.getListUsers()
        this.getMyPost()
    }

    toggleModalAlbums (id) {
        this.setState({
            showModalAlbum: !this.state.showModalAlbum
        })

        this.setState({
            userId: id
        })
    }

    toggleModalComments (data) {
        this.setState({
            showModalComments: !this.state.showModalComments
        })

        this.setState({
            dataPost: data
        })
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

    getMyPost () {
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
            .then(res => {
                this.setState({
                    myPosts: res.data
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

    addMyPost (e) {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
            this.setValidated(false)
            return
        }

        this.setValidated(true)

        const dataSubmit = {
            title: this.state.title,
            body: this.state.text,
            userId: 1
        }
        this.setState({
            isLoading: true
        })
        axios.post('https://jsonplaceholder.typicode.com/posts', dataSubmit)
            .then(res => {
                let tempArray = this.state.myPosts
                tempArray.unshift(res.data)
                this.setState({
                    isLoading: false,
                    myPosts: tempArray,
                    title: '',
                    text: ''
                })
            })
            .catch(function (error) {
                alert(error)
            })
    }

    onChangeTitle (e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeText (e) {
        this.setState({
            text: e.target.value
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
                            <Button variant="info" size="sm" onClick={() => this.toggleModalAlbums(item.id)}>Albums</Button>
                        </Card.Body>
                    </Card>
                    <Modal size="lg" show={this.state.showModal === item.id} onHide={this.close} onShow={ () => this.getPostsByUser(item.id)}>
                        <Modal.Header closeButton>
                            <Modal.Title>List Posts</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ListGroup variant="flush">
                                { this.ListPostByUserComponent() }
                            </ListGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.close} onHide={this.close}>
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

    ListMyPostComponent () {
        let listItem = this.state.myPosts.map( (item) => {
            return (
                <ListGroup.Item key={item.id}>
                    <Row>
                        <Col md={10}>
                            <p>{item.title}</p>
                            <p>{item.body}</p>
                        </Col>
                        <Col md={2} className="text-right">
                            <Button variant="info" size="sm" onClick={() => this.toggleModalComments(item)}>detail</Button>
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
                    <Form onSubmit={this.addMyPost} noValidate validated={this.state.validated}>
                        <Row>
                            <Col md={8} className="mx-auto">
                                <Row>
                                    <Col md={12}>
                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label column sm="1">
                                                Title
                                            </Form.Label>
                                            <Col sm="11">
                                                <Form.Control required type="text" placeholder="title.." value={this.state.title} onChange={this.onChangeTitle}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label column sm="1">
                                                Text
                                            </Form.Label>
                                            <Col sm="11">
                                                <Form.Control required as="textarea" placeholder="text.." value={this.state.text} onChange={this.onChangeText}/>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="text-right">
                                        <Button variant="success" type="submit" disabled={this.state.isLoading}>
                                            {
                                                this.state.isLoading ? <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="mr-2"
                                                /> : ''
                                            }
                                            Post
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </section>
                <section className="contents mx-auto">
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
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="mypost">
                                        <ListGroup className="mt-2">
                                            {this.ListMyPostComponent()}
                                            <ModalComments
                                                showModal={this.state.showModalComments}
                                                dataPost={this.state.dataPost}
                                                parentAction={() => this.toggleModalComments()}>
                                            </ModalComments>
                                        </ListGroup>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="users">
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    {this.UsersListComponent()}
                                                    <ModalAlbum
                                                        showModal={this.state.showModalAlbum}
                                                        idUser={this.state.userId}
                                                        parentAction={() => this.toggleModalAlbums()}>
                                                    </ModalAlbum>
                                                </Row>
                                            </Col>
                                        </Row>
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
