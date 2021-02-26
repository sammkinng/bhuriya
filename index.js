// express app
const express=require('express');
const app=express();

// path module
const path=require('path');
const static_path=path.join(__dirname,'./public');
const views_path =path.join(__dirname,'./views');

// db connection
require('./connect');

// schema model for image
var imgModel = require('./images');

// multer to upload images
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// port to server
const port=process.env.PORT || 8050;

// json and urlencoding
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// view setup
app.use(express.static(static_path));
app.set("view engine",'pug');
app.set("views",views_path);

// homepage get
app.get('/', (req, res) => {
	imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
            res.redirect('/error');
		}
		else {
			res.render('index', { files: items });
		}
	});
});

// homepage post
app.post('/',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(username==='bhuria'&&password==='amityadavasiaki'){
        res.redirect('/add-image');
    }
    else{
        window.alert('wrong password');
    }
});

// add-image get
app.get('/add-image',(req,res)=>{
    res.render('add-image');
});

// add-image post
app.post('/add-image',upload.single('image'),function(req,res,next){
    var image = new imgModel({
        name: req.body.name,
        img: {
            data: req.file.buffer,
            contentType: 'image/png'
        }
    });
    image.save(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

// error page 
app.get('/error',(req,res)=>{
    res.render('/error');
})

// app.get('/show-image/:img_url',function(req,res){
//     res.render('show-image',{'imgUrl':req.params.img_url});
// });


// listening of port
app.listen(port,()=>{
    console.log('listening at '+`${port}`);
});