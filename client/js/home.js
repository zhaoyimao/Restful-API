window.onload=function(){
    const homepage={
        init(){
            axios.default.baseURL=`http://localhost:3000`;
            homepage.fun.render();
            document.addEventListener('click',homepage.fun.handleDeleteMovieClick,false);
        },
        fun:{
            render(){
                    axios.get('http://localhost:3000/movies')
        .then(function(response){
        let movies=response.data, str='';
        movies.forEach(movie => {
            let star="★★★★★☆☆☆☆☆";
            let rate=Math.round(movie.score/2);
            str=str+`
             <li class="movieBox">
             <i class="delMovie" data-movieId="${movie.id}">x</i>
             <div class="mPost">
                <img src="${movie.post}" alt="${movie.title}">
            </div>
            <div class="mTitle">${movie.title}</div>
            <div class="mScore">${star.slice(5-rate,10-rate)+movie.score}分</div>
        </li>`
    });
    let movieRow=document.getElementById("movesRow");
    movieRow.innerHTML+=str;
       // console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
},
handleDeleteMovieClick(e){
        let movieId=e.target.getAttribute("data-movieId");
        if(movieId){
            let confirmDel=confirm("确认删除？");
            if(confirmDel)
            homepage.fun.deleteMovieId(movieId)
            else return
        }else return
    },
    deleteMovieId(movieID){
            axios.delete(`http://localhost:3000/movies/${movieID}`)
            .then(function(response){
                if(response.status===200)
                console.log("删除成功");
                render();
            })
            .catch(function(error){
                console.log(error);
            })
        }
}
            }
            homepage.init();
        }
    
