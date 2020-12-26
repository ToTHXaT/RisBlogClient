import React, {useEffect, useState, useContext} from 'react'
import {ArticleManager} from "../../managers/articleManager";

import {Container, Row, Col, Button, Alert} from 'react-bootstrap'
import {Link, Redirect} from "react-router-dom";

import UserContext from '../../context/userContext'


const ArticleInfo = ({match: {params: {articleid}}}) => {
    let [article, setArticle] = useState(null)
    let [err, setErr] = useState(null)
    let [redirect, setRedirect] = useState(null)
    let [user, setUser] = useContext(UserContext)

    useEffect(() => {

        (async () => {
            let ans = await ArticleManager.getArticleById(articleid)

            if (ans.err) {
                setErr(ans.err)
            } else {
                setArticle(ans.res)
            }

        })()

    }, [])

    if (redirect) return <Redirect to={redirect}/>

    return (
        article ?
        <Container className="mt-5 mb-5">
            {err ? <Alert variant="danger"> {err} </Alert> : null}
            <Row className="mt-2 mb-2">
                {article.tags ?
                    article.tags.sort().map((tag, i) =>
                        <Col>
                            <div
                                key={i}
                                className="text-primary text-center user-select-none text-success font-weight-bold">
                                {tag}
                            </div>
                        </Col>)
                    : null}
            </Row>

            <Row>
                <Col>
                    <h1 className="title">{article.title}</h1>
                    <p className="text-muted">{new Date(article.modified).toLocaleString('ru')}</p>
                </Col>

                <Col>
                   <div className="text-right align-text-bottom mt-3">
                       {article.author.full_name}
                   </div>

                    <div className="text-muted text-right align-text-bottom">
                        {article.author.username}
                    </div>

                </Col>
            </Row>

            <Row>

                <Col>
                    <p className="text-dark">{article.content}</p>
                </Col>

            </Row>

            {article ?
                (user && article.author.id === user.id ?
                    <Row className="mt-5 justify-content-end">
                        <Col sm='1'>
                            <Link to={`/article/upd/${article.id}`}><Button variant="warning"> Edit </Button></Link>
                        </Col>
                        <Col sm='1'>
                           <Button variant="danger" onClick={() => {
                               if (window.confirm('Are you sure you want to delete this post')) {

                                   (async () => {
                                       let aws = await ArticleManager.deleteArticle(article.id);

                                       if (aws.res) {
                                           setRedirect('/myposts')
                                       } else {
                                           setErr(aws.err)
                                       }
                                   })()

                               }
                           }}> Delete </Button>
                        </Col>
                    </Row>
                    : null)
                : null}

        </Container>
            : null
    )


}

export default ArticleInfo