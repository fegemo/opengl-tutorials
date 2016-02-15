/**
 * Created by fegemo on 3/11/15.
 */

// -- template: documentList
Session.setDefault('activeFilters', { semester: [], os: [], env: [] });
Session.set('activeDocument', {});

Template.documentList.helpers({
  documents: function() {
    return Documents.find({});
  },
  filterChecked: function(type, filter) {
    var active = Session.get('activeFilters');
    return _.contains(active[type], filter);
  },
  activeDocument: function() {
    return Session.get('activeDocument');
  },
  semestersAvailable: function() {
    var years = [],
      currentYear = new Date().getUTCFullYear();
    const firstYear = 2014;

    do {
      years.push(currentYear);
      currentYear--;
    } while (firstYear <= currentYear);
    return years.reverse().reduce((prev, year) => prev.concat(`${year}/01`, `${year}/02`), []);
  }
});

// Template.documentList.dragging = [];

Template.documentList.events({
  'change .filters': function(e, template) {
    var $select = template.$(e.target),
      type = $select.data('filter-type'),
      active = Session.get('activeFilters');

    active[type] = $select.val() || [];
    Session.set('activeFilters', active);
  },
  'click #filters-container': function(e, template) {
    var filtersContainer = e.currentTarget,
      actualTarget = e.target;
    if (!filtersContainer.classList.contains('active') ||
      (!actualTarget.classList.contains('filters-heading') && !actualTarget.classList.contains('material-iconss'))) {
      filtersContainer.classList.add('active');
    }
  },
  'click .filters-heading': function(e, template) {
    e.stopImmediatePropagation();
    var $filtersContainer = template.$('#filters-container');
    $filtersContainer.toggleClass('active');
  }
  // 'mousedown .document, mouseup .document': function(e) {
  //   var dragging = Template.instance().dragging;
  //
  //   if (e.type == 'mousedown') {
  //     dragging.push(e.currentTarget);
  //   } else {
  //     let indexOfDragged = dragging.indexOf(e.currentTarget);
  //     if (indexOfDragged > -1) {
  //       dragging.splice(indexOfDragged, 1);
  //     }
  //   }
  // },
  // 'mousemove': function(e) {
  //   if (!Template.instance().dragging) {
  //     return;
  //   }
  //   var container = document.getElementById('documents-container');
  //   var position = {
  //     x: e.pageX - container.offsetLeft,
  //     y: e.pageY - container.offsetTop
  //   };
  //   Template.instance().dragging.forEach(function(el) {
  //     el.style.transform = 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0)';
  //   });
  // }
});

Template.documentList.rendered = function() {
  // Template.instance().dragging = [];
  this.$('select').material_select();
};
