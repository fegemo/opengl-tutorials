/**
 * Created by fegemo on 3/11/15.
 */

Documents = new Mongo.Collection('documents');

Meteor.methods({
  insertComment: function(documentId, newComment) {
    Documents.update(documentId, {
      $push: {
        comments: {
          $each: [newComment],
          $position: 0
        }
      }
    });
  },
  insertDocument: function(newDocument) {
    Documents.insert(newDocument);
  },
  countDownload: function(documentId) {
    Documents.update(documentId, {
      $inc: { downloads: 1 }
    });
  },
  countLike: function(documentId, amount) {
    if ([-1,1].indexOf(amount) === -1) {
      throw new Meteor.Error('Wrong argument', 'Can\'t increment likes count by ' + amount);
    }
    Documents.update(documentId, {
      $inc: { likes: amount }
    });
  }
});
