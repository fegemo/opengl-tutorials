
var helpers = {
  lowerCase: (s) =>  (s || '').toLowerCase(),
  user: function() {
    var user;
    if (this.user) user = this.user;
    else if (this.userId) user = Meteor.users.findOne({ _id: this.userId });
    else user = Meteor.user();

    return user;
  },
  username: (user) => {
    var profile,
      services,
      google;

    if (user && (profile = user.profile) && profile.name) {
      return profile.name;
    } else if (user && (services = user.services) && (google = services.google) && google.name) {
      return google.name;
    }
    return '';
  },
  initials: (s) => {
    var match =  (s || '').match(/\b(\w)/g) || [];
    return match.join('').toUpperCase();
  },
  avatar: (user) => {
    if (!user || !user.profile) return '';
    return user.profile.avatar;
  }
};

Template.avatar.helpers({
  imageUrl: function() {
    const user = helpers.user.apply(this);
    return helpers.avatar(user);
  },
  initials: function() {
    const user = helpers.user.apply(this);
    return helpers.initials(helpers.username(user));
  },
  username: function() {
    const user = helpers.user.apply(this);
    return helpers.username(user);
  }
});
