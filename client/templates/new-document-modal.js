
var validateNewDocument;//,
  // validateMultipleSelect,
  // validateContent;

validateNewDocument = function(form, template) {
  const formElements = Array.from(form.elements),
    // activeTabSelector = template.$('#new-document-content-tabs a.active').attr('href'),
    // formMultipleSelects = template.$('select[multiple]').toArray();
    // contentField = validateContent[activeTabSelector](template),

    isFormValid = form.checkValidity();//,
    // isMultipleSelectsValid = formMultipleSelects
    //   .map(validateMultipleSelect)
    //   .reduce((prev, curr) => prev && curr, true),
    // isContentFieldValid = contentField.success;


  const validation = {
    success: isFormValid,
      // &&  isMultipleSelectsValid
      // && isContentFieldValid,
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
//
// validateMultipleSelect = function(select) {
//   var valid = select.value !== '';
//   select.setCustomValidity(valid ? '' : 'Selecione pelo menos uma opção');
//
//   return valid;
// };

// validateContent = {
//   '#tab-video-url': (template) => {
//     var $urlEl = template.$('#video-url'),
//       url = $urlEl.val().trim(),
//       valid = !!url && $urlEl[0].checkValidity();
//
//     $urlEl[0].setCustomValidity(valid ? '' : 'Digite a URL, com seu devido formato');
//     return {
//       success: valid,
//       videoUrl: url
//     };
//   },
//   '#tab-video-upload': (template) => {},
//   '#tab-file-url': (template) => {},
//   '#tab-file-upload': (template) => {}
// };

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


    Documents.insert(document);
    $('#new-document-modal').closeModal();
    e.target.reset();
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
  personName: () => Meteor.userId() && Meteor.user() && !Template.instance().otherUserChecked.get() ? Meteor.user().profile.name : '',
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
  this.$('#new-document-button').leanModal({
    ready: function() {
      $('#new-document-modal .modal-content').scrollTop(0);
    },
    complete: function() {
      var $form = $('#new-document-modal form');
      $form[0].reset();
      $form.find('input,select').removeClass('invalid touched');
      $form.find('label,i.prefix').removeClass('active');
    }
  });
  this.$('select').each(function() {
    var $selectWrapper,
      $selectDropdown,
      $selectOriginal = $(this);

    $selectOriginal.material_select();
    $selectWrapper = $selectOriginal.closest('.select-wrapper');
    $selectDropdown = $selectWrapper.find('.select-dropdown');
    $selectOriginal.insertBefore($selectDropdown[0]);

    $selectDropdown.on('focus', function() { this.classList.add('touched'); });
  });
  this.$('ul.tabs').tabs();
  this.$('.tooltipped').tooltip({ delay: 100 });
};

Template.newDocumentModal.created = function() {
  // reactive vars
  this.otherUserChecked = new ReactiveVar(false);
};
