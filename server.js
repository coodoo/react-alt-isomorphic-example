// console.log('\033[2J');
process.stdout.write('\u001B[2J\u001B[0;0f');

let React = require('react');
let express = require('express');
let path = require('path');

let Iso = require('iso');
let Flux = require('./js/flux');
let App = require('./js/components/App.jsx');

let app = express();

// Static directories to make css and js work
app.use('/build', express.static(path.join(__dirname, 'build')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// I pulled this from index.html
let htmlStart = `
  <!doctype html>
  <html lang="utf-8">
    <head>
      <meta charset="utf-8">
      <title>Alt Flux Sample</title>

      <link rel="shortcut icon" type="image/png" href="assets/images/react.png">
      <link rel="stylesheet" href="assets/css/uikit.almost-flat.min.css">
      <link rel="stylesheet" href="assets/css/main.css">
    </head>
    <body>
  `;

let htmlEnd = `
  <script src="build/bundle.js"></script>
    </body>
  </html>
  `;

// 示範如果要關掉 isomorphic 功能時該怎麼做
// 手法就是同樣在 server 上模擬一個空白的字串返還，讓 client 端的 Iso 有東西可解開即可
/*app.get('*', (req, res) => {

	// 所有請求一律返還 index.html，等 client app 啟動後自行按 routing rule 做後續處理
	// res.sendFile('build/index.html', {root: '../'});

	// 或是偽裝一組符合原本格式的空字串，這樣 client app 拿到可正確 bootstrap 起來
	let body = Iso.render('', "{}" );
	res.send(`${htmlStart}${body}${htmlEnd}`);

});*/


// 讀取 routing table 逐條建立 rule + handler
var routines = require('./js/routing.js');

//
routines.forEach((item) => {

    // console.log( 'server routing rule> ', item );

    app.get(item.path, (req, res) => {

        console.log( '\n\nserver routing rule> ', req.url );

        // 每個 request 進來都建新的 flux instance
        var flux = new Flux();

        var RouteStore = flux.getStore('RouteStore');

        RouteStore[item.handler](req)

        .then( function success(result) {

                // console.log('\n\n1 RouteStore 內操作完成，可生成 string 了: ', arguments);

                //
                let markup = React.renderToString(React.createElement(App, {flux: flux}));

                // console.log( '\n\nmarkup 結果: ', markup );
                // console.log( '\n\nflush 結果: ', flux.flush() );

                let body = Iso.render(markup, flux.flush());

                res.send(`${htmlStart}${body}${htmlEnd}`);
            },

            function fail(err) {
                console.log('\nserver 失敗: ', err);
                res.send('404 - Page Not Found');
            })

        .catch(function(foo){
        	console.log( '\nserver catch: ', foo );
        })
    });

})

// 示範可以正確在 server 上處理 404 頁面
app.get('*', function(req, res) {
    res.send('404 - Page Not Found');
})

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
