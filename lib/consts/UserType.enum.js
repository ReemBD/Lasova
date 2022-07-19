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
    Volunteers: 0,
    Groups: 1,
    Dashboard: 2,
    Drive: 3,
  },
  Write: {
    Volunteers: 4,
    Groups: 5,
    Dashboard: 6,
    Drive: 7,
  },
  Edit: {
    Volunteers: 8,
    Groups: 9,
    Dashboard: 10,
    Drive: 11,
  },
};

/**
 * Master User isnt included since it is given to have all permissions.
 */
const UserTypePermissionsMap = new Map([
  [
    UserTypes.Volunteer,
    [UserPermissions.Read.Volunteers, UserPermissions.Read.Groups],
  ],
  [
    UserTypes.ProgramManager,
    [
      UserPermissions.Read.Volunteers,
      UserPermissions.Read.Groups,
      UserPermissions.Write.Volunteers,
      UserPermissions.Write.Groups,
    ],
  ],
]);

module.exports = { UserTypes, UserPermissions, UserTypePermissionsMap };
