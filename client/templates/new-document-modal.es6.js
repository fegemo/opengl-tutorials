
var validateNewDocument,
  resetForm;

resetForm = function($form) {
  var $name = $form.find('#new-document-person-name'),
    $email = $form.find('#new-document-person-email'),
    $userId =  $form.find('#new-document-user-id'),
    name = $name.val(),
    email = $email.val(),
    userId = $userId.val();

  $form[0].reset();

  $name.val(name);
  $email.val(email);
  $userId.val(userId);

  $form.find('input,select').removeClass('invalid').removeClass('touched');
  $form.find('label,i.prefix').removeClass('active');
  $name.next('label').addClass('active');
  $email.next('label').addClass('active');
}

validateNewDocument = function(form, template) {
  const formElements = Array.from(form.elements),
    isFormValid = form.checkValidity();

  const validation = {
    success: isFormValid,
    values: {
      userId: template.$('#new-document-user-id').val().trim(),
      name: template.$('#new-document-person-name').val().trim(),
      email: template.$('#new-document-person-email').val().trim(),
      year: template.$('#new-document-year').val(),
      semester: template.$('#new-document-semester').val(),
      os: template.$('#new-document-os').val(),
      env: template.$('#new-document-env').val(),
      // content: contentField
      content: template.$('#content-url').val().trim()
    },
    issues: formElements
      .filter((el) => !el.validity.valid)
      .map((el) => {
        return { el: el, error: el.validationMessage };
      })
  };

  validation.issues.forEach((item) => {
    item.el.classList.add('invalid')
    item.el.setCustomValidity(item.error);
  });

  return validation;
};

Template.newDocumentModal.events({
  'submit form': function(e, template) {
    var document = {
      likes: 0,
      downloads: 0,
      comments: []
    };
    const validation = validateNewDocument(e.target, template);

    e.preventDefault();
    if (!validation.success) {
      return;
    }

    const loggedUser = Meteor.userId() && !template.$('#new-document-other-user')[0].checked,
      otherUser = Meteor.users.findOne({'profile.email': validation.values.email });

    document.person = {
      name: validation.values.name,
      date: `${validation.values.year}/${validation.values.semester}`,
      userId: loggedUser ? validation.values.userId : (otherUser ? otherUser._id : validation.values.userId)
    };
    document.os = [validation.values.os];
    document.env = [validation.values.env];
    document.content = validation.values.content;


    Meteor.call('insertDocument', document, function(error, result) {
      template.$('#new-document-modal').closeModal();
      resetForm(template.$(e.currentTarget));
    });
  },

  // when the user checks/unchecks on the checkbox "other user"
  'change #new-document-other-user': function(e, template) {
    template.otherUserChecked.set(e.currentTarget.checked);

    if (template.otherUserChecked.get()) {
      Meteor.setTimeout(() => template.$('#new-document-person-name').focus().select(), 0);
    }
  }
});

Template.newDocumentModal.helpers({
  // name and email can't be edited if user is (a) logged in and (b) "other user" checkbox is unchecked
  userDetailsDisabled: () => Meteor.userId() && !Template.instance().otherUserChecked.get(),
  // name is shown if user is (a) logged in and (b) has a profile and (c) "other user" checkbox is unchecked
  personName: () => Meteor.user() && !Template.instance().otherUserChecked.get() ? Meteor.user().profile.name : '',
  personNameLabelClass: () => Meteor.userId() && !Template.instance().otherUserChecked.get() ? 'active' : '',
  personNameGridColumns: () => Meteor.userId() ? '4' : '6',
  // email is shown if user is (a) logged in and (b) has a profile and (c) "other user" checkbox is unchecked
  personEmail: () => Meteor.userId() && Meteor.user() && !Template.instance().otherUserChecked.get() ? Meteor.user().profile.email : '',
  personEmailLabelClass: () => Meteor.userId() && !Template.instance().otherUserChecked.get() ? 'active' : '',
  personEmailGridColumns: () => Meteor.userId() ? '5' : '6',
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
  },
  otherUserChecked: () => Template.instance().otherUserChecked.get()
});

Template.newDocumentModal.rendered = function() {
  // materialize plugins
  var template = this;
  template.$('#new-document-button').leanModal({
    ready: function() {
      template.$('#new-document-modal .modal-content').scrollTop(0);
    },
    complete: function() {
      var $form = template.$('#new-document-modal form');
      resetForm($form);
    }
  });
  template.$('select').each(function() {
    var $selectWrapper,
      $selectDropdown,
      $selectOriginal = $(this);

    $selectOriginal.material_select();
    $selectWrapper = $selectOriginal.closest('.select-wrapper');
    $selectDropdown = $selectWrapper.find('.select-dropdown');
    $selectOriginal.insertBefore($selectDropdown[0]);

    $selectDropdown.on('focus', function() { this.classList.add('touched'); });
  });
  template.$('ul.tabs').tabs();
  template.$('.tooltipped').tooltip({ delay: 100 });
};

Template.newDocumentModal.created = function() {
  // reactive vars
  this.otherUserChecked = new ReactiveVar(false);
};
