/**
 * @swagger
 * tags:
 *   - name: PointCriteria
 *     description: Point Criteria related endpoints
 */

/**
 * @swagger
 * /point-criteria:
 *   post:
 *     summary: Create new point criteria
 *     description: Creates a new point criteria with the provided details.
 *     tags:
 *       - PointCriteria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "100 Points Reward"
 *               points:
 *                 type: integer
 *                 example: 100
 *               icon:
 *                 type: string
 *                 example: "https://example.com/icon.jpg"
 *               description:
 *                 type: string
 *                 example: "Earn 100 points for every purchase above $50."
 *               conditions:
 *                 type: object
 *                 properties:
 *                   limit:
 *                     type: integer
 *                     example: 500
 *     responses:
 *       201:
 *         description: New Point Criteria created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /point-criteria/single/{id}:
 *   get:
 *     summary: Get point criteria by ID
 *     description: Retrieves a specific point criteria by its ID.
 *     tags:
 *       - PointCriteria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the point criteria to retrieve
 *     responses:
 *       200:
 *         description: Point criteria found successfully
 *       400:
 *         description: Bad Request - Invalid ID or ID not provided
 *       404:
 *         description: Point criteria not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /point-criteria/list:
 *   get:
 *     summary: Get a list of point criteria
 *     description: Retrieves a paginated list of point criteria with optional filtering by status.
 *     tags:
 *       - PointCriteria
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
 *         description: Filter point criteria by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of point criteria per page (defaults to 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of point criteria
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /point-criteria/single/{id}:
 *   delete:
 *     summary: Delete a point criteria
 *     description: Delete a specific point criteria by its ID.
 *     tags:
 *       - PointCriteria
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the point criteria to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the point criteria
 *       400:
 *         description: Bad request, missing point criteria ID
 *       404:
 *         description: Point criteria not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /point-criteria/user/{id}:
 *   get:
 *     summary: Get point criteria authored by a specific user
 *     description: Retrieve all point criteria created by a user based on their user ID.
 *     tags:
 *       - PointCriteria
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose point criteria are being retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved point criteria authored by the user
 *       400:
 *         description: User ID is required
 *       404:
 *         description: No point criteria found for the user
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /point-criteria/single/{id}:
 *   put:
 *     summary: Update point criteria status (accept/reject)
 *     description: Accept or reject point criteria by updating its status. Accepting a point criteria sets the status to "published", while rejecting it sets the status to "rejected" with a reason.
 *     tags:
 *       - PointCriteria
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pointCriteria to edit
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
 *                 example: "100 Points Reward"
 *               points:
 *                 type: integer
 *                 example: 100
 *               icon:
 *                 type: string
 *                 example: "https://example.com/icon.jpg"
 *               description:
 *                 type: string
 *                 example: "Earn 100 points for every purchase above $50."
 *               conditions:
 *                 type: object
 *                 properties:
 *                   limit:
 *                     type: integer
 *                     example: 500
 *     responses:
 *       200:
 *         description: Point criteria updated successfully
 *       400:
 *         description: Point criteria ID or status is invalid
 *       404:
 *         description: Point criteria not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /point-criteria/my-point-criteria:
 *   get:
 *     summary: Get point criteria created by the authenticated user
 *     description: Retrieve all point criteria authored by the currently authenticated user.
 *     tags:
 *       - PointCriteria
 *     responses:
 *       200:
 *         description: Point criteria found successfully
 *       404:
 *         description: No point criteria found
 *       500:
 *         description: Internal server error
 */