/**
 * @swagger
 * tags:
 *   - name: Discount
 *     description: Discount related endpoints
 */

/**
 * @swagger
 * /discount:
 *   post:
 *     summary: Create new discount
 *     description: Creates a new discount with the provided details.
 *     tags:
 *       - Discount
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *         title:
 *           type: string
 *           example: "10% Off"
 *         discount_code:
 *           type: string
 *           example: "DISCOUNT10"
 *         description:
 *           type: string
 *           example: "Get 10% off on all products."
 *         percentage:
 *           type: number
 *           example: 10
 *         image:
 *           type: string
 *           example: "https://example.com/discount-image.jpg"
 *         tier_required:
 *           type: array
 *           items:
 *             type: string
 *             example: "62b8c27b4f9c8e1b6c55d4e1" 
 *         valid_from:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         valid_to:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59Z"
 *         status:
 *           type: string
 *           enum: ["active", "inactive", "expired"]
 *           default: "active"
 *           example: "active"
 *     responses:
 *       201:
 *         description: New Discount created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /discount/single/{id}:
 *   get:
 *     summary: Get discount by ID
 *     description: Retrieves a specific discount by its ID.
 *     tags:
 *       - Discount
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the discount to retrieve
 *     responses:
 *       200:
 *         description: Discount found successfully
 *       400:
 *         description: Bad Request - Invalid ID or ID not provided
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /discount/list:
 *   get:
 *     summary: Get a list of discounts
 *     description: Retrieves a paginated list of discounts with optional filtering by status.
 *     tags:
 *       - Discount
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
 *         description: Filter discounts by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of discounts per page (defaults to 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of discounts
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /discount/single/{id}:
 *   delete:
 *     summary: Delete a discount
 *     description: Delete a specific discount by its ID.
 *     tags:
 *       - Discount
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the discount to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the discount
 *       400:
 *         description: Bad request, missing discount ID
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /discount/user/{id}:
 *   get:
 *     summary: Get discounts authored by a specific user
 *     description: Retrieve all discounts created by a user based on their user ID.
 *     tags:
 *       - Discount
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose discounts are being retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved discounts authored by the user
 *       400:
 *         description: User ID is required
 *       404:
 *         description: No discounts found for the user
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /discount/single/{id}:
 *   put:
 *     summary: Update discount status (accept/reject)
 *     description: Accept or reject a discount by updating its status. Accepting a discount sets the status to "published", while rejecting it sets the status to "rejected" with a reason.
 *     tags:
 *       - Discount
 *     parameters:
 *         title:
 *           type: string
 *           example: "10% Off"
 *         discount_code:
 *           type: string
 *           example: "DISCOUNT10"
 *         description:
 *           type: string
 *           example: "Get 10% off on all products."
 *         percentage:
 *           type: number
 *           example: 10
 *         image:
 *           type: string
 *           example: "https://example.com/discount-image.jpg"
 *         tier_required:
 *           type: array
 *           items:
 *             type: string
 *             example: "62b8c27b4f9c8e1b6c55d4e1" # MongoDB ObjectId for tier
 *         valid_from:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00Z"
 *         valid_to:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59Z"
 *         status:
 *           type: string
 *           enum: ["active", "inactive", "expired"]
 *           default: "active"
 *           example: "active"
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *       400:
 *         description: Discount ID or status is invalid
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /discount/my-discounts:
 *   get:
 *     summary: Get discounts created by the authenticated user
 *     description: Retrieve all discounts authored by the currently authenticated user.
 *     tags:
 *       - Discount
 *     responses:
 *       200:
 *         description: Discounts found successfully
 *       404:
 *         description: No discounts found
 *       500:
 *         description: Internal server error
 */