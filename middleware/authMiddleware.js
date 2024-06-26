import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(200).send({
          message: 'Auth Failed',
          success: false
        });
      } else {
        req.body.userId = decode.id;
        next();
      }     
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: 'Auth Failed',
      success: false
    });
  }
};

export default authenticate;
