Template.newDocumentModal.events({
  'click #new-document-submit-button': function(e, template) {
    var document = {
      likes: 0,
      downloads: 0,
      comments: []
    };
    const userId = template.$('#new-document-user-id').val().trim(),
      name = template.$('#new-document-person-name').val().trim(),
      email = template.$('#new-document-person-email').val().trim(),
      year = template.$('#new-document-year').val(),
      semester = template.$('#new-document-semester').val(),
      os = template.$('#new-document-os').val(),
      env = template.$('#new-document-env').val();

    document.person = {
      name: name,
      date: `${year}/${semester}`,
      userId: Meteor.userId()
    };
    document.os = os;
    document.env = env;


    Documents.insert(document);
    $('#new-document-modal').closeModal();
  },
  'change #new-document-other-user': function(e, template) {
    var isDisabled;
    const $nameEl = template.$('#new-document-person-name'),
      $emailEl = template.$('#new-document-person-email');

    isDisabled = !e.currentTarget.checked;
    $nameEl.attr('disabled', isDisabled);
    $emailEl.attr('disabled', isDisabled);
    if (!isDisabled) {
      $nameEl.focus().select();
    }
  }
});

Template.newDocumentModal.helpers({
  personNameAttrs: () => Meteor.user() ? Meteor.user().profile && { value: Meteor.user().profile.name, disabled: 'disabled' } : {},
  personNameLabelClass: () => Meteor.user() && Meteor.user().profile ? 'active' : '',
  personEmailAttrs: () => {
    var user = Meteor.user();
    if (user && user.emails) {
      return {
        value: user.emails[0].address,
        disabled: 'disabled'
      };
    } else if (user && user.services.google) {
      return {
        value: user.services.google.email,
        disabled: 'disabled'
      };
    }
    return {};
  },
  personEmailLabelClass: () => Meteor.user() && (Meteor.user().emails || (Meteor.user().services && Meteor.user().services.google)) ? 'active' : '',
  userId: () => Meteor.userId(),
  yearsAvailable: () => {
    var years = [],
      currentYear = new Date().getUTCFullYear();
    const firstYear = 2014;

    do {
      years.push(currentYear);
      currentYear--;
    } while (firstYear <= currentYear);
    return years.reverse();
  }
});

Template.newDocumentModal.rendered = function() {
  this.$('#new-document-button').leanModal();
  this.$('select').material_select();
  this.$('ul.tabs').tabs();
};
