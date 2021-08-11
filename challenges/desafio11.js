db.trips.aggregate([
    { $addFields: { dia_semana: { $dayOfWeek: "$startTime" } } },
    {
      $group: {
        _id: "$dia_semana",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        diaDaSemana: "$_id",
        total: "$count",
        _id: 0,
      },
    },
    { $sort: { total: -1 } },
    { $limit: 1 },
  ]);