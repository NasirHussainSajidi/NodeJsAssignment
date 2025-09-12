const adminAuth = (req, res, next) =>{
    const password = 1122
    const authentication = password === 112
    if(!authentication){
        res.status(401).send('Unauthorized User ! ')
    }else{
        next()
    }
}

module.exports = {
    adminAuth
}