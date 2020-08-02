const Tweet = require('../Models/Tweet');


exports.getTweets=(req,res)=>{

    Tweet.find().populate('userId','name pic').then(tweets=>{

        res.json(tweets);

    }).catch(err=>{

        res.json('Error:' + err);

    })

}


exports.createTweet=(req,res)=>{

    const context = req.body.context;
    const userId = req.body.userId;
    const like = req.body.like;
    const comments = req.body.comments;

    const newTweet = new Tweet({context,userId,like,comments});

    newTweet.save().then(()=>{

        res.json('Tweet is Saved !')

    }).catch(err=>{

        console.log('Error:' + err);

    })

}

exports.updateTweet=(req,res)=>{

    Tweet.findById(req.params.id).then(tweet=>{

        tweet.like = req.body.like ? req.body.like : tweet.like;
        tweet.comments = req.body.comments ? req.body.comments : tweet.comments

        console.log(req.body.comments);

        tweet.save().then(()=>{

            res.json('Like is Updated !')

        }).catch(err=>{

            res.json('Error:' + err);

        })

    })

}


exports.updateLike=(req,res)=>{

    Tweet.findById(req.params.id).then(tweet=>{

        tweet.like = req.body;

        console.log(req.body)

        tweet.save().then(()=>{

            res.json('Like is Updated !')

        }).catch(err=>{

            res.json('Error:' + err);

        })

    })

}
exports.updateComments=(req,res)=>{

    Tweet.findById(req.params.id).then(tweet=>{

        tweet.comments = req.body;

        tweet.save().then(()=>{

            res.json('Comments are Updated !')

        }).catch(err=>{

            res.json('Error:' + err);

        })

    })

}

exports.deleteTweet=(req,res)=>{

    Tweet.findByIdAndDelete(req.params.id).then(()=>{

        res.json('Tweet is deleted')

    }).catch(err=>{

        res.json('Error:' + err);

    })

}

exports.getUserTweets=(req,res)=>{

    Tweet.find({userId : req.params.id}).populate('userId','name pic').then(tweets=>{

        res.json(tweets);

    }).catch(err=>{

        res.json(err);
    
    })

}