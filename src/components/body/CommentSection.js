import React, {useState, useContext, useEffect, useRef} from "react";

import UserContext from "../../context/userContext";
import {CommentManager} from '../../managers/commentManager'
import {Row, Col, Alert, Container, ListGroup, ListGroupItem, FormControl, FormGroup, InputGroup, Button} from "react-bootstrap";


const CommentSection = ({articleId}) => {

    let [user, setUser] = useContext(UserContext)
    let [loaded, setLoaded] = useState(10)
    let [comments, setComments] = useState([])
    let [err, setErr] = useState(null)
    let [reload, setReload] = useState(0)
    let [showLoadMore, setShowLoadMore] = useState(true)
    let _input = useRef("")

    useEffect(() => {

        (async () => {
            let ans = await CommentManager.getCommentsOfArticle(articleId, loaded, 0)

            if (ans.err) {
                setErr(ans.err)
            } else {
                setComments(ans.res)

                if (ans.res.length < loaded) {
                    setShowLoadMore(false)
                } else {
                    setShowLoadMore(true)
                }
            }
        })()

    }, [loaded, reload])

    return (

        <Container>

            {err ? <Alert variant="danger"> {err} </Alert> : null}

            <InputGroup className="mt-4 mb-4">
                <InputGroup.Prepend>
                    <InputGroup.Text> Comment </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" rows="2" aria-label="With textarea" ref={_input}/>
                <Button variant="secondary" onClick={() => {
                    (async () => {
                        let ans = CommentManager.addComment(articleId, _input.current.value)

                        if (ans.err) {
                            setErr(ans.err)
                        } else {
                            setLoaded(10)
                            setReload(reload + 1)
                        }

                        _input.current.value = ""
                    })()
                }}> + </Button>
            </InputGroup>

        <ListGroup>
        {comments.map((comment, i) =>
                <ListGroupItem key={i} className="list-group-item-action">
                    <Row>
                        <Col>
                            {/*<h1 className="title">{article.title}</h1>*/}
                            <p className="text-muted">{new Date(comment.added).toLocaleString('ru')}</p>
                        </Col>

                        <Col>
                            <div className="text-muted text-right align-text-bottom">
                                {comment.user.username}
                            </div>

                        </Col>

                        {user && user.id === comment.user.id ?
                            <Col sm='1'>
                                <Button variant="outline-danger" onClick={() => {
                                    (async () => {

                                        let ans = CommentManager.delComment(comment.id)

                                        if (ans.err) {
                                            setErr(ans.err)
                                        } else {
                                            setLoaded(10)
                                        }

                                        _input.current.value = ""
                                    })()
                                }}> x </Button>
                            </Col>
                            : null}
                    </Row>

                    <Row>

                        <Col>
                            <p className="text-dark" style={{'white-space': 'pre-wrap', 'overflow-wrap':'break-word'}}>{comment.content}</p>
                        </Col>

                    </Row>
                </ListGroupItem>
        )}
        </ListGroup>
            {showLoadMore ?
                <Row className="mt-3">
                    <Col sm={{span: 2, offset: 5}}>
                        <Button vairant="info" onClick={() => {
                            setLoaded(loaded + 10)
                        }}> Load
                        </Button>
                    </Col>
                </Row>
                : null}
        </Container>
    )

}

export default CommentSection