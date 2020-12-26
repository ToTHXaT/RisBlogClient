import React, {useState, useEffect, useContext} from "react";
import {Redirect} from 'react-router-dom'
import userContext from "../../context/userContext";

import {ArticleManager} from "../../managers/articleManager";
import {Alert} from "react-bootstrap";

import ArticleList from "./ArticleList";

const AllPosts = () => {
    let user = useContext(userContext)[0];
    let [page, setPage] = useState(1)
    let [articles, setArticles] = useState([])
    let [err, setErr] = useState(null)


    useEffect(() => {

        (async () => {
            console.log('sending')

            let asw = await ArticleManager.getAllArticles(10, (page - 1) * 10)

            if (asw.err) {
                setErr(asw.err)
            } else {
                setArticles(asw.res)
            }
        })()

    }, [page])


    return (

        <div className="container mt-5 mb-5">
            {err ? <Alert>{err}</Alert> : null}
            <div className="list-group">
                <div > {articles.map((a,i) => <ArticleList article={a} key={i}/>)} </div>
            </div>
        </div>
    )
}

export default AllPosts
