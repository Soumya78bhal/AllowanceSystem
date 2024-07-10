const {body}=require( 'express-validator')

const loginValidator=[
    body('name','Name cannot be empty').not().isEmpty(),
    body('password','Minimum length is 8 characters').isLength({min:8})
]
module.exports=loginValidator