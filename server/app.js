/**
 * Created by intelligrape on 3/5/17.
 */
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config';
import React from 'react'
import {renderToString} from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import path from 'path';
import { StaticRouter } from 'react-router'
import App from '../src/component/App'
import Home from '../src/component/Home'
import About from '../src/component/About'
import Contact from '../src/component/Contact'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const app = express();
const PORT = 4000;
const compiler  = webpack(config);
import reducer from '../src/reducers/user.reducer';

/*app.use(require('webpack-dev-middleware') (compiler, {publicPath: config.output.publicPath}));

app.route('/!*').get((req, res) => {
    res.sendFile(path.resolve() + '/index.html');
});*/
const routes = [
    {   component:App,
        path: '/',
        loadData: function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    return resolve({emp: [{name: 'saini'}]});
                }, 1000);
            })
        },
        routes: [
            { path: '/home',
                component: Home,
                loadData: function () {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            return resolve({users: [{name: 'rubi'}]});
                        }, 1000);
                    })
                }
            },
            { path: '/contact',
                component: Contact
            },
            { path: '/about',
                component: About
            }
        ]
    }
];

app.use(express.static(path.resolve()));
app.get('/*', (req, res) => {
    if(req.url.indexOf('.js') > -1) {
        res.sendFile(path.resolve() + '/src' +  req.url);

    }else {
        loadBranchData(req.url).then(data => {

            let finalResult = data.reduce(function (result, item) {
                let key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
            }, {});

            // Compile an initial state
            let preloadedState = {users: finalResult.users};

            // Create a new Redux store instance
            const store = createStore(reducer, preloadedState)
            let context = {};
            // Render the component to a string
            const html = renderToString(
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </StaticRouter>
            );

            // Grab the initial state from our Redux store
            const finalState = store.getState();

            console.log('::::::::::::::::::', finalState);
            // Send the rendered page back to the client
            res.send(renderFullPage(html, finalState))

        })
    }
});


const loadBranchData = (location) => {
    const branch = matchRoutes(routes, location);

    const promises = branch.map(({ route, match }) => {
        return route.loadData
            ? route.loadData(match)
            : Promise.resolve(null)
    });
   return Promise.all(promises)
};

app.listen(PORT, ()=> {
console.log(`Server running on ${PORT}`);
});


function renderFullPage(html, preloadedState) {
    console.log(html);
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">${html}</div>
 <script>window.__REDUX_STATE__ = ${JSON.stringify(preloadedState)}</script>
        
<script src="/index.js"></script>

</body>
</html>
    `
}






















































/*
app.use('*', (req, res) => {
    if(req.baseUrl.indexOf('.js') > -1) {
        res.sendFile(path.resolve() + '/src' +  req.baseUrl);

    }else {

        const context = {};

        const html = renderToString(
            <StaticRouter
                location={req.baseUrl}
                context={context}
            >
                <App/>
            </StaticRouter>
        )

        if (context.url) {
            res.writeHead(301, {
                Location: context.url
            })
            res.end()
        } else {
            res.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">${html}</div>
<script src="/index.js"></script>
</body>
</html>
    `)
            res.end()
        }

        // do something w/ the data so the client
        // can access it then render the app

    }
});*/
