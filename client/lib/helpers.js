/**
 * Created by fegemo on 3/17/15.
 */

// configures moment to output portuguese
moment.locale('pt-br');


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

//Template.registerHelper('sortBy', function(array, fieldName) {
//  return _.sortBy(array, fieldName);
//});
