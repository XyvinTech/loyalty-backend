/**
 * @swagger
 * tags:
 *   - name: Coupon
 *     description: Coupon related endpoints
 */

/**
 * @swagger
 * /coupon:
 *   post:
 *     summary: Create new coupon
 *     description: Creates a new coupon with the provided details.
 *     tags:
 *       - Coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "10% offer"
 *               description:
 *                 type: string
 *                 example: "description abt offer"
 *               brand:
 *                 type: string
 *                 example: "66cef851d3cbe59728a7d474"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               OTP:
 *                 type: number
 *                 example: "1234"
 *               points_required:
 *                 type: number
 *                 example: "123"
 *               coin_cost:
 *                 type: number
 *                 example: "12"
 *               starts_from:
 *                 type: string
 *                 example: "date"
 *               expiry:
 *                 type: string
 *                 example: "date"
 *               no_of_cards:
 *                 type: number
 *                 example: "12"
 *               availability_criteria:
 *                 type: string
 *                 example: "something" 
 *               category:
 *                 type: string
 *                 example: "66cef851d3cbe59728a7d474"
 *               status:
 *                 type: string
 *                 enum: ["active", "inactive", "expired","limit exceeded"]
 *               
 *     responses:
 *       201:
 *         description: New Feeds created successfullyy
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /coupon/single/{id}:
 *   get:
 *     summary: Get coupon by ID
 *     description: Retrieves a specific coupon by its ID.
 *     tags:
 *       - Coupon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon to retrieve
 *     responses:
 *       200:
 *         description: coupon found successfullyy
 *       400:
 *         description: Bad Request - Invalid ID or ID not provided
 *       404:
 *         description: coupon not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /coupon/list:
 *   get:
 *     summary: Get a list of coupon
 *     description: Retrieves a paginated list of coupon with optional filtering by status.
 *     tags:
 *       - Coupon
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
 *         description: Filter coupon by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of coupon per page (defaults to 10)
 *     responses:
 *       200:
 *         description: successfullyy retrieved the list of coupon
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /coupon/single/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     description: Delete a specific coupon by its ID.
 *     tags:
 *       - Coupon
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the coupon to be deleted
 *     responses:
 *       200:
 *         description: successfullyy deleted the coupon
 *       400:
 *         description: Bad request, missing coupon ID
 *       404:
 *         description: coupon not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /coupon/user/{id}:
 *   get:
 *     summary: Get coupon authored by a specific user
 *     description: Retrieve all coupon created by a user based on their user ID.
 *     tags:
 *       - Coupon
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose coupon are being retrieved.
 *     responses:
 *       200:
 *         description: successfullyy retrieved coupon authored by the user
 *       400:
 *         description: User ID is required
 *       404:
 *         description: coupon not found for the user
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /coupon/single/{id}:
 *   put:
 *     summary: Update coupon status (accept/reject)
 *     description: Accept or reject a coupon by updating its status. Accepting a coupon sets the status to "published", while rejecting it sets the status to "rejected" with a reason.
 *     tags:
 *       - Coupon
 *     parameters:
 *               title:
 *                 type: string
 *                 example: "10% offer"
 *               description:
 *                 type: string
 *                 example: "description abt offer"
 *               brand:
 *                 type: string
 *                 example: "66cef851d3cbe59728a7d474"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               OTP:
 *                 type: number
 *                 example: "1234"
 *               points_required:
 *                 type: number
 *                 example: "123"
 *               coin_cost:
 *                 type: number
 *                 example: "12"
 *               starts_from:
 *                 type: string
 *                 example: "date"
 *               expiry:
 *                 type: string
 *                 example: "date"
 *               no_of_cards:
 *                 type: number
 *                 example: "12"
 *               availability_criteria:
 *                 type: string
 *                 example: "something" 
 *               category:
 *                 type: string
 *                 example: "66cef851d3cbe59728a7d474"
 *               status:
 *                 type: string
 *                 enum: ["active", "inactive", "expired","limit exceeded"] 
 *     responses:
 *       200:
 *         description: Feeds updated successfullyy
 *       400:
 *         description: Feed ID is required
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /coupon/my-coupons:
 *   get:
 *     summary: Get coupons created by the authenticated user
 *     description: Retrieve all coupons authored by the currently authenticated user.
 *     tags:
 *       - Coupon
 *     responses:
 *       200:
 *         description: coupons found successfullyy
 *       404:
 *         description: coupons not found
 *       500:
 *         description: Internal server error
 */