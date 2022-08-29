const logger = require('../../services/logger.service');
const Group = require('./group.schema');

async function query({ volunteeringPrograms } = {}) {
  try {
    const groups = await Group.find();
    return groups;
  } catch (err) {
    logger.error('failed to fetch groups' + err);
    throw err;
  }
}

async function getById(groupId) {
  try {
    const group = await Group.findById(groupId);
    return group;
  } catch (err) {
    logger.error('failed to fetch volunteer ' + err);
    throw err;
  }
}

async function add(group) {
  try {
    group = new Group(group);
    group.save((err) => {
      if (err) return logger.error('couldnt save group', err);
    });
    return group;
  } catch (err) {
    logger.error('err while trying to add group ', err);
    throw err;
  }
}
/**
 * this function gets an array of groupIds
 * and removes the corresponding groups from the group collection.
 * then returns the updated collection to controller.
 *   */
async function remove(groupIds) {
  try {
    let res;
    if (groupIds.length === 1 || typeof groupIds === 'string') {
      res = await Group.deleteOne({ _id: groupIds });
    } else {
      res = await Group.deleteMany({
        _id: { $in: groupIds }
      });
    }

    return res;
  } catch (err) {
    logger.error(`error trying to delete groups with ids: ${groupIds.split(',')}`, err);
  }
}

async function update(group) {
  try {
    await Group.findByIdAndUpdate(group._id, group);
    return group;
  } catch (err) {
    logger.error(`error updating group ${group.id}`, err);
    throw err;
  }
}

module.exports = {
  query,
  remove,
  update,
  getById,
  add
};
