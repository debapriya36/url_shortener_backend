const express=require('express');
const router=express.Router();
const {generateShortUrl,getRedirectUrl,getAnalytics}=require('../controllers/url');

router.post('/url',generateShortUrl);
router.get('/:shortId',getRedirectUrl);
router.get('/url/analytics/:shortId',getAnalytics);

module.exports=router;