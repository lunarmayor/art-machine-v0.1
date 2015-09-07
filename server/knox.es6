knox = Knox.createClient({
  key: 'AKIAJX57PT52JEGZSVHA',
  secret: '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',
  bucket: 'artmachinepieces'
});

Meteor.methods({
  saveArtWork(attributes, canvasData, original = null) {
    let buf = new Buffer(canvasData.replace(/^data:image\/\w+;base64,/, ""),'base64')
    let datePrefix = moment().format('YYYY[/]MM');
    let key = Random.id()
    let path = '/artworks/' + datePrefix + '/' + key;
    let headers = {
      'Content-Length': buf.length,
      'Content-Type': 'image/png',
      'x-amz-acl': 'public-read'
    };

    let req = knox.put(path, headers)
    req.on('response', Meteor.bindEnvironment((res) => {
      if(res.statusCode === 200) {
        console.log('hello')
        attributes.imageUrl = req.url;

        if(original) {
          let id = ArtWork.create(attributes)
          ArtWorks.update(
            {
              _id: original._id,
            },
            {
              $push: { remixes: id },
              $inc: { remixers: 1 },
            }
          )
        } else {
          ArtWork.create(attributes)
        }
      }
    }))
    req.end(buf)
  }
})
