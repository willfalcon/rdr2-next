const structure = S =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Items by Category')
        .child(
          S.documentTypeList('category')
            .title('Items by Category')
            .child(categoryId =>
              S.documentList()
                .title('Items')
                .filter('_type == "item" && $categoryId in categories[]._ref')
                .params({ categoryId })
                .defaultOrdering([{ field: 'name' }])
            )
            .defaultOrdering([{ field: 'name' }])
        ),
      S.listItem()
        .title('Challenges by Type')
        .child(
          S.documentTypeList('challengeType')
            .title('Challenges by Type')
            .child(typeId =>
              S.documentList()
                .title('Challenges')
                .filter('_type == "challenge" && $typeId == type._ref')
                .params({ typeId })
                .defaultOrdering([{ field: 'rank', direction: 'asc' }])
            )
            .defaultOrdering([{ field: 'name' }])
        ),
      ...S.documentTypeListItems().reverse(),
    ]);

export default structure;
