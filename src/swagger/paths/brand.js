/**
 * @swagger
 * tags:
 *   - name: Brand
 *     description: Brand related endpoints
 */

/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Create a new brand
 *     description: Creates a new brand with the provided details. All required fields must be included in the request.
 *     tags:
 *       - Brand
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
 *                 description: "The title of the brand."
 *               logo:
 *                 type: string
 *                 example: "https://example.com/updated-brand"
 *     responses:
 *       201:
 *         description: brand created successfullyy
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brand/single/{id}:
 *   put:
 *     summary: Edit a brand
 *     description: Updates an existing brand with the provided details.
 *     tags:
 *       - Brand
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the brand to edit
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
 *                 description: "The title of the brand."
 *               logo:
 *                 type: string
 *                 example: "https://example.com/updated-brand"
 *     responses:
 *       200:
 *         description: brand updated successfullyy
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brand/single/{id}:
 *   get:
 *     summary: Get brand by ID
 *     description: Retrieves a brand by its ID.
 *     tags:
 *       - Brand
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the brand to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand found successfullyy
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brand/single/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     description: Deletes a brand from the system by its ID.
 *     tags:
 *       - Brand
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the brand to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: brand deleted successfullyy
 *       404:
 *         description: brand not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brand/list:
 *   get:
 *     summary: Get a list of brands
 *     description: Retrieves a paginated list of brands with optional filtering by status.
 *     tags:
 *       - Brand
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
 *         description: Filter brands by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of brands per page (defaults to 10)
 *     responses:
 *       200:
 *         description: successfullyy retrieved the list of brands
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /brand/user:
 *   get:
 *     summary: Get a user list of brands
 *     description: Retrieves a  user list of brands.
 *     tags:
 *       - Brand
 *     responses:
 *       200:
 *         description: successfullyy retrieved the list of brands
 *       500:
 *         description: Internal Server Error
 */