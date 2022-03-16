let url = '/public/views/index.html'

const getUser = (req, res, next) => {
  //console.log('login controller usuario', req.user)
  if (req.user) {
    res.send({
      isAdmin: req.user.isAdmin,
      user: req.user.nombre,
      avatar: req.user.avatar,
      carrito: req.user.carrito
    })
  } else {
    res.send(false)
  }
}

module.exports = {
  getUser
}
