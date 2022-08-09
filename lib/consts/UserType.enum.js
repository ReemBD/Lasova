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
    User: 5,
  },
  Write: {
    Volunteer: 6,
    VolunteerHours: 7,
    Group: 8,
    Dashboard: 9,
    Drive: 10,
    User: 11,
  },
  Edit: {
    Volunteer: 12,
    VolunteerHours: 13,
    Group: 14,
    Dashboard: 15,
    Drive: 16,
    User: 17,
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
      UserPermissions.Write.Volunteer,
      UserPermissions.Edit.Volunteer,

      UserPermissions.Read.VolunteerHours,
      UserPermissions.Write.VolunteerHours,
      UserPermissions.Edit.VolunteerHours,

      UserPermissions.Read.Group,
      UserPermissions.Write.Group,
      UserPermissions.Edit.Group,
    ],
  ],
  [UserTypes.Master, '**'],
]);

module.exports = { UserTypes, UserPermissions, UserTypePermissionsMap };
