const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('success', 'Already logged in')
        return res.redirect('/campgrounds');
    }
    res.render('users/register')
}

module.exports.register = async(req, res, err) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('success', 'Already logged in')
        return res.redirect('/campgrounds');
    }
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.currentUrl || '/campgrounds'
    delete req.session.currentUrl;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Log out successfully');
    res.redirect('/campgrounds')
}