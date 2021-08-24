import {PostsModel} from './posts.model'

export default {
    Query: {
        getPosts: async () => {
            try {
                const posts = await PostsModel.find()
                return posts
            } catch (e) {
                throw new Error(e)
            }
        },
    },
}
