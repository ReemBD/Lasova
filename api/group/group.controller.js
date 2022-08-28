const { query, remove, update, getById, add } = require('./group.service');

async function getGroups(req, res) {
  try {
    const queryOptions = req.query;
    const groups = await query(queryOptions);
    res.send(groups);
  } catch (err) {
    res.status(500).send({ err: 'Failed to fetch Groups' });
  }
}

async function removeGroup(req, res) {
  try {
    const { groupId } = req.params;
    const serviceRes = await remove(groupId);
    res.send(serviceRes);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function removeManyGroups(req, res) {
  try {
    const { ids } = req.query;
    if (!ids || !ids.length) {
      return res.send('Please Send desired groups to delete');
    }
    const handledIds = Array.isArray(ids) ? ids.split(',') : ids;
    const updatedGroups = await remove(handledIds);
    res.send(updatedGroups);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateGroup(req, res) {
  try {
    if (!req.body) return res.status(400).send('No Group sent');
    const group = req.body;
    const updatedGroup = await update(group);
    res.send(updatedGroup);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function addGroup(req, res) {
  try {
    let { body: group } = req;
    group = await add(group);
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getGroupById(req, res) {
  try {
    const { groupId } = req.params;
    const group = await getById(groupId);
    res.send(group);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getGroups,
  removeGroup,
  removeManyGroups,
  updateGroup,
  addGroup,
  getGroupById
};
