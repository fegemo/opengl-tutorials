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
        env: ['CodeBlocks'],
        likes: 3,
        downloads: 35,
        person: {
          name: 'Arley Ribeiro',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Eduardo Silva - Code Blocks.pdf',
        os: ['Windows'],
        env: ['CodeBlocks '],
        likes: 0,
        downloads: 10,
        person: {
          name: 'Eduardo Silva',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Lauro Santos - Code Blocks.pdf',
        os: ['Windows'],
        env: ['CodeBlocks'],
        likes: 1,
        downloads: 16,
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
        likes: 1,
        downloads: 17,
        person: {
          name: 'Raíssa Dutra',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Samuel Cury - Code Blocks.pdf',
        os: ['Windows'],
        env: ['CodeBlocks'],
        likes: 2,
        downloads: 11,
        person: {
          name: 'Samuel Cury',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Thaís Rocha - Code Blocks.pdf',
        os: ['Windows'],
        env: ['CodeBlocks'],
        likes: 1,
        downloads: 55,
        person: {
          name: 'Thaís Rocha',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Luis Carlos Filho - XCode.pdf',
        os: ['OSX'],
        env: ['XCode'],
        likes: 1,
        downloads: 6,
        person: {
          name: 'Luis Carlos Filho',
          date: '2014/02'
        },
        comments: []
      },
      {
        content: 'http://mtdsousa.github.io/blog/2014/10/04/desenhando-com-opengl-plus-lglut-em-c/',
        os: ['Linux'],
        env: ['Linha de comando'],
        likes: 1,
        downloads: 34,
        person: {
          name: 'Marco Souza',
          date: '2014/02'
        },
        comments: []
      },
      {
        file: 'Vitor Silveira - Code Blocks.pdf',
        os: ['Linux'],
        env: ['CodeBlocks'],
        likes: 2,
        downloads: 24,
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
