const express =require('express')
const router = express.Router();


router.get('/',(req,res) => {
    res.send('hello world')
})

router.post('/',(req,res) => {
    
})

router.patch('/',(req,res) => {
    
})

router.delete('/',(req,res) => {
    
})

module.exports = router;
