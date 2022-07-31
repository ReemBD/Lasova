// Currently, only Yulia has Master, which means she can do whatever she wants.
// Program Managers have Permissions as stated below, and of course only volunteers/groups that belong to their
const UserTypes = {
  Volunteer: 0,
  ProgramManager: 1,
  Master: 2,
};

// The Order of the numbers is not important, feel free to destroy it if some adding/deleting is required and you too lazy.
const UserPermissions = {
  Read: {
    Volunteer: 0,
    VolunteerHours: 1,
    Group: 2,
    Dashboard: 3,
    Drive: 4,
  },
  Write: {
    Volunteer: 5,
    VolunteerHours: 6,
    Group: 7,
    Dashboard: 8,
    Drive: 9,
  },
  Edit: {
    Volunteer: 10,
    VolunteerHours: 11,
    Group: 12,
    Dashboard: 13,
    Drive: 14,
  },
};

/**
 * Master User isnt included since it is given to have all permissions.
 */
const UserTypePermissionsMap = new Map([
  [
    UserTypes.Volunteer,
    [UserPermissions.Read.Volunteer, UserPermissions.Read.Group],
  ],
  [
    UserTypes.ProgramManager,
    [
      UserPermissions.Read.Volunteer,
      UserPermissions.Read.Group,
      UserPermissions.Write.Volunteer,
      UserPermissions.Write.Group,
    ],
  ],
  [UserTypes.Master, '**'],
]);

module.exports = { UserTypes, UserPermissions, UserTypePermissionsMap };
