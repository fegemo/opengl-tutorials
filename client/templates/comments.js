/**
 * Created by fegemo on 3/18/15.
 */
Template.comments.helpers({
  comments: function() {
    return _.sortBy(this.comments, function(c) { return -c.datetime; });
  }
});
Template.comments.events({
  'submit #new-comment-form': function(e, template) {
    var activeDocument = Session.get('activeDocument'),
        $form = template.$(e.target),
        $author = $form.find('#new-comment-author'),
        $text = $form.find('#new-comment-text');

    if (typeof activeDocument === 'undefined') {
      return false;
    }

    Documents.update(activeDocument, {
      $push: { comments: {
        author: $author.val(),
        text: $text.val(),
        datetime: new Date()
      }}
    }, function(error, affectedRecords) {
      if (!error) {
        $author.val('');
        $text.val('');
        console.log('affectedRecords: ', affectedRecords);
      }
    });

    e.preventDefault();
  }
});