/**
 * Created by fegemo on 3/11/15.
 */
Meteor.startup(function () {
  //Documents.remove({});
  if (Documents.find().count() === 0) {
    var docs = [
      {
        file: 'Arley Ribeiro - Code Blocks.docx',
        os: 'Windows',
        ide: 'Code Blocks',
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
        os: 'Windows',
        ide: 'Code Blocks ',
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
        os: 'Windows',
        ide: 'Code Blocks',
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
        os: 'Windows',
        ide: 'Falcon C++',
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
        os: 'Windows',
        ide: 'Code Blocks',
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
        os: 'Windows',
        ide: 'Code Blocks',
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
        os: 'Mac',
        ide: 'XCode',
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
        os: 'Linux',
        ide: 'Linha de comando',
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
        os: 'Linux',
        ide: 'Code Blocks',
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
