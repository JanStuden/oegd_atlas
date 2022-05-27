//mongodb://localhost:27017

const express = require('express')
const router = express.Router();
const fakeData = require('../../db/database');
const path = require('path');
let NodeModel = require ('../../model/Node')
let EdgeModel = require ('../../model/Edge')

router.route('/fullList').get((req,res) => {
    NodeModel.find({},'-_id',(err, node) => 
        {
            if(err){
              return next(err)
            }else {
              // console.log(node.data)
              res.json(node)
            }
        
          })
    })

router.route('/fullEdgeList').get((req,res) => {
    EdgeModel.find({},'-_id',(err, node) => 
        {
            if(err){
              return next(err)
            }else {
              // console.log(node.data)
              res.json(node)
            }
        
          })
    })

router.route('/fullList').get((req,res) => {
    NodeModel.find({},'-_id',(err, node) => 
        {
            if(err){
              return next(err)
            }else {
                // console.log(node.data)
              res.json(node)
              }
          
            })
      })

router.get('/', (req, res) => {
    
    res.send('HEy')
    //res.sendFile(path.join(__dirname,'..','public','index.html'));
});
router.get('/secret', (req, res) => {
  
  NodeModel.find({ "data.Line2": { "$regex": "Bayerisches Staatsministerium für Gesundheit und Pflege Bayern", "$options": "i" } },'-_id',(err, node) => 
  {
      if(err){
        return next(err)
      }else {
          // console.log(node.data)
        res.json(node)
        }
    })

    //res.send('you found the updated update')
    // res.sendFile(path.join(__dirname,'..','public','index.html'));
});

router.route('/fetch-by-name').get((req, res) => {

   let name=req.query.line2
   let gebiet=req.query.gebiet
  
   //res.send(name+" "+ gebiet)
   NodeModel.findOne({'data.Line2': name, 'data.Gebiet': gebiet}, (err, node) =>
   {
     if(err){
       return next(err)
     }else {
       res.json(node)
     }
 
   })
})

router.route('/post-edge').post((req,res,next) => {


  EdgeModel.create(req.body, (err, edge) => {
    if(err){
      return next(err)
    }
    else{
      res.json(edge)
      console.log('Edge created')
    }
  })
})

module.exports = router;