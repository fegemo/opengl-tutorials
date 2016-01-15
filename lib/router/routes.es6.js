/**
 * Created by fegemo on 3/11/15.
 */

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', { name: 'documentList' });

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
