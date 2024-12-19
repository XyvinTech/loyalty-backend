/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category related endpoints
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category with the provided details. All required fields must be included in the request.
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Lv"
 *     responses:
 *       201:
 *         description: category created successfullyy
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /category/single/{id}:
 *   put:
 *     summary: Edit a category
 *     description: Updates an existing category with the provided details.
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
  *               title:
 *                 type: string
 *                 example: "Lv"
 *     responses:
 *       200:
 *         description: category updated successfullyy
 *       400:
 *         description: Invalid input
 *       404:
 *         description: category not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /category/single/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieves a category by its ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: category found successfullyy
 *       404:
 *         description: category not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /category/single/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Deletes a category from the system by its ID.
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: category deleted successfullyy
 *       404:
 *         description: category not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /category/list:
 *   get:
 *     summary: Get a list of categories
 *     description: Retrieves a paginated list of categories with optional filtering by status.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination (defaults to 1)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter categories by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of categories per page (defaults to 10)
 *     responses:
 *       200:
 *         description: successfullyy retrieved the list of categories
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /category/user:
 *   get:
 *     summary: Get a user list of categories
 *     description: Retrieves a  user list of categories.
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: successfullyy retrieved the list of categories
 *       500:
 *         description: Internal Server Error
 */