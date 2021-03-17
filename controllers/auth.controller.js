const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidation,registerValidation } = require('../validation');


module.exports.register = ('', async (req,res) =>  {
    
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email adresi zaten kayıtlı');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
     var savedData =  await user.save();
     res.send({user: user._id});

    }catch(err){
      res.status(400).send(err);
    }
     
});


module.exports.login = ('', async (req,res) =>  {
    // Validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check user
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email adresi bulunamadı');

    // Password check
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Geçersiz parola');

    // Create token
    const token = jwt.sign({ _id: user._id }, 'adsfdfdfdfd');
    res.header('auth-token',token).send(token);

});



