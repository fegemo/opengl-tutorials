/**
 * Created by fegemo on 3/18/15.
 */
var userLoggedInHasProfileName = () =>
  !!Meteor.user() &&
  !_.isUndefined(Meteor.user().profile) &&
  !_.isEmpty(Meteor.user().profile.name);

Template.comments.helpers({
  comments: function() {
    // The line below was working, but I had lost reactivity: when adding a
    // new comment, this helper was not invalidating/rerunning
    // return _.sortBy(this.comments, function(c) { return -c.datetime; });

    var doc = Documents.findOne({_id: this._id}),
      comments = [];
    if (doc) {
      // comments = _.sortBy(doc.comments, c => -c.datetime)
      comments = doc.comments;
    }
    return comments;
  },
  userName: () => {
    return userLoggedInHasProfileName() ? Meteor.user().profile.name : '';
  },
  userDetailsDisabled: userLoggedInHasProfileName
});

Template.comments.events({
  'submit #new-comment-form': function(e, template) {
    var activeDocument = Session.get('activeDocument'),
      $form = template.$(e.target),
      $submit = $form.find('#new-comment-submit'),
      $author = $form.find('#new-comment-author'),
      $text = $form.find('#new-comment-text'),
      author = $author.val().trim(),
      text = $text.val().trim();

    // sets new state for the form (disabling submit etc.)
    e.preventDefault();
    $submit.find('.preloader-wrapper').addClass('active');
    $submit.attr('disabled', '');
    $submit.addClass('disabled');

    // very simple validation
    if (typeof activeDocument === 'undefined') {
      return false;
    } else if (text === '') {
      $text[0].focus();
      return;
    } else if (author === '') {
      $author[0].focus();
      return;
    }

    // comment to be inserted
    let newComment = {
      author: author,
      text: text,
      datetime: new Date(),
      userId: Meteor.userId(),

      // generates some _id so that Blaze can differentiate between "comment" objects
      // this was necessary so that the animation of inserted comment would
      // properly identify the newly added item (w/o this it was considering the
      // tail of the array as the added item, not the head one)
      _id: Random.id(),
    };

    if (!newComment.userId) {
      delete newComment.userId;
    }

    // Inserts the new comment into the comments array of the active document
    Meteor.call('insertComment', activeDocument._id, newComment, function(error, result) {
      // resets the state of the form
      $submit.find('.preloader-wrapper').removeClass('active');
      $submit.removeAttr('disabled');
      $submit.removeClass('disabled');

      if (!error) {
        $text.val('').focus();
        $text.trigger('autoresize');
      }
    });
  }
});

Template.comments.rendered = function() {
  this.$('.collapsible').collapsible();
  this.$('.button-collapse').sideNav({
    edge: 'left',
    menuWidth: 300
  });
  this.$('.tooltipped').tooltip({delay: 50 });
  this.$('#new-comment-text').characterCounter();
}

Template.comment.rendered = function() {
  this.$('.tooltipped').tooltip({delay: 50 });
}
