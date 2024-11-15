// middleware/isAuthenticated.js
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      next(); // User is authenticated, proceed to the next middleware/route
    } else {
      res.status(401).json({ message: 'Unauthorized' }); // Block access
    }
  };
  
 export default isAuthenticated;
  