const passport = require('passport') ;
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStrategy( async (USERNAME, passwaord, done)=>{
    //authentication logic here
    try{
       // console.log('Received credentials', USERNAME, passwaord);
        const user = await Person.findOne({username: USERNAME});
        if(!user){
            return done(null,false,{message: 'Incorrect username.'});
        }

        const isPasswordMatch = await user.comparePassword(passwaord);
        
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message: 'Incorrect Password'});
        }
        
    }catch(err){
        return done(err);
    }
}));

module.exports = passport;
