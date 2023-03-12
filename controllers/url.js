const URL=require('../models/url');
const {nanoid}=require('nanoid');// its old version of nanoid (3.3.4)

const generateShortUrl=async (req,res)=>{
    const {redirectURL}=req.body;
    if(!redirectURL)
    {
        return res.status(400).json({
            err : "URL is required"
        });
    }
    const shortId=nanoid(6);
    const data=await URL.create({
        shortId,
        redirectURL ,
        visiedHistory: []
    });
    return res.json({
        id : shortId
    });
}

const getRedirectUrl=async (req,res)=>{
    const {shortId}=req.params;
    const data=await URL.findOneAndUpdate({
        shortId
    },
    {
        $push : {
            visiedHistory : {
                timestamp : Date.now()
            }
    }
});
    if(!data)
    {
        return res.status(404).json({
            err : "URL not found"
        });
    }
    console.log(data.redirectURL);
    return res.redirect(data.redirectURL);

}

const getAnalytics=async (req,res)=>{
    const {shortId}=req.params;
    const data=await URL.findOne({shortId});
    if(!data)
    {
        return res.status(404).json({
            err : "URL not Visited"
        });
    }
    const date = new Date(data.visiedHistory[data.visiedHistory.length-1].timestamp);
   // console.log(date);
    return res.json({
        totalVisits : data.visiedHistory.length,
        lastVisited : date.toLocaleString()
    });
}


module.exports={generateShortUrl,getRedirectUrl,getAnalytics};