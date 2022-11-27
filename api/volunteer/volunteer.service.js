const logger = require('../../services/logger.service');
const Volunteer = require('./volunteer.schema');
const {ErrorMessages} = require('../../lib/consts/ErrorMessages')
/**
 * Currently acceps isDefault and doReset as params,
 * doReset - flag that indicates whether should restore data to initial value
 * isDefault - flag that indicates whether should use initial data */
async function query(filter = {}) {
  try {
    const criteria = _buildVolunteerQueryFilter(filter);
    const volunteers = await Volunteer.find(criteria);
    return volunteers;
  } catch (err) {
    logger.error('failed to fetch volunteers' + err);
    throw err;
  }
}

async function getById(volunteerId) {
  try {
    const volunteer = await Volunteer.findById(volunteerId);
    return volunteer;
  } catch (err) {
    logger.error('failed to fetch voluntter' + err);
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
    logger.error("couldn't add volunteer ", err);
    throw err;
  }
}

async function remove(volunteerIds) {
  try {
    const res = await Volunteer.deleteMany({
      _id: { $in: volunteerIds }
    });
    return res;
  } catch (err) {
    logger.error(`error trying to delete ${volunteerIds.split(',')}`, err);
  }
}

async function adminUpdate(volunteer, currentUser) {
  try {
    const originalVolunteer = await Volunteer.findById(volunteer._id)
    // check if the same user who posting
    var volunteerInHisProgram = false
    if (currentUser.userType === 1) {
      Object.values(currentUser.associatedPrograms).forEach(program => {
        if (originalVolunteer.volunteeringProgram === program["name"]) {
          volunteerInHisProgram = true
        }
        })
      };
    if (!volunteerInHisProgram) {
        throw Error(ErrorMessages.DontHavePermission);
      }
    
    const res = await Volunteer.findByIdAndUpdate(volunteer._id, volunteer);
    return res;
  } catch (err) {
    logger.error(`error updating volunteer ${volunteer.id}`, err);
    throw err;
  }
}

async function volunteerUpdate(volunteer, currentUser) {
  try {
    
    const originalVolunteer = await Volunteer.findById(volunteer._id)
    // check if the same user who posting
    checkIfSameUser = query({ email: currentUser.email }).then((response)=>{
      if (response[0].email !== originalVolunteer.email) {
        throw Error(ErrorMessages.DontHavePermission);
      }
    })

    // check if volunteer only changed what he have permission to
    for (const [key,value] of Object.entries(volunteer)) {
      if (key === 'hours'){
        value.map((entry, index) => { 
        if (originalVolunteer.hours.includes(originalVolunteer.hours[index]) === false && entry['verified'] !== 'false') {
          throw Error(ErrorMessages.DontHavePermission);
        } 
        if (originalVolunteer.hours.includes(originalVolunteer.hours[index]) && entry['verified'] ==! originalVolunteer.hours[index]['verified'] ) {
          throw Error(ErrorMessages.DontHavePermission);
        } 
        if(originalVolunteer.hours.includes(originalVolunteer.hours[index]) && [entry.date,entry.starthour,entry.endhour] !== [
          originalVolunteer.hours[index]['date'],
          originalVolunteer.hours[index]['starthour'],
          originalVolunteer.hours[index]['endhour']] && entry['verified'] !== 'false') {
            throw Error(ErrorMessages.DontHavePermission);
          }
       })
      } else if (value ==! originalVolunteer[key]) {
        throw Error(ErrorMessages.DontHavePermission);
      }
    }

    const res = await Volunteer.findByIdAndUpdate(volunteer._id, volunteer);
    return res;
    
  
  
  } catch (err) {
    logger.error(`error updating volunteer ${volunteer.id}`, err);
    throw err;
  }
}

const _buildVolunteerQueryFilter = (query) => {
  const filter = {};
  Object.keys(query).forEach((currQueryKey) => {
    switch (currQueryKey) {
      case 'volunteeringPrograms':
        filter.volunteeringProgram = {
          $in: query[currQueryKey]
        };
        break;
      default:
        filter[currQueryKey] = query[currQueryKey];
        break;
    }
  });
  return filter;
};

module.exports = {
  query,
  remove,
  adminUpdate,
  volunteerUpdate,
  getById,
  add
};
