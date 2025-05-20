// --- auth.router.js ---
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists
 *       500:
 *         description: Error registering user
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 */

// --- genres.router.js ---
/**
 * @swagger
 * /api/genres/movie:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all movie genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: A list of movie genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       404:
 *         description: No genres found
 */

/**
 * @swagger
 * /api/genres/tv:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all TV genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: A list of TV genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       404:
 *         description: No genres found
 */

// --- movies.router.js ---
/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get movies with optional filters
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for movie title
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by release year
 *       - in: query
 *         name: genre
 *         schema:
 *           type: integer
 *         description: Genre ID
 *       - in: query
 *         name: vote_average
 *         schema:
 *           type: number
 *         description: Filter by vote average
 *       - in: query
 *         name: popularity
 *         schema:
 *           type: number
 *         description: Filter by popularity
 *     responses:
 *       200:
 *         description: Movie list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *
 *   post:
 *     summary: Add a new movie
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               poster_path:
 *                 type: string
 *                 format: binary
 *               backdrop_path:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Movie added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad request – Missing required fields or files
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */

// --- tv.router.js ---
/**
 * @swagger
 * /api/tvshows:
 *   get:
 *     summary: Get TV shows with optional filters
 *     security:
 *       - bearerAuth: []
 *     tags: [TV Shows]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for movie title
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by release year
 *       - in: query
 *         name: genre
 *         schema:
 *           type: integer
 *         description: Genre ID
 *       - in: query
 *         name: vote_average
 *         schema:
 *           type: number
 *         description: Filter by vote average
 *       - in: query
 *         name: popularity
 *         schema:
 *           type: number
 *         description: Filter by popularity
 *     responses:
 *       200:
 *         description: TV show list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TVShow'
 *
 *   post:
 *     summary: Add a new TV show
 *     security:
 *       - bearerAuth: []
 *     tags: [TV Shows]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               poster_path:
 *                 type: string
 *                 format: binary
 *               backdrop_path:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: TV show added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TVShow'
 *       400:
 *         description: Bad request – Missing required fields or files
 */

/**
 * @swagger
 * /api/tvshows/{id}:
 *   delete:
 *     summary: Delete a TV show by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [TV Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TV show ID
 *     responses:
 *       200:
 *         description: TV show deleted
 *       404:
 *         description: TV show not found
 */

// --- user.router.js ---
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update user profile (self only)
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       403:
 *         description: Forbidden
 *
 *   delete:
 *     summary: Delete user (self or admin)
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Forbidden
 *
 *   patch:
 *     summary: Make user an admin (admin only)
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User promoted to admin
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/dashboard/total-users:
 *   get:
 *     summary: Get total number of registered users
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total user count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /api/dashboard/total-revenue:
 *   get:
 *     summary: Get total revenue from completed transactions
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter revenue by year
 *     responses:
 *       200:
 *         description: Total revenue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *       404:
 *         description: No revenue found
 */

/**
 * @swagger
 * /api/dashboard/user-growth:
 *   get:
 *     summary: Get monthly user registration growth
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year to fetch growth data for
 *     responses:
 *       200:
 *         description: Monthly user growth
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   totalCount:
 *                     type: integer
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /api/payment/create-payment-intent:
 *   post:
 *     summary: Create Stripe payment intent for user's cart
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment intent created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *       400:
 *         description: Cart is empty
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Failed to create payment intent
 */

/**
 * @swagger
 * /api/users/getCart:
 *   get:
 *     summary: Get user's current cart items
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/getWatchlist:
 *   get:
 *     summary: Get user's watchlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watchlist items
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/dashboard/total-users:
 *   get:
 *     summary: Get total number of registered users
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total user count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /api/dashboard/users-by-role:
 *   get:
 *     summary: Get number of users grouped by role
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Grouped user role count
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /api/dashboard/total-sales:
 *   get:
 *     summary: Get total number of completed sales
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total sales count
 *       404:
 *         description: No sales found
 */

/**
 * @swagger
 * /api/dashboard/monthly-sales-trend:
 *   get:
 *     summary: Get monthly sales trend by year
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter sales trend by year
 *     responses:
 *       200:
 *         description: Monthly sales trend
 *       404:
 *         description: No sales found
 */

