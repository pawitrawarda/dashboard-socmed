import React, { Component } from 'react'
import {Button, Col, ListGroup, Modal, Row, Spinner} from 'react-bootstrap'
import axios from 'axios'

class ModalComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listComments: [],
            id: '',
            userId: '',
            title: '',
            body: '',
            isLoading: false
        }
    }

    getDataPost () {
        this.setState({
            id: this.props.dataPost.id,
            userId: this.props.dataPost.userId,
            title: this.props.dataPost.title,
            body: this.props.dataPost.body,
        })
    }

    getCommentsByPost () {
        this.setState({
            isLoading: true
        })
        axios.get('https://jsonplaceholder.typicode.com/comments?postId=' + this.props.dataPost.id)
            .then(res => {
                this.setState({
                    listComments: res.data,
                    isLoading: false
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <Modal size="lg"
                   show={this.props.showModal}
                   onHide={this.props.parentAction}
                   onEnter={() => this.getDataPost()}
                   onShow={() => this.getCommentsByPost()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detail Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center">{this.state.title}</h4>
                    <p className="text-center">{this.state.body}</p>
                    <Row className="mt-5">
                        <Col md={12} className="text-center">
                            <h5>List Comments</h5>
                            <ListGroup>
                                {
                                    this.state.isLoading ? <Spinner
                                        as="span"
                                        animation="border"
                                        role="status"
                                        variant="secondary"
                                        aria-hidden="true"
                                        className="mx-auto"
                                    />
                                    : this.state.listComments.map((item) => {
                                        return (
                                            <ListGroup.Item key={item.id}>
                                                <Row>
                                                    <Col md={12}>
                                                        <p className="small"> <strong>comment by:</strong> <span className="text-muted">{item.name} ({item.email})</span></p>
                                                        <p>{item.body}</p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.parentAction}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default ModalComments
