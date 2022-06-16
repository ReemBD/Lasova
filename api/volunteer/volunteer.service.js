const logger = require('../../services/logger.service');
const fs = require('fs/promises');
const Volunteer = require('./volunteer.schema');
/**
 * Currently acceps isDefault and doReset as params,
 * doReset - flag that indicates whether should restore data to initial value
 * isDefault - flag that indicates whether should use initial data */
async function query({} = {}) {
  try {
    const volunteers = await Volunteer.find();
    return volunteers;
  } catch (err) {
    logger.error(`failed to fetch volunteers` + err);
    throw err;
  }
}

async function getById(volunteerId) {
  try {
    const volunteer = await Volunteer.findById(volunteerId);
    return volunteer;
  } catch (err) {
    logger.error(`failed to fetch voluntter` + err);
    throw err;
  }
}

async function add(volunteer) {
  try {
    volunteer = new Volunteer(volunteer);
    volunteer.save((err, volunteer) => {
      if (err) return logger.error('couldnt save volunteer', err);
    });
    return volunteer;
  } catch (err) {
    logger.error(`couldn't add volunteer `, err);
    throw err;
  }
}
/**
 * this function gets an array of volunteerIds
 * and removes the corresponding volunteers from the volunteer collection.
 * then returns the updated collection to controller.
 *   */
async function remove(volunteerIds) {
  try {
    const res = await Volunteer.deleteMany({
      _id: { $in: volunteerIds },
    });
    return res;
  } catch (err) {
    logger.error(`error trying to delete ${volunteerIds.split(',')}`, err);
  }
}

async function update(volunteer) {
  try {
    const res = await Volunteer.findByIdAndUpdate(volunteer._id, volunteer);
    return res;
  } catch (err) {
    logger.error(`error updating volunteer ${volunteer.id}`, err);
    throw err;
  }
}

module.exports = {
  query,
  remove,
  update,
  getById,
  add,
};
