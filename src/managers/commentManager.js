import {serverURL} from "../config";

export const CommentManager = {
    getCommentsOfArticle :async (articleId, limit, offset) => {
        try {
            let resp = await fetch(new URL(`api/comments/get?limit=${limit}&offset=${offset}&article_id=${articleId}`, serverURL).toString(), {
                method: 'GET',
                credentials: 'include'
            })

            let res = await resp.json()

            if (!res.detail) {
                return {res: res}
            } else {
                return {err: res.detail}
            }
        } catch(e) {
            return {err: e.toString()}
        }

    },
    addComment: async (articleId, content) => {
        try {
            let resp = await fetch(new URL('api/comment/add', serverURL).toString(), {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    article_id: articleId,
                    content
                })
            })

            let res = await resp.json()

            if (!res.detail) {
                return {res: res}
            } else {
                return {err: res.detail}
            }
        } catch(e) {
            return {err: e.toString()}
        }
    },
    delComment: async (commentId) => {
        try {
            let resp = await fetch(new URL(`api/comment/del?comment_id=${commentId}`, serverURL).toString(), {
                method: 'DELETE',
                credentials: 'include'
            })

            let res = await resp.json()

            if (!res.detail) {
                return {res: res}
            } else {
                return {err: res.detail}
            }
        } catch(e) {
            return {err: e.toString()}
        }
    }
}
