import React from 'react'
import {Link} from 'react-router-dom'

const ArticleList = ({article}) => {

    return (
        // <div>
        //     <div>{article.id}</div>
        //     <div>{article.title}</div>
        //     <div>{article.content}</div>
        //     <div>{article.tags.map((t, i) => <span key={i}>{t}</span>)}</div>
        //     <div>{article.published}</div>
        //     <div>{article.modified}</div>
        //     <div>{article.author.username}</div>
        // </div>

        <div className="row list-group-item-action list-group-item">
            {/*<div className="col-sm-4"><a href="#" className=""></a>*/}
            {/*</div>*/}
            <div className="col-sm-8">
                <h3 className="title">
                    <Link to={`article/${article.id}`}>
                        {article.title}
                    </Link>
                </h3>

                <p className="text-muted">{new Date(article.modified).toLocaleString('ru')}</p>
                <p style={{'white-space': 'pre-wrap'}}>{article.content.length <= 50 ? article.content : article.content.slice(0, 80) + '...'}</p>
                <p className="text-muted">{article.author.username}</p>
            </div>
        </div>
    )
}

export default ArticleList