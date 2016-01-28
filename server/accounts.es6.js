Accounts.onCreateUser(function(options, user) {
  var attachData,
    email,
    picture,
    profileImageUrl,
    profilePicture,
    url,
    service,
    allEmails,
    firstEmail;

  user.profile = user.profile || options.profile || {};

  //If the google service exists
  if ((service = user.services) !== undefined ? service.google : undefined) {
    user.emails = [ { address: user.services.google.email, verified: true } ];
    user.profile.name = user.services.google.name;
    user.profile.avatar = user.services.google.picture;
  }

  //No avatar defined from Google service? Okay let's get a Gravatar
  if (!user.profile.avatar) {
    email = ((allEmails = user.emails) !== undefined ? (firstEmail = allEmails[0]) !== undefined ? firstEmail.address : undefined : undefined) || '';
    url = Gravatar.imageUrl(Gravatar.cleanString(email));
    user.profile.avatar = url;
  }

  return user;
});

Meteor.publish('userData', function () {
  return Meteor.users.find({}, {fields: {profile: 1}});
});
