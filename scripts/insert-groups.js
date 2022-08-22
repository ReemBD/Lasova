const groupsToInsert = [
  {
    groupType: 'מגזר ציבורי',
    groupName: 'מכינת נחשון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'מגזר ציבורי',
    groupName: 'מכינת נחשון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'מגזר ציבורי',
    groupName: 'מכינת נחשון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
  {
    groupType: 'נסיון',
    groupName: 'נסיון',
    contactName: 'בר הורביץ',
    contactRole: 'מנהלת קהילה',
    cellphone: '0528996574',
    volunteersCount: 20,
    reportedHours: 100,
    volunteeringsCount: 7,
  },
];

const mongoose = require('mongoose');
const { dbURI, dbName } = require('../env/index.config');
const Group = require('../api/group/group.schema');

mongoose.connect(dbURI, {
  dbName,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', async function () {
  const groups = await Group.find();
  console.log('groups: ', groups);
});

console.log('testing');

module.exports = {};
