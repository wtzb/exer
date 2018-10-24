import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home/Page';
import Block from './pages/block/Page';
import Address from './pages/address/Page';
import Transaction from './pages/transaction/Page';
import NotFound from './pages/NotFound';


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />

            <Route path='/block/:blockNumber/details' component={Block}/>
            <Route path='/block/:blockNumber/transactions' component={Block}/>
            <Redirect from='/block/:blockNumber' to='/block/:blockNumber/details'/>

            <Route path="/address/:address" component={Address} />

            <Route path="/transaction/:transaction" component={Transaction} />

            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default Router;