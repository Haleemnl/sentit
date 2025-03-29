// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title('Authors'), //title is what shows on the content   
      S.documentTypeListItem('startup').title('Startups')
    ])
