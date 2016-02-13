var logoVivus;

Template.layout.rendered = function() {
  logoVivus = new Vivus('logo-svg', {
    type: 'delayed',
    duration: 100,
    animTimingFunction: Vivus.EASE_OUT
  });

  $('.mobile-menu-trigger[data-activates="mobile-menu"]').sideNav();
};

Template.layout.events({
  'mouseenter .brand-logo.svg-container': function(e, template) {
    logoVivus.stop().play(-1);
  },
  'mouseleave .brand-logo.svg-container': function() {
    logoVivus.stop().play(1);
  }
});
