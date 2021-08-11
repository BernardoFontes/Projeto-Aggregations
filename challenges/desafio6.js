db.movies.aggregate([
    {
      $match: {
        awards: /Won\s[1-9]\sOscar/i,
        "imdb.rating": { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "imdb.rating",
        maior_rating: { $max: "$imdb.rating" },
        menor_rating: { $min: "$imdb.rating" },
        media_rating: { $avg: "$imdb.rating" },
        desvio_padrao: { $stdDevSamp: "$imdb.rating" },
      },
    },
    {
      $project: {
        _id: 0,
        maior_rating: 1,
        menor_rating: 1,
        media_rating: { $round: ["$media_rating", 1] },
        desvio_padrao: { $round: ["$desvio_padrao", 1] },
      },
    },
  ]);