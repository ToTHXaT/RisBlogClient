import {serverURL} from "../config";


export const UserManager = {
    login: async (username, password) => {

        try {
            let resp = await fetch(new URL('auth/login', serverURL).toString(), {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password
                })
            })

            let res = await resp.json()

            if (res.id) {
                return {res: res, err: null}

            } else {
                return {res: null, err: res.detail}
            }

        } catch(e) {
            return {res: null, err: e.toString()}
        }
    },
    signup: async (username, password) => {
        try {
            let resp = await fetch(new URL('auth/signup', serverURL).toString(), {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password
                })
            })

            let res = await resp.json()

            if (res.id) {
                return {res: res, err: null}

            } else {
                return {res: null, err: res.detail}
            }

        } catch(e) {
            return {res: null, err: e.toString()}
        }
    },
    signout : async () => {
        try {
            let resp = await fetch(new URL('auth/logout', serverURL).toString(), {
                method: 'POST',
                credentials: 'include'
            })

            let res = await resp.json()

            if (res.success) {
                return {res: 'success'}
            } else {
                return {err: res.detail}
            }
        } catch(e) {
            return {err: e.toString()}
        }
    },
    getMe: async () => {
        try {
            let resp = await fetch(new URL('auth/me', serverURL).toString(), {
                credentials: 'include'
            })
            let res = await resp.json()

            if (res.id) {
                return {res: res, err: null}
            } else {
                return {res: null, err: res.detail}
            }
        } catch(e) {
            return {res: null, err: e.toString()}
        }
    }
}