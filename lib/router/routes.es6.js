/**
* Created by fegemo on 3/11/15.
*/

Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  var bodyEl = document.querySelector('body'),
    pageClassesOnBody = bodyEl.className.split(' ')
      .filter(cl => cl.trim() !== '' &&  cl.indexOf('page-') === 0);

  bodyEl.classList.remove(...pageClassesOnBody);
  bodyEl.classList.add(`page-${this.route.options.template}`);
  this.next();
});

Router.route('/', { name: 'documentList', template: 'documentList' });

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
