/**
 * Created by fegemo on 3/17/15.
 */

// configures moment to output portuguese
moment.locale('pt-br');

var reusableHelpers = {
  lowerCase: (s) =>  (s || '').toLowerCase(),
  initials: (s) => {
    var match =  (s || '').match(/\b(\w)/g) || [];
    return match.join('').toUpperCase();
  },
  gravatar: (email) => {
    var cleanEmail = Gravatar.cleanString(email);
    return Gravatar.imageUrl(cleanEmail, {
      size: 196
    });
  },
  googleAvatar: (user) => user.services.google ? user.services.google.picture : null
};

Template.registerHelper('lowerCase', reusableHelpers.lowerCase);

Template.registerHelper('initials', reusableHelpers.initials);

Template.registerHelper('gravatar', reusableHelpers.gravatar);

Template.registerHelper('googleAvatar', reusableHelpers.googleAvatar);

Template.registerHelper('avatar', (user) => {
  // Tries: (1) google avatar, (2) gravatar, then (3) just initials
  return reusableHelpers.googleAvatar(user)
    || (user.emails ? reusableHelpers.gravatar(user.emails[0].address) : null)
    || reusableHelpers.initials(user.profile.name);
});

Template.registerHelper('humanTime', function(time) {
  return moment(time).fromNow();
  return time;
});

Template.registerHelper('sortBy', function(array, field, ascOrDesc) {
  return _.sortBy(array, function(item) {
    return item[field] * (parseInt(ascOrDesc) || 1);
  });
});
