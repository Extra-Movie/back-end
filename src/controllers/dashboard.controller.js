const User = require("../models/User");
const Transaction = require("../models/Transactions");
const Movie = require("../models/Movie");
const TVShow = require("../models/Tv");
const MGenre = require("../models/MovieGenre");
const TGenre = require("../models/TvShowGenre");

//#region User Dashboard
const totalUsers = async (req, res) => {
  try {
    const total = await User.countDocuments();
    if (total === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json({ totalUsers: total });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const usersByRole = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          isAdmin: 1,
        },
      },
      {
        $group: {
          _id: "$isAdmin",
          totalCount: {
            $sum: 1,
          },
          users: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          _id: 0,
          role: {
            $cond: {
              if: { $eq: ["$_id", true] },
              then: "admin",
              else: "user",
            },
          },
          totalCount: 1,
          users: 1,
        },
      },
    ]);
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const userGrowth = async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();
  try {
    const users = await User.aggregate([
      {
        $addFields: {
          year: { $year: "$createdAt" },
          month: { $dateToString: { format: "%B", date: "$createdAt" } },
        },
      },
      {
        $match: {
          year: year,
        },
      },
      {
        $group: {
          _id: "$month",
          totalCount: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalCount: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//#endregion

//#region Sales Dashboard
const totalSales = async (req, res) => {
  try {
    const users = await Transaction.countDocuments({ status: "completed" });
    if (users === 0) {
      return res.status(404).json({ message: "No sales found" });
    }
    res.json({ totalTransactions: users });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const totalRevenue = async (req, res) => {
  const year = Number(req.query.year);

  try {
    const pipeline = [
      ...(year
        ? [
            {
              $addFields: {
                year: { $year: "$createdAt" },
              },
            },
          ]
        : []),
      {
        $match: {
          ...(year ? { year } : {}),
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ];

    const revenue = await Transaction.aggregate(pipeline);

    if (revenue.length === 0) {
      return res.status(404).json({ message: "No revenue found" });
    }

    return res.json(revenue[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const monthlySalesTrend = async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();
  try {
    const sales = await Transaction.aggregate([
      {
        $addFields: {
          year: { $year: "$createdAt" },
          month: { $dateToString: { format: "%B", date: "$createdAt" } },
        },
      },
      {
        $match: {
          year: year,
          status: "completed",
        },
      },
      {
        $group: {
          _id: "$month",
          totalSales: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalSales: 1,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);
    if (sales.length === 0) {
      return res.status(404).json({ message: "No sales found" });
    }
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const topSellingContent = async (req, res) => {
  try {
    const movies = await Movie.find()

      .sort({ number_of_purchases: -1 })
      .limit(10)
      .select("title number_of_purchases");

    const tvShows = await TVShow.find()
      .sort({ number_of_purchases: -1 })
      .limit(5)
      .select("name number_of_purchases");

    if (movies.length === 0 && tvShows.length === 0) {
      return res.status(404).json({ message: "No content found" });
    }
    res.json({
      movies: movies,
      tvShows: tvShows,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// #endregion

//#region Movie & TV Show Dashboard
const mostVisitedContent = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ visited: -1 })
      .limit(5)
      .select("title visited poster_path");

    const tvShows = await TVShow.find()
      .sort({ visited: -1 })
      .limit(5)
      .select("name visited poster_path");

    if (movies.length === 0 && tvShows.length === 0) {
      return res.status(404).json({ message: "No content found" });
    }
    res.json({
      movies: movies,
      tvShows: tvShows,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const topRatedContent = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ vote_average: -1 })
      .limit(5)
      .select("title vote_average poster_path");

    const tvShows = await TVShow.find()
      .sort({ vote_average: -1 })
      .limit(5)
      .select("name vote_average poster_path");

    if (movies.length === 0 && tvShows.length === 0) {
      return res.status(404).json({ message: "No content found" });
    }
    res.json({
      movies: movies,
      tvShows: tvShows,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const contentbyGenre = async (req, res) => {
  try {
    const movies = await Movie.aggregate([
      {
        $unwind: "$genre_ids",
      },
      {
        $group: {
          _id: "$genre_ids",
          movieCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "moviegenres",
          localField: "_id",
          foreignField: "id",
          as: "genreDetails",
        },
      },
      {
        $unwind: "$genreDetails",
      },
      {
        $project: {
          _id: 0,
          genre_id: "$_id",
          genre_name: "$genreDetails.name",
          movieCount: 1,
        },
      },
      {
        $sort: { movieCount: -1 },
      },
    ]);
    const tvshows = await Movie.aggregate([
      {
        $unwind: "$genre_ids",
      },
      {
        $group: {
          _id: "$genre_ids",
          tvshowCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "tvshowgenres",
          localField: "_id",
          foreignField: "id",
          as: "genreDetails",
        },
      },
      {
        $unwind: "$genreDetails",
      },
      {
        $project: {
          _id: 0,
          genre_id: "$_id",
          genre_name: "$genreDetails.name",
          movieCount: 1,
        },
      },
      {
        $sort: { movieCount: -1 },
      },
    ]);
    if (movies.length === 0 && tvshows.length === 0) {
      return res.status(404).json({ message: "No content found" });
    }
    res.json({
      movies: movies,
      tvshows: tvshows,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
//#endregion

//#region  Cart & Watchlist Dashboard
const cartFrequency = async (req, res) => {
  try {
    const users = await User.find({ "cart.0": { $exists: true } }).select(
      "cart name email"
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    const totalUsers = users.length;
    

    return res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const watchlistTrends = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $unwind: "$watchlist",
      },
      {
        $group: {
          _id: "$watchlist.item",
          totalCount: {
            $sum: 1,
          },
        },
      },
    ]);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
//#endregion

module.exports = {
  usersByRole,
  userGrowth,
  totalUsers,
  totalSales,
  totalRevenue,
  monthlySalesTrend,
  topSellingContent,
  mostVisitedContent,
  topRatedContent,
  contentbyGenre,
  cartFrequency,
  watchlistTrends,
};
