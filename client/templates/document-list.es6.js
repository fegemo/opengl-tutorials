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

Template.documentList.dragging = [];

Template.documentList.events({
  'change #filters-container input': function(e) {
    var filters = Session.get('checkedFilters');
    filters[e.target.value] = e.target.checked;
    Session.set('checkedFilters', filters);
  },
  'mousedown .document, mouseup .document': function(e) {
    var dragging = Template.instance().dragging;

    if (e.type == 'mousedown') {
      dragging.push(e.currentTarget);
    } else {
      let indexOfDragged = dragging.indexOf(e.currentTarget);
      if (indexOfDragged > -1) {
        dragging.splice(indexOfDragged, 1);
      }
    }
  },
  'mousemove': function(e) {
    if (!Template.instance().dragging) {
      return;
    }
    var container = document.getElementById('documents-container');
    var position = {
      x: e.pageX - container.offsetLeft,
      y: e.pageY - container.offsetTop
    };
    Template.instance().dragging.forEach(function(el) {
      el.style.transform = 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0)';
    });
  }
});

Template.documentList.rendered = function() {

  //TODO: Need to know what is the meteor way to do this
  Blaze.renderWithData(Template.comments, function() {
    return Documents.findOne({_id: Session.get('activeDocument')});
  }, Template.instance().firstNode.parentElement, Template.instance().firstNode);

  Template.instance().dragging = [];
};
