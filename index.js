// express app
const express=require('express');
const app=express();

// path module
const path=require('path');
const static_path=path.join(__dirname,'./public');
const views_path =path.join(__dirname,'./views');

// db connection
require('./connect');

// alert api
const alert=require('alert');

// schema models
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
	imgModel.find({}).sort({name:-1}).exec((err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		res.render('index', { files: items });
	});
});

// homepage post
app.post('/',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(username==='bhuria'&&password==='amityadavasiaki'){
            res.redirect('/loggedin');
    }
    else{
        await alert('Please enter correct username and password');
        res.redirect('/');
    }
});

//loggedin homepage
app.get('/loggedin',(req,res)=>{
    imgModel.find({}).sort({name:-1}).exec((err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		res.render('index',{files:items,status:true});
	});
});

// add-image get
app.get('/add-image',(req,res)=>{
    res.render('add-image');
});

// add-image post
app.post('/add-image',upload.single('image'), function(req,res,next){
    let name=Date.now()+'';
    var image = new imgModel({
        name: name,
        desc:req.body.caption,
        img: {
            data: req.file.buffer,
            contentType: 'image/png'
        }
    });
    image.save(function(err) {
        if (err) { return next(err); }
        res.redirect('/loggedin');
    });
});

// delete image
app.get('/delete:id',(req,res)=>{
    imgModel.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.status(500).send('server busy',err);
        }
        res.redirect('/loggedin');
    })
})

// listening of port
app.listen(port,()=>{
    console.log('listening at '+`${port}`);
});