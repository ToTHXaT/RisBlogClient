import React, {useState, useEffect, useContext} from "react";
import {Redirect} from 'react-router-dom'
import userContext from "../../context/userContext";

import {ArticleManager} from "../../managers/articleManager";
import {Alert, Pagination, Col, Row, ListGroup, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import PagesContext from "../../context/pagesContext";

import ArticleList from "./ArticleList";

const AllPosts = () => {
    let user = useContext(userContext)[0];
    let [_page, _setPage] = useContext(PagesContext)
    let page = _page.my
    let setPage = (__page) => {
        _setPage({..._page, my: __page})
    }

    let [maxPage, setMaxPage] = useState(0)
    let [articles, setArticles] = useState([])
    let [err, setErr] = useState(null)


    useEffect(() => {
        (async () => {
            let asw = await ArticleManager.getAllArticlesLen()

            if (asw.err) {
                setErr(asw.err)
            } else {
                setMaxPage(Math.ceil(asw.res / 10))
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            let asw = await ArticleManager.getAllArticles(10, (page - 1) * 10)

            if (asw.err) {
                setErr(asw.err)
            } else {
                setArticles(asw.res)
            }
        })();
    }, [page])


    if (articles.length < 1) return <div></div>
    return (
            <Container className="mt-5 mb-5">
                <Row>
                    {err ? <Alert variants="danger">{err}</Alert> : null}
                </Row>
                    <ListGroup>
                        <div > {articles.map((a,i) => <ArticleList article={a} key={i}/>)} </div>
                    </ListGroup>


                {articles ?
                    <Row className="mt-3">
                        <Col sm={{span: 2, offset: 5}}>
                            <Pagination>
                                <Pagination.Prev disabled={page - 1 < 1} onClick={() => setPage(page - 1)}/>
                                {page - 3 > 0 ? <Pagination.Item onClick={()=>setPage(page-3)}>{page - 3}</Pagination.Item> : null}
                                {page - 2 > 0 ? <Pagination.Item onClick={()=>setPage(page-2)}>{page - 2}</Pagination.Item> : null}
                                {page - 1 > 0 ? <Pagination.Item onClick={()=>setPage(page-1)}>{page - 1}</Pagination.Item> : null}
                                <Pagination.Item active> {page} </Pagination.Item>
                                {page + 1 <= maxPage ? <Pagination.Item onClick={()=>setPage(page+1)}>{page + 1}</Pagination.Item> : null}
                                {page + 2 <= maxPage ? <Pagination.Item onClick={()=>setPage(page+2)}>{page + 2}</Pagination.Item> : null}
                                {page + 3 <= maxPage ? <Pagination.Item onClick={()=>setPage(page+3)}>{page + 3}</Pagination.Item> : null}
                                <Pagination.Next disabled={page + 1 > maxPage} onClick={()=>setPage(page + 1)}/>
                            </Pagination>
                        </Col>
                    </Row>

                    : null}
            </Container>
    )
}

export default AllPosts
