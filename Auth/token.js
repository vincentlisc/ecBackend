const express = require('express');
const jwt = require('jsonwebtoken');

function authToken(req,res,next){
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.cookies['accessToken'];
    console.log(token)
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) =>{
        if(err) return res.sendStatus(403);
        req.id = email.id;
        next();
    })
}

module.exports = authToken;