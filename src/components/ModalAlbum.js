import React, { Component } from 'react'
import {Button, Col, ListGroup, Modal, Row, Image} from 'react-bootstrap'
import axios from 'axios'

class ModalAlbum extends Component {
    constructor(props) {
        super(props)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.state = {
            albumByUser: [],
            photoByAlbum: [],
            showPhoto: false
        }
    }

    toggleContent (albumId) {
        if(!this.state.showPhoto) {
            this.getPhotoByAlbum(albumId)
        }

        this.setState({
            showPhoto: !this.state.showPhoto
        })
    }

    onCloseModal () {
        this.setState({
            showPhoto: false
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

    getPhotoByAlbum (id) {
        axios.get('https://jsonplaceholder.typicode.com/photos?albumId=' + id)
            .then(res => {
                this.setState({
                    photoByAlbum: res.data
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        let content;
        if (this.state.showPhoto) {
            content = <Row>
                {
                    this.state.photoByAlbum.map((item) => {
                        return (
                            <Col md={2} className="mb-5">
                                <a href="javascript:void(0)" onClick={() => false}>
                                    <Image src={item.thumbnailUrl} thumbnail />
                                </a>
                            </Col>
                        )
                    })
                }
            </Row>
        } else {
            content = <ListGroup>
                {
                    this.state.albumByUser.map((item) => {
                        return (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={10}>
                                        <h5>Title:</h5>
                                        <p>{item.title}</p>
                                    </Col>
                                    <Col md={2} className="text-right">
                                        <Button variant="info" size="sm" onClick={() => this.toggleContent(item.id)}>see photos</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        }
        return(
            <Modal size="lg"
                show={this.props.showModal}
                onHide={this.props.parentAction}
                onShow={() => this.getAlbumByUser(this.props.idUser)}
                onExit={this.onCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.showPhoto ? 'Photos': 'Albums'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
                <Modal.Footer>
                    { this.state.showPhoto ?
                        <Button variant="secondary" onClick={() => this.toggleContent()}>
                            Back
                        </Button> :
                        <Button variant="secondary" onClick={this.props.parentAction}>
                            Close
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalAlbum
