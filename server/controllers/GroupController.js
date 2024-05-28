const Group = require('../models/Group');
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const { sendInvitationEmail } = require('../utils/emailUtil');

// Create a new group
exports.createGroup = async (req, res) => {
  const { name, members } = req.body;
  const userId = req.user._id;

  try {
    const group = new Group({
      name,
      creator:userId,
      members: [userId], // Initial group members include the creator
    });

    await group.save();

    // Send invitations and create invitation records
    members.forEach(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        group.members.push(user._id);
        await group.save();
      } else {
        const invitation = new Invitation({
          email,
          groupId: group._id,
        });
        await invitation.save();
        sendInvitationEmail(email, group._id);
      }
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// register a user and accept invitation
module.exports.acceptInvitation = async (req,res) => {
  const { email, groupId, name, password, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, password, phone });
      await user.save();
    }

    const invitation = await Invitation.findOne({ email, groupId, status: 'pending' });
    if (!invitation) {
      return res.status(400).json({ error: 'Invalid invitation or already accepted' });
    }

    const group = await Group.findById(groupId);
    group.members.push(user._id);
    await group.save();

    invitation.status = 'accepted';
    await invitation.save();

    res.status(200).json({ message: 'Invitation accepted and user added to the group' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// All groups of a user 
module.exports.getGroups = async(req,res)=>{
  try {
    const userId = req.user._id;
    const groups = await Group.find({ members: userId });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// group details
module.exports.groupDetails = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId).populate('members', '-password');
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}