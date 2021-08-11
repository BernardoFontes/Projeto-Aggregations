db.movies.aggregate([
    {
      $match: {
        cast: {
          $exists: true,
        },
        languages: {
          $in: ["English"],
        },
      },
    },
    {
      $unwind: "$cast",
    },
    {
      $group: {
        _id: "$cast",
        numeroFilmes: {
          $sum: 1,
        },
        media_rating: {
          $avg: "$imdb.rating",
        },
      },
    },
    {
      $sort: {
        numeroFilmes: -1, _id: -1,
      },
    },
    {
      $project: {
        numeroFilmes: 1,
        mediaIMDB: {
          $round: ["$media_rating", 1],
        },
      },
    },
  ]);