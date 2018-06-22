const express=require('express');
const app=express();
const bodyParser=require("body-parser");

const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-api');
const db=mongoose.connection;
const Movie=require("../models/movies");


//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

db.on('error',console.log);
db.once('open',()=>{
    let movie=new Movie({title:'齐天大圣'});
    movie.save(function(err){
        if(err)
        console.log(err);
    })
    console.log("success!")
});

app.get('/',function(req,res){
    res.send("Hello world");
})
app.get('/api',function(req,res){
    res.json({message:'get request'})
});
app.post('/api',function(req,res){
    console.log(req.body)
    res.json({message:'post request!'})
})


//获取所有的电影数据
app.get('/movies',function(req,res){
    Movie.find().sort({'createAt':-1}).exec(function(err,movies){
        if(err) return res.status(500).json({error:err.message});
        res.json({movies:movies})
    });
})

//存储一个电影信息
app.post('/movies', function(req, res) {
    Movie.find().sort({'createAt':-1}).exec(function(err,movies){
        if(err) return res.status(500).json({error:err.message});
       // console.log(movies[0]["_id"]);
          if (req.body.title === '') return res.status(400).json({error: '电影标题不能为空！'});
         //var movie = new Movie();
         let post={};
          for (prop in req.body) {
              post[prop]=req.body[prop];
          }
          //console.log(post);
          let movie=new Movie(post);
          movie.save(function(err){
              if(err){
                  console.log(err);
              }
          })
          console.log("添加电影成功");
    });
  });

app.put('/movies/:id',function(req,res){
    Movie.find().sort({'createAt':-1}).exec(function(err,movies){
        console.log(req.params.id);
         if(err) return res.status(500).json({error:err.message});
    //    console.log(movies[0]["_id"]);
          if (req.body.title === '') return res.status(400).json({error: '电影标题不能为空！'});
          //var movie = new Movie();
          let post={};
           for (prop in req.body) {
               post[prop]=req.body[prop];
           }
           let movie=new Movie(post);
           let id="";
        for(let i in movies){
             if(movies[i]["_id"]==req.params.id){
                 id=i;
                 //console.log(movies[i]);
             }
        }
           movie.update(movie[id],movies[id]);   
           res.json(movies[id]);   
           console.log("更新电影成功");
    });
})

app.get('/movies/:id',function(req,res){
    Movie.find().sort({'createAt':-1}).exec(function(err,movies){
        if(err) return res.status(500).json({error:err.message});
        let id="";
        for(let i in movies){
             if(movies[i]["_id"]==req.params.id){
                 id=i;
    
             }
        }
        if(id){
            res.json(movies[id]);
        }else{
            res.json({message:'这个电影不存在!'})
        }
    });
})


app.delete('movies/:id',function(req,res){
    console.log("delete")
    Movie.find().sort({'createAt':-1}).exec(function(err,movies){
        if(err) return res.status(500).json({error:err.message});
        let id="";
        for(let i in movies){
             if(movies[i]["_id"]==req.params.id){
                 id=i;
             }
        }
       delete[movies[id]];
        if(id){
           movies.remove(movies[id]);
           console.log("删除成功");
        }else{
            res.json({message:'这个电影不存在!'})
        }
    });
})


var server=app.listen(3000,function(){ 
    console.log("你的服务器在3000端口运行");
})