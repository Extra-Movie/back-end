// --- genres.router.js ---
/**
 * @swagger
 * /api/genres/movie:
 *   get:
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
 *       400:
 *         description: Missing files
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
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
 *     tags: [TV Shows]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for TV show name
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by first air year
 *       - in: query
 *         name: genre
 *         schema:
 *           type: integer
 *         description: Genre ID
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
 *       400:
 *         description: Missing files
 */

/**
 * @swagger
 * /api/tvshows/{id}:
 *   delete:
 *     summary: Delete a TV show by ID
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *         backdrop_path:
 *           type: string
 *         genre_ids:
 *           type: array
 *           items:
 *             type: integer
 *         id:
 *           type: integer
 *         original_language:
 *           type: string
 *         original_title:
 *           type: string
 *         overview:
 *           type: string
 *         popularity:
 *           type: number
 *         poster_path:
 *           type: string
 *         release_date:
 *           type: string
 *         title:
 *           type: string
 *         video:
 *           type: boolean
 *         vote_average:
 *           type: number
 *         vote_count:
 *           type: number
 *
 *     TVShow:
 *       type: object
 *       properties:
 *         adult:
 *           type: boolean
 *         backdrop_path:
 *           type: string
 *         genre_ids:
 *           type: array
 *           items:
 *             type: integer
 *         id:
 *           type: integer
 *         origin_country:
 *           type: array
 *           items:
 *             type: string
 *         original_language:
 *           type: string
 *         original_name:
 *           type: string
 *         overview:
 *           type: string
 *         popularity:
 *           type: number
 *         poster_path:
 *           type: string
 *         first_air_date:
 *           type: string
 *         name:
 *           type: string
 *         vote_average:
 *           type: number
 *         vote_count:
 *           type: number
 *
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 */
