/*
 getUser - get the user
 getUserProfile - fetches details of logged in user
 updateUser - Lets users change info
 deleteUser - removes an account
 getAllUsers - if you are doing admin stuff
*/


exports.getUser = async (req, res) => {
    const UserId = req.user.id;
    const user = await User.findById(userID);
    res.json(user);
}


exports.createUser = (req, res) => res.status(201).json({ ok: true });
