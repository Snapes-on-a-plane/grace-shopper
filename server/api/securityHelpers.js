function secureRoutes(req, res, next) {
  if (req.rawHeaders.includes('Referer')) {
    return next()
  } else if (req.user) {
    const admin = req.user.isAdmin
    if (!req.rawHeaders.includes('Referer') && admin) {
      return next()
    } else {
      res.redirect('/')
    }
  } else {
    res.redirect('/')
  }
}

module.exports = secureRoutes
