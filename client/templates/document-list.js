/**
 * Created by fegemo on 3/11/15.
 */

// -- template: documentList
Session.setDefault('checkedFilters', { windows: false, linux: false, mac: false});
Session.set('activeDocument', {});

Template.documentList.helpers({
  documents: function() {
    return Documents.find({});
  },
  filterChecked: function(type) {
    return {
      checked: Session.get('checkedFilters')[type]
    };
  },
  activeDocument: function() {
    //return Tracker.autorun(function() {
      return Session.get('activeDocument');
    //});
  }
});

Template.documentList.events({
  'change #filters-container input': function(e) {
    var filters = Session.get('checkedFilters');
    filters[e.target.value] = e.target.checked;
    Session.set('checkedFilters', filters);
  }
});

Template.documentList.rendered = function() {

  //TODO: Need to know what is the meteor way to do this
  Blaze.renderWithData(Template.comments, function() {
    return Documents.findOne({_id: Session.get('activeDocument')});
  }, Template.instance().firstNode.parentElement, Template.instance().firstNode);
};