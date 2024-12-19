/**
 * @swagger
 * tags:
 *   - name: Tier
 *     description: Tier related endpoints
 */

/**
 * @swagger
 * /tier:
 *   post:
 *     summary: Create a new tier
 *     description: Creates a new tier with the provided details. All required fields must be included in the request.
 *     tags:
 *       - Tier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tier_name:
 *                 type: string
 *                 example: "Gold"
 *                 description: "The name of the tier."
 *               point_level:
 *                 type: number
 *                 example: 1000
 *                 description: "The point level required to reach the tier."
 *               icon:
 *                 type: string
 *                 example: "icon of tier"
 *               description:
 *                 type: string
 *                 example: "description of tier"
 *               conditions:
 *                 type: string
 *                 example: "2024-08-31"
 *     responses:
 *       201:
 *         description: Tier created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tier/single/{id}:
 *   put:
 *     summary: Edit a tier
 *     description: Updates an existing tier with the provided details.
 *     tags:
 *       - Tier
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tier to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tier_name:
 *                 type: string
 *                 example: "Gold"
 *                 description: "The name of the tier."
 *               point_level:
 *                 type: number
 *                 example: 1000
 *                 description: "The point level required to reach the tier."
 *               icon:
 *                 type: string
 *                 example: "icon of tier"
 *               description:
 *                 type: string
 *                 example: "description of tier"
 *               conditions:
 *                 type: string
 *                 example: "2024-08-31"
 *     responses:
 *       200:
 *         description: Tier updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Tier not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tier/single/{id}:
 *   get:
 *     summary: Get tier by ID
 *     description: Retrieves a tier by its ID.
 *     tags:
 *       - Tier
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tier to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tier found successfully
 *       404:
 *         description: Tier not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tier/single/{id}:
 *   delete:
 *     summary: Delete a tier by ID
 *     description: Deletes a tier from the system by its ID.
 *     tags:
 *       - Tier
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the tier to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tier deleted successfully
 *       404:
 *         description: Tier not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tier/list:
 *   get:
 *     summary: Get a list of tiers
 *     description: Retrieves a paginated list of tiers with optional filtering by status.
 *     tags:
 *       - Tier
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
 *         description: Filter tiers by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of tiers per page (defaults to 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of tiers
 *       500:
 *         description: Internal Server Error
 */

