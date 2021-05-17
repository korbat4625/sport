const mongoose = require('mongoose')
const ArticleLink = 'articleLink'
const LinkModel = mongoose.model(ArticleLink, {
    name: {
        type: String,
        default: 'linkList'
    },
    linkList: {
        type: Array,
        default: [
            {
                articleId: {
                    type: String,
                    default: '',
                    required: [true, 'please input articleId']
                }
            }
        ]
    }
})
module.exports = LinkModel
