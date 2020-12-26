import React, {useState, useEffect, useRef, useContext} from "react";

import {Button, Row, Col, Container, Form, InputGroup, FormControl, Alert} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {ArticleManager} from "../../managers/articleManager";
import UserContext from "../../context/userContext";

const UpdatePost = ({match: {params: {articleid}}}) => {
    let [err, setErr] = useState(null)
    let [tags, setTags] = useState(null)
    let [redirect, setRedirect] = useState(null)
    let [article, setArticle] = useState(null)
    let _title = useRef("")
    let _content = useRef("")
    let user = useContext(UserContext)[0]

    useEffect(() => {

        (async () => {
            let ans = await ArticleManager.getTags()

            if (ans.err) {
                setErr(ans.err)
                setTags(null)
            } else {
                setTags(ans.res)
                setErr(null)
            }
        })();

        (async () => {
            let ans = await ArticleManager.getArticleById(articleid)

            if (ans.err) {
                setErr(ans.err)
            } else {
                setArticle(ans.res)
            }

        })();

    }, [])

    if (!user) return <Redirect to={'/login'}/>

    if (redirect) return <Redirect to={`/article/${redirect}`}/>

    return (
        <Container>

            {err ? <Alert variant="danger"> {err} </Alert> : null}

            <Form>
                <Row>
                    <Col xs={{span: 12, offset: 0}} md={{span: 8, offset: 2}}>
                        <InputGroup className="mt-5 mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id=""> Title </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                ref={_title}
                                defaultValue={article ? article.title : ""}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="">
                    {tags ?
                        tags.sort().map((tag, i) =>
                            <Col>
                                <div
                                    key={i}
                                    className={article ?
                                        (
                                            article.tags.includes(tag) ? "text-primary text-center user-select-none text-success font-weight-bold" :
                                           "text-primary text-center user-select-none"
                                        )
                                        : "text-primary text-center user-select-none"}
                                    onClick={(e) => {
                                        e.target.classList.toggle('text-success')
                                        e.target.classList.toggle('font-weight-bold')
                                    }}>
                                    {tag}
                                </div>
                            </Col>)
                        : null}
                </Row>

                <Row>
                    <Col>
                        <InputGroup className="mt-4 mb-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text> Content </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" rows="18" aria-label="With textarea" ref={_content} defaultValue={article ? article.content : ""}/>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col sm={{span: 2, offset: 5}} className="mb-4">
                        <Button variant="primary" type="button" onClick={() => {
                            if (!article) {
                                setErr('No article loaded yet')
                                return
                            }
                            let title = _title.current.value
                            let content = _content.current.value

                            let tag_els = Array.from(document.getElementsByClassName('text-success'));


                            let tags = tag_els.map(el => el.innerText);

                            (async () => {
                                let ans = await ArticleManager.updateArticle(article.id, title, content, tags);

                                if (ans.err) {
                                    setErr(ans.err)
                                } else {
                                    setErr(null)
                                    setRedirect(ans.res.id)
                                }
                            })();

                        }}> Update </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default UpdatePost