/**
 * @swagger
 * /api/dashboard/top-selling-content:
 *   get:
 *     summary: Get top 5 selling movies and TV shows
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top selling content data
 *       404:
 *         description: No content found
 */

/**
 * @swagger
 * /api/dashboard/most-visited-content:
 *   get:
 *     summary: Get most visited content
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Most visited movies and TV shows
 *       404:
 *         description: No content found
 */

/**
 * @swagger
 * /api/dashboard/top-rated-content:
 *   get:
 *     summary: Get top rated content
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top rated movies and TV shows
 *       404:
 *         description: No content found
 */

/**
 * @swagger
 * /api/dashboard/content-by-genre:
 *   get:
 *     summary: Get movie and TV show count by genre
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Genre content statistics
 *       404:
 *         description: No content found
 */

/**
 * @swagger
 * /api/dashboard/cart-frequency:
 *   get:
 *     summary: Get how many users have non-empty carts
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Count of users with active carts
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /api/dashboard/watchlist-trends:
 *   get:
 *     summary: Get watchlist usage trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watchlist aggregation by item
 */

/**
 * @swagger
 * /api/users/addToCart:
 *   post:
 *     summary: Add an item to user's cart
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *               kind:
 *                 type: string
 *                 enum: [movies, tvShows]
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Already in cart
 */

/**
 * @swagger
 * /api/users/removeCart:
 *   post:
 *     summary: Remove item from user's cart
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *               kind:
 *                 type: string
 *                 enum: [movies, tvShows]
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       400:
 *         description: Item not found in cart
 */

/**
 * @swagger
 * /api/users/watchlist:
 *   post:
 *     summary: Add an item to user's watchlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *               kind:
 *                 type: string
 *                 enum: [movies, tvShows]
 *     responses:
 *       200:
 *         description: Item added to watchlist
 *       400:
 *         description: Already in watchlist
 */

/**
 * @swagger
 * /api/users/removeWatchlist:
 *   post:
 *     summary: Remove an item from user's watchlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *               kind:
 *                 type: string
 *                 enum: [movies, tvShows]
 *     responses:
 *       200:
 *         description: Item removed from watchlist
 *       400:
 *         description: Item not found in watchlist
 */

/**
 * @swagger
 * /api/users/getOwned:
 *   get:
 *     summary: Get all content owned by user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owned content list
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/addOwned:
 *   post:
 *     summary: Add owned content to user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *               kind:
 *                 type: string
 *                 enum: [movies, tvShows]
 *     responses:
 *       200:
 *         description: Added to owned list
 *       400:
 *         description: Already in owned list
 */

// (all routes from previous content preserved — omitted here for brevity)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         original_title:
 *           type: string
 *         backdrop_path:
 *           type: string
 *         poster_path:
 *           type: string
 *         genre_ids:
 *           type: array
 *           items:
 *             type: integer
 *         release_date:
 *           type: string
 *         popularity:
 *           type: number
 *         vote_average:
 *           type: number
 *         vote_count:
 *           type: number
 *         adult:
 *           type: boolean
 *         video:
 *           type: boolean
 *         overview:
 *           type: string
 *         price:
 *           type: number
 *         number_of_purchases:
 *           type: number
 *
 *     TVShow:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         original_name:
 *           type: string
 *         backdrop_path:
 *           type: string
 *         poster_path:
 *           type: string
 *         genre_ids:
 *           type: array
 *           items:
 *             type: integer
 *         first_air_date:
 *           type: string
 *         popularity:
 *           type: number
 *         vote_average:
 *           type: number
 *         vote_count:
 *           type: number
 *         origin_country:
 *           type: array
 *           items:
 *             type: string
 *         original_language:
 *           type: string
 *         adult:
 *           type: boolean
 *         overview:
 *           type: string
 *         price:
 *           type: number
 *         number_of_purchases:
 *           type: number
 *
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *         favoriteMovies:
 *           type: array
 *           items:
 *             type: string
 *         paidMovies:
 *           type: array
 *           items:
 *             type: string
 *         cartMovies:
 *           type: array
 *           items:
 *             type: string
 */
