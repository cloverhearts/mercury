import Languages from './src/Code/Languages/Types'
import CodeContainer from './src/Code/Container'
import Meta from './src/Code/Meta'
import Note from './src/Note'
import NoteMeta from './src/Note/Meta'
import Paragraph from './src/Paragraph'
import ParagraphMeta from './src/Paragraph/Meta'

export default {
  NoteContainer: {
    Note,
    Meta: NoteMeta
  },
  ParagraphContainer: {
    Paragraph,
    ParagraphMeta
  },
  Code: {
    Meta,
    Languages,
    Container: CodeContainer
  }
}
