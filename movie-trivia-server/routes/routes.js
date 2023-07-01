const express = require("express");
const router = new express.Router();
const sessionDetail = require("../Database/SessionDetail");
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
        const addedDetail = new sessionDetail({
            room:req.body.room,
            players:req.body.players,
        })
        await addedDetail.save();
        res.send("room added successfully");
    }catch(e){
        console.log(e);
    }
})

module.exports=router;