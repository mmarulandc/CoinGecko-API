const mongoose = require('mongoose');

// const User = require('../models/User')
// const Post = require('../models/Post')

// async function createFakeUsers () {
//   const u = new User({
//     email: 'fake@fake.com',
//     password: 'fake'
//   })

//   await u.save()

//   const uf = new User({
//     email: 'fakedelete@fake.com',
//     password: 'fake'
//   })

//   await uf.save()
// }

// async function createFakePosts() {
//     const u = await User.findOne({ email: 'fake@fake.com' })

//     const post = new Post({ title: 'test edit post title', user: u })
//     await post.save()

//     const postToDelete = new Post({ title: 'test delete post title', user: u })
//     await postToDelete.save()

// }
before((done) => {
	mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true });
	mongoose.connection.on('connected', async () => {
		console.log('Db initialized, old data deleted...');
		await mongoose.connection.db.dropDatabase();
		done();
	});
});
