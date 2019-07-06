const { User } = require('../models');

class SessionController {
  static async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (!(await user.checkPassword(password))) return res.status(401).json({ message: 'Passsword incorrect' });

    return res.json({
      token: await user.generateToken(),
    });
  }
}

module.exports = SessionController;
