/**
* Created by fegemo on 3/11/15.
*/
Meteor.startup(function () {
  //Documents.remove({});
  if (Documents.find().count() === 0) {
    ServiceConfiguration.configurations.upsert(
      { service: 'google' },
      {
        $set: {
          clientId: '33433841432-u76a4f84h9bbib115oi9hst68dp9p5mr.apps.googleusercontent.com',
          loginStyle: 'popup',
          secret: 'svjPMuSzZvcYzba55oRaDxHA'
        }
      }
    );

    var docs = [
      {
        file: 'Arley Ribeiro - Code Blocks.docx',
        os: ['Windows'],
        env: ['Code Blocks'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Arley Ribeiro',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Eduardo Silva - Code Blocks.pdf',
        os: ['Windows'],
        env: ['Code Blocks '],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Eduardo Silva',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Lauro Santos - Code Blocks.pdf',
        os: ['Windows'],
        env: ['Code Blocks'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Lauro Santos',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Raissa Dutra - Falcon Cpp.docx',
        os: ['Windows'],
        env: ['Falcon C++'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Raíssa Dutra',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Samuel Cury - Code Blocks.pdf',
        os: ['Windows'],
        env: ['Code Blocks'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Samuel Cury',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Thaís Rocha - Code Blocks.pdf',
        os: ['Windows'],
        env: ['Code Blocks'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Thaís Rocha',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Luis Carlos Filho - XCode.pdf',
        os: ['Mac'],
        env: ['XCode'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Luis Carlos Filho',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Marco Souza - Debian.markdown',
        os: ['Linux'],
        env: ['Linha de comando'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Marco Souza',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Vitor Silveira - Code Blocks.pdf',
        os: ['Linux'],
        env: ['Code Blocks'],
        likes: 0,
        downloads: 0,
        person: {
          name: 'Vitor Silveira',
          date: '2014/02'
        },
        comments: []
      }
    ];

    _.each(docs, function(doc) {
      Documents.insert(doc);
    });
  }
});
