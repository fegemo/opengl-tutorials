/**
 * Created by fegemo on 3/18/15.
 */

Template.comments.events({
  'submit #new-comment-form': function(e, template) {
    var activeDocument = Session.get('activeDocument'),
        $form = template.$(e.target),
        $author = $form.find('#new-comment-author'),
        $text = $form.find('#new-comment-text');

    if (typeof activeDocument === 'undefined') {
      return false;
    }

    Documents.update(activeDocument._id, {
      $push: { comments: {
        author: $author.val(),
        text: $text.val(),
        datetime: new Date()
      }}
    });

    $author.val('');
    $text.val('');

    e.preventDefault();
  }
});