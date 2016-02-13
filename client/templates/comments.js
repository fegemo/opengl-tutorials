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
      $author = $form.find('#new-comment-author'),
      $text = $form.find('#new-comment-text'),
      author = $author.val().trim(),
      text = $text.val().trim();

    e.preventDefault();
    if (typeof activeDocument === 'undefined') {
      return false;
    } else if (text === '') {
      $text[0].focus();
      return;
    } else if (author === '') {
      $author[0].focus();
      return;
    }

    let newComment = {
      author: author,
      text: text,
      datetime: new Date()
    };

    if (Meteor.userId()) {
      newComment.userId = Meteor.userId();
    }

    Documents.update(activeDocument._id, {
      $push: {
        comments: {
          $each: [newComment],
          $position: 0
        }
      }
    }, function(error, affectedRecords) {
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
