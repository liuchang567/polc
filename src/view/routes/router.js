import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
// import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../page/login/login'
import AuthorizedRoute from './AuthorizedRoute'
import NoFound from '../page/404'
import Home from '../page/home/home'
import LoadAsync from '../../utils/loadAsync'

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Redirect from="/" exact to="/login" />{ /*注意redirect转向的地址要先定义好路由*/ }
            <AuthorizedRoute path="/home" component={Home} />
            <Route component={NoFound} />
        </Switch>
    </BrowserRouter>
)

const Table = LoadAsync(() => import('../page/table/table'))
const Charts = LoadAsync(() => import('../page/chart/chart'))
const Test = LoadAsync(() => import('../page/test/test'))

export const menuObject = {
    'home': Home,
    'table': Table,
    'chart': Charts,
    'test': Test
}

export const menus = [
    {
        id: '1',
        title: 'table',
        icon: 'book',
        url: '/home/table',
        component: 'table'
    },
    {
        id: '2',
        title: 'chart',
        icon: 'pie-chart',
        url: '/home/chart',
        component: 'chart'
    },
    {
        id: '3',
        title: 'test',
        icon: 'bell',
        url: '/home/test',
        component: 'test'
    }
];
