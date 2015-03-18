/**
 * Created by fegemo on 3/17/15.
 */

// configures moment to output portuguese
moment.locale('pt-BR');


Template.registerHelper('lowerCase', function(s) {
    return (s || '').toLowerCase();
});

Template.registerHelper('initials', function(s) {
  var match =  (s || '').match(/\b(\w)/g) || [];
  return match.join('').toUpperCase();
});

Template.registerHelper('humanTime', function(time) {
  return moment(time).fromNow();
});
