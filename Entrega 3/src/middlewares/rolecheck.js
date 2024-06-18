const checkUserRole = (allowedRoles) => (req,res,next) => {
    const userRole = req.session.user.role;

    if (userRole) {
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).json({ error: 'Acceso denegado.', role: userRole, allowedRoles: allowedRoles });
        }
    } else {
        res.status(403).json({ error: 'Acceso denegado.' , role: userRole, allowedRoles: allowedRoles });
    }
}

export default checkUserRole;