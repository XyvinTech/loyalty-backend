/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: Transaction related endpoints
 */

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Initiate a new transaction
 *     description: Creates a new transaction based on the provided details (e.g., payment, transfer).
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionId:
 *                 type: string
 *                 example: "txn123456789"
 *               coupon_id:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e3" # MongoDB ObjectId reference to Coupons, nullable
 *               discount_id:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e4" # MongoDB ObjectId reference to Discounts, nullable
 *               point_criteria:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e5" # MongoDB ObjectId reference to point_criteria
 *               userId:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e6" # MongoDB ObjectId reference to User
 *                 description: User associated with the transaction (required)
 *               ClientId:
 *                 type: object
 *                 example: { "name": "Client ABC", "contact": "123-456-7890" } 
 *                 description: Client information associated with the transaction
 *               note:
 *                 type: object
 *                 example: { "text": "Discount applied to the transaction" }
 *                 description: Additional notes related to the transaction
 *               status:
 *                 type: string
 *                 enum: ["success", "failed", "pending"]
 *                 default: "pending"
 *                 example: "pending"
 *               points_redeemed:
 *                 type: number
 *                 example: 100
 *                 description: The number of points redeemed for this transaction (nullable for earning transactions)
 *               transaction_type:
 *                 type: string
 *                 enum: ["discount", "coupon", "earn"]
 *                 description: Type of transaction
 *                 example: "coupon"
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionId:
 *                   type: string
 *                   example: "txn123456789"
 *                 coupon_id:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e3"
 *                 discount_id:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e4"
 *                 point_criteria:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e5"
 *                 userId:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e6"
 *                 ClientId:
 *                   type: object
 *                   example: { "name": "Client ABC", "contact": "123-456-7890" }
 *                 note:
 *                   type: object
 *                   example: { "text": "Discount applied to the transaction" }
 *                 status:
 *                   type: string
 *                   enum: ["success", "failed", "pending"]
 *                   default: "pending"
 *                   example: "pending"
 *                 points_redeemed:
 *                   type: number
 *                   example: 100
 *                 transaction_type:
 *                   type: string
 *                   enum: ["discount", "coupon", "earn"]
 *                   example: "coupon"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transaction/single/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     description: Retrieves a specific transaction by its ID.
 *     tags:
 *       - Transaction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to retrieve
 *     responses:
 *       200:
 *         description: Transaction found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactionId:
 *                   type: string
 *                   example: "txn123456789"
 *                 coupon_id:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e3"
 *                 discount_id:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e4"
 *                 point_criteria:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e5"
 *                 userId:
 *                   type: string
 *                   example: "62b8c27b4f9c8e1b6c55d4e6"
 *                 ClientId:
 *                   type: object
 *                   example: { "name": "Client ABC", "contact": "123-456-7890" }
 *                 note:
 *                   type: object
 *                   example: { "text": "Discount applied to the transaction" }
 *                 status:
 *                   type: string
 *                   enum: ["success", "failed", "pending"]
 *                   example: "pending"
 *                 points_redeemed:
 *                   type: number
 *                   example: 100
 *                 transaction_type:
 *                   type: string
 *                   enum: ["discount", "coupon", "earn"]
 *                   example: "coupon"
 *       400:
 *         description: Bad Request - Invalid ID or ID not provided
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transaction/list:
 *   get:
 *     summary: Get a list of transactions
 *     description: Retrieves a paginated list of transactions with optional filtering by status or type.
 *     tags:
 *       - Transaction
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
 *         description: Filter transactions by status (pending, success, failed)
 *       - in: query
 *         name: transaction_type
 *         schema:
 *           type: string
 *         description: Filter transactions by type (discount, coupon, earn)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of transactions per page (defaults to 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of transactions
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transaction/single/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     description: Delete a specific transaction by its ID.
 *     tags:
 *       - Transaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the transaction to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the transaction
 *       400:
 *         description: Bad request, missing transaction ID
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transaction/user/{id}:
 *   get:
 *     summary: Get transactions for a specific user
 *     description: Retrieve all transactions associated with a specific user based on their user ID.
 *     tags:
 *       - Transaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose transactions are being retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved transactions for the user
 *       400:
 *         description: User ID is required
 *       404:
 *         description: No transactions found for the user
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /transaction/single/{id}:
 *   put:
 *     summary: Update transaction status (approve/reject)
 *     description: Approve or reject a transaction by updating its status.
 *     tags:
 *       - Transaction
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
 *               transactionId:
 *                 type: string
 *                 example: "txn123456789"
 *               coupon_id:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e3" # MongoDB ObjectId reference to Coupons, nullable
 *               discount_id:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e4" # MongoDB ObjectId reference to Discounts, nullable
 *               point_criteria:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e5" # MongoDB ObjectId reference to point_criteria
 *               userId:
 *                 type: string
 *                 example: "62b8c27b4f9c8e1b6c55d4e6" # MongoDB ObjectId reference to User
 *                 description: User associated with the transaction (required)
 *               ClientId:
 *                 type: object
 *                 example: { "name": "Client ABC", "contact": "123-456-7890" } 
 *                 description: Client information associated with the transaction
 *               note:
 *                 type: object
 *                 example: { "text": "Discount applied to the transaction" }
 *                 description: Additional notes related to the transaction
 *               status:
 *                 type: string
 *                 enum: ["success", "failed", "pending"]
 *                 default: "pending"
 *                 example: "pending"
 *               points_redeemed:
 *                 type: number
 *                 example: 100
 *                 description: The number of points redeemed for this transaction (nullable for earning transactions)
 *               transaction_type:
 *                 type: string
 *                 enum: ["discount", "coupon", "earn"]
 *                 description: Type of transaction
 *                 example: "coupon"
 *     responses:
 *       200:
 *         description: Transaction status updated successfully
 *       400:
 *         description: Invalid transaction ID or action
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error
 */

