async function getVolunteers(req, res) {
  try {
    //fake async for now
    setTimeout(() => {
      res.send([]);
    }, 200);
  } catch (error) {
    let errorMessage;
    switch (error.response.status) {
      case 500:
      default:
        errorMessage = 'Failed to get volunteers';
        break;
    }
    res.status(error.response.status).send({ err: errorMessage });
  }
}

async function getVolunteersByProjectId(req, res) {
  try {
    setTimeout(() => {}, 200);
  } catch (err) {}
}

module.exports = {
  getVolunteers,
  getVolunteersByProjectId,
};
