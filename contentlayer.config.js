import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Book = defineDocumentType(() => ({
    name: 'Book',
    filePathPattern: `books/**/*.md`,
    fields: {
        id: { type: 'number', required: true },
        title: { type: 'string', required: true },
        author: { type: 'string', required: true },
        price: { type: 'string', required: true },
        isbn: { type: 'string', required: true },
        pages: { type: 'number', required: true },
        category: { type: 'string', required: true },
        description: { type: 'string', required: true },
        image: { type: 'string', required: true },
    },
}))

export default makeSource({
    contentDirPath: 'src/content',
    documentTypes: [Book],
})
