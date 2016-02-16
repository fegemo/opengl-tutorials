// -- template: document
Template.document.helpers({
  active: function() {
    return Template.instance().active.get();
  },
  filteredOut: function() {
    var filters = Session.get('activeFilters') || { semester: [], os: [], env: [] },
      noneSelected = {
        semester: filters.semester.length === 0,
        os: filters.os.length === 0,
        env: filters.env.length === 0
      },
      matchedFilter = {
        semester: _.contains(filters.semester, this.person.date),
        os: _.intersection(filters.os, this.os).length > 0,
        env: _.intersection(filters.env, this.env).length > 0
      },
      shouldDisplay = (noneSelected.semester || matchedFilter.semester)
        && (noneSelected.os || matchedFilter.os)
        && (noneSelected.env || matchedFilter.env);

    return !shouldDisplay;
  }
});

Template.document.events({
  'click .document-avatar': function(e, template) {
    template.active.set(!template.active.get());
    if (template.active.get()) {
      template.behave.tween.pause();
      Session.set('activeDocument', this);
    } else {
      template.behave.tween.resume();
    }
  },
  'click .download-link': function(e, template) {
    // saves a download count to the document
    Meteor.call('countDownload', this._id, function() {});
  },
  'click .like-link': function(e, template) {
    var amount = 0;
    template.userLiked.set(!template.userLiked.get());

    if (template.userLiked.get()) {
      // saves a like count to the document
      amount = 1;
      template.$(e.target).closest('.document-stats').find('.like-link i').eq(0)
          .text('favorite');
    } else {
      // removes a like
      // saves a like count to the document
      amount = -1;
      template.$(e.target).closest('.document-stats').find('.like-link i').eq(0)
          .text('favorite_outline');
    }

    Meteor.call('countLike', this._id, amount, function() {});
  },
  'click .comment-link': function(e, template) {
    Session.set('activeDocument', this);
    $('.button-collapse').sideNav('show');
  }
});

Template.document.created = function() {
  this.active = new ReactiveVar(false);
  this.userLiked = new ReactiveVar(false);
};

Template.document.rendered = function() {
  var mainEl = document.getElementById('main'),
      doc = this.find('.document'),
      winHeight = $(window).height(),
      navHeight = $('#main-header').outerHeight(true),
      canvasHeight = winHeight - navHeight,
      canvasWidth = mainEl.offsetWidth,
      avatarDimension = { width: 60, height: 60 },
      position = {
        x: (Math.random() * (canvasWidth - avatarDimension.width)),
        y: (Math.random() * (canvasHeight - avatarDimension.height))
      };

  doc.style.transform = 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0)';

  // motion tweening
  Template.instance().behave = new Behave(doc, position, avatarDimension, canvasWidth, canvasWidth * 51.28 + Math.random()*(canvasWidth*51.28));
};
