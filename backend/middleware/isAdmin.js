// middleware/isAdmin
const isAdmin = (req, res, next) => {
    if (req.session && req.session.userRole === 'admin') {
      next(); // Admin is authenticated, proceed to the next middleware/route
    } else {
      res.status(403).json({ message: 'Access denied' }); // Block access
    }
  };
  
 export default isAdmin;
  