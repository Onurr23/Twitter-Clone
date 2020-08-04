const User = require('../Models/User');
const bcrypt = require('bcrypt');

exports.createUser=(req,res)=>{

    const name = req.body.name;
    const pic = req.body.pic;
    const email = req.body.email;
    const password = req.body.password;
    const followers = req.body.followers;
    const following = req.body.following;
    const tweets = req.body.tweets;

    if(name === "" && pic === "" && email === "" && password === "")  {

        res.status(500).json('Please Fill Up All Fields!');

        }

    User.findOne({email : email }).then(user=>{

        if(user){

            res.status(400).json('This E-Mail Address is Already Taken')

        }

        return bcrypt.hash(password,10);

    }).then((hashedPassword)=>{

        const newUser = new User({name,pic,email,password :hashedPassword,followers,following,tweets});

        newUser.save().populate('tweets').then((user)=>{

            res.status(200).json(user)
    
        }).catch((err)=>{
    
            res.status(500).json('Error !')
    
        })

    })

}

exports.signUserIn=(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email}).populate('tweets').then(user=>{

        if(!user){

            res.json('This Email Address Is Not Exist')

        }

        
        bcrypt.compare(password,user.password).then((result)=>{

            if(result){

                
               res.json(user);


            }else{

                res.json('Password Is Not Correct')

            }

        })


    }).catch((err)=>{

        
        res.json('Error')

    })

}

exports.getUser=(req,res)=>{

    User.findById(req.params.id).populate('tweets').populate('userId').then(user=>{

        res.json(user);

    }).catch(err=>{

        res.json('Error :'+err);

    })

}

exports.updateUser=(req,res)=>{

    User.findById(req.params.id).then(user=>{

        user.following = req.body;
        
        user.save().then(()=>{

            res.json('Updated !')

        }).catch(err=>{

            res.json(err);

        })

    })

}

exports.updateProfile=(req,res)=>{

    User.findById(req.params.id).then(user=>{

        user.followers = req.body;
        
        user.save().then(()=>{

            res.json('Updated !')

        }).catch(err=>{

            res.json(err);

        })

    })

}

exports.updateUserTweets=(req,res)=>{

    User.findById(req.params.id).then(user=>{

        user.tweets = req.body;
        
        user.save().then(()=>{

            res.json('Updated !')

        }).catch(err=>{

            res.json(err);

        })

    })

}