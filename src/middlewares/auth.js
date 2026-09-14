import jsonwebtoken from 'jsonwebtoken';


const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
        res.sendStatus(401);
    return;
  }
const parts = authHeader.split(" ")

const token = parts[1]
try {
    res.locals.user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    next()
}
catch (err){
    res.sendStatus(403);
}
}
export {authorize};