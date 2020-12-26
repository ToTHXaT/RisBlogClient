import React from 'react'

import {Switch, Route} from 'react-router-dom'

import LoginPage from "./body/LoginPage";
import SignupPage from "./body/SignupPage";
import MyPosts from './body/MyPosts'
import ArticleInfo from "./body/ArticleInfo";
import CreatePost from "./body/CreatePost";
import UpdatePost from "./body/UpdatePost";
import AllPosts from "./body/AllPosts";

const Body = () =>
    <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/myposts" component={MyPosts}/>
        <Route path="/createpost" component={CreatePost}/>
        {/*<Route path="/posts" component={Posts}/>*/}

        <Route path="/article/upd/:articleid/" component={UpdatePost}/>
        <Route path="/article/:articleid/" component={ArticleInfo}/>
        <Route path="/allposts" component={AllPosts}/>
    </Switch>




export default Body