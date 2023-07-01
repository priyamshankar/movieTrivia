const express = require("express");
const router = new express.Router();
const sessionDetail = require("../Database/SessionDetail");
const moviedetail = require("../Database/movieDetail");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/api/checkroom",async (req,res)=>{
    try{
        // console.log(req.body.room);
        const fetchedFromDb = await sessionDetail.findOne({
            room : req.body.room,
        }).then((re)=>{
            // console.log(re);
            if(re!==null){
                res.send(true);
            }else res.send(false);
        })
    }catch(e){
        console.log(e);
    }
})

router.post("/api/addroom",async(req,res)=>{
    try{
        const getRandomMovie = await moviedetail.aggregate([{ $sample: { size: 5 } }]);
        const addedDetail = new sessionDetail({
            room:req.body.room,
            players:req.body.players,
            movie:getRandomMovie,
        })
        await addedDetail.save();
        res.send("room added successfully");
    }catch(e){
        console.log(e);
    }
})

router.post ("/api/postmovie",async(req,res)=>{
    try{
        console.log(req.body);
        const addedDetail = new moviedetail({
            movieName:req.body.movieName[0],
        leadActor:req.body.leadActor[0],
        leadActress:req.body.leadActress[0],
        genre:req.body.genre[0],
        yearLaunched:req.body.yearLaunched[0],
        dialog:req.body.dialog[0],
        director:req.body.director[0]
        })
        await addedDetail.save();
        res.send("movie added successfully");
    }catch(e){
        console.log(e);
    }
})

router.post("/api/getmovie",async(req,res)=>{
    try{
        const room = req.body.roomdata;
        const getRandomMovie = await sessionDetail.findOne({
            room:room,
        }).then((dataset)=>{
            // console.log(dataset.movie);
            res.send(dataset.movie);
        })
    }catch(e){
        console.log(e);
    }
})
module.exports=router;