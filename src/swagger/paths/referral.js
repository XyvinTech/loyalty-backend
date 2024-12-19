/**
 * @swagger
 * tags:
 *   - name: Referral
 *     description: Referral related endpoints
 */

/**
 * @swagger
 * /referral:
 *   post:
 *     summary: Create a new referral
 *     description: Creates a new referral with the provided details. All required fields must be included in the request.
 *     tags:
 *       - Referral
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               referral_id:
 *                 type: string
 *                 example: "603d5f5f9f1b2c1f4b2b3c5e"
 *                 description: "The ID of the points criteria associated with the referral."
 *               referrer_id:
 *                 type: string
 *                 example: "603d5f5f9f1b2c1f4b2b3c5f"
 *                 description: "The ID of the user who referred."
 *               referred_id:
 *                 type: string
 *                 example: "603d5f5f9f1b2c1f4b2b3c6a"
 *                 description: "The ID of the user who was referred."
 *               points_awarded:
 *                 type: number
 *                 example: 100
 *                 description: "The number of points awarded for the referral."
 *               action:
 *                 type: string
 *                 example: "signup"
 *                 description: "The action that triggered the referral, e.g., 'signup', '1st purchase'."
 *               isActionCompleted:
 *                 type: boolean
 *                 example: true
 *                 description: "Whether the referral action has been completed."
 *     responses:
 *       201:
 *         description: Referral created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /referral/single/{id}:
 *   put:
 *     summary: Edit a referral
 *     description: Updates an existing referral with the provided details.
 *     tags:
 *       - Referral
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the referral to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               referral_id:
 *                 type: string
 *                 example: "603d5f5f9f1b2c1f4b2b3c5e"
 *                 description: "The ID of the points criteria associated with the referral."
 *               referrer_id:
 *                 type: string
 *                 example: "603d5f5f9f1b2c1f4b2b3c5f"
 *                 description: "The ID of the user who referred."
 *               referred_id:
 *                 type: string
 *                 example: "603d5f5f9f1b2c1f4b2b3c6a"
 *                 description: "The ID of the user who was referred."
 *               points_awarded:
 *                 type: number
 *                 example: 100
 *                 description: "The number of points awarded for the referral."
 *               action:
 *                 type: string
 *                 example: "signup"
 *                 description: "The action that triggered the referral, e.g., 'signup', '1st purchase'."
 *               isActionCompleted:
 *                 type: boolean
 *                 example: true
 *                 description: "Whether the referral action has been completed."
 *     responses:
 *       200:
 *         description: Referral updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Referral not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /referral/single/{id}:
 *   get:
 *     summary: Get referral by ID
 *     description: Retrieves a referral by its ID.
 *     tags:
 *       - Referral
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the referral to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Referral found successfully
 *       404:
 *         description: Referral not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /referral/single/{id}:
 *   delete:
 *     summary: Delete a referral by ID
 *     description: Deletes a referral from the system by its ID.
 *     tags:
 *       - Referral
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the referral to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Referral deleted successfully
 *       404:
 *         description: Referral not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /referral/list:
 *   get:
 *     summary: Get a list of referrals
 *     description: Retrieves a paginated list of referrals with optional filtering by status.
 *     tags:
 *       - Referral
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
 *         description: Filter referrals by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of referrals per page (defaults to 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of referrals
 *       500:
 *         description: Internal Server Error
 */
