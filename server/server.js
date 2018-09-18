const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

//Call to Express
var app = express();

app.use(express.static(publicPath));

//Local Port 3000 set-up
app.listen(port, () => {
	console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});

