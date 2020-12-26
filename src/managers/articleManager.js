import {serverURL} from '../config'

export const ArticleManager = {
    getMyArticles: async (limit = 10, offset = 0) => {
        try {
            let resp = await fetch(new URL(`api/articles/get/my?limit=${limit}&offset=${offset}`, serverURL).toString(), {
                method: 'GET',
                credentials: 'include'
            })

            let res = await resp.json()

            if (!res.detail) {
                console.log(res)
                return {res: res}
            } else {
                console.log(res)
                return {err: res.detail}
            }
        } catch(e) {
            return {err: e.toString()}
        }
    },
    getAllArticles: async (limit = 10, offset = 0) => {
        try {
            let resp = await fetch(new URL(`api/articles/get/?limit=${limit}&offset=${offset}`, serverURL).toString(), {
                method: 'GET',
                credentials: 'include'
            })

            let res = await resp.json()

            if (!res.detail) {
                console.log(res)
                return {res: res}
            } else {
                console.log(res)
                return {err: res.detail}
            }
        } catch(e) {
            return {err: e.toString()}
        }
    },
    getArticleById: async (id) => {
        try {
            let resp = await fetch(new URL(`api/article/get?id=${id}`, serverURL).toString(), {
                method: 'GET',
                credentials: 'include'
            })

            let res = await resp.json()

            if (res.detail) {
                return {err: res.detail}
            } else {
                return {res: res}
            }
        } catch (e) {
            return {err: e.toString()}
        }

    },
    getTags: async () => {
        try {
            let resp = await fetch(new URL('api/tags/get', serverURL).toString(), {
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
    createArticle: async (title, content, tags) => {
        try {
            let resp = await fetch(new URL('api/article/add', serverURL).toString(), {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    content,
                    tags
                })
            })

            let res = await resp.json()

            if (!res.detail) {
                return {res: res}
            } else {
                return {err: res.detail}
            }
        } catch (e) {
            return {err: e.toString()}
        }
    },
    updateArticle: async (id, title, content, tags, is_private=false) => {
        try {
            let resp = await fetch(new URL('api/article/upd', serverURL).toString(), {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    id,
                    title,
                    content,
                    tags,
                    is_private
                })
            })

            let res = await resp.json()

            if (!res.detail) {
                return {res: res}
            } else {
                return {err: res.detail}
            }
        } catch (e) {
            return {err: e.toString()}
        }
    },
    deleteArticle: async (id) => {
        try {
            let resp = await fetch(new URL(`api/article/del?article_id=${id}`, serverURL).toString(), {
                method: 'DELETE',
                credentials: 'include'
            })

            let res = await resp.json()

            if (!res.detail) {
                return {res: res}
            } else {
                return {err: res.detail}
            }
        } catch (e) {
            return {err: e.toString()}
        }
    }
}