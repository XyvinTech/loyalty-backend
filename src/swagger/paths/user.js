/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User related endpoints
 */

/**
 * @swagger
 * /user/admin:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided details. Access is restricted based on permissions.
 *     tags:
 *       - User
 *     requestBody:
 *       description: Details of the user to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               client_company:
 *                 type: string
 *                 example: "something"
 *               tier:
 *                 type: string
 *                 example: "something"
 *     responses:
 *       201:
 *         description: User created successfullyy
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden, user lacks permissions
 *       409:
 *         description: Conflict, user with this email or phone already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/admin/single/{id}:
 *   put:
 *     summary: Edit a user
 *     description: Updates a user's details based on the provided information. Access is restricted based on permissions.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *           example: "6123abc456def7890ghi1234"
 *     requestBody:
 *       description: Details to update for the user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
  *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               client_company:
 *                 type: string
 *                 example: "something"
 *               tier:
 *                 type: string
 *                 example: "something"
 *     responses:
 *       200:
 *         description: User updated successfullyy
 *       400:
 *         description: Invalid input or User ID is missing
 *       403:
 *         description: Forbidden, user lacks permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /user/send-otp:
 *   post:
 *     summary: Send OTP
 *     description: API endpoint to send an OTP to a user's phone number
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfullyy
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/verify:
 *   post:
 *     summary: Verify User
 *     description: API endpoint to verify a user using OTP and phone number
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: number
 *                 example: 72033
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: User verified successfullyy
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/update:
 *   patch:
 *     summary: Update user
 *     description: Updates a specific user's details by their ID.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: object
 *                 properties:
 *                   first:
 *                     type: string
 *                   middle:
 *                     type: string
 *                   last:
 *                     type: string
 *               image:
 *                 type: string
 *               college:
 *                 type: string
 *               course:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               bio:
 *                 type: string
 *               company:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   designation:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *               social:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *               websites:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *               awards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     image:
 *                       type: string
 *                     name:
 *                       type: string
 *                     authority:
 *                       type: string
 *               videos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *             example:
 *               name:
 *                 first: "John"
 *                 middle: "M."
 *                 last: "Doe"
 *               image: "https://example.com/image.jpg"
 *               email: "johndoe@example.com"
 *               college: "66cef851d3cbe59728a7d474"
 *               course: "66cef851d3cbe59728a7d474"
 *               address: "123 Main St, Anytown, USA"
 *               bio: "Software Developer with 10 years of experience."
 *               company:
 *                 name: "Tech Corp"
 *                 designation: "Senior Developer"
 *                 phone: "555-1234"
 *                 address: "456 Tech Park, Silicon Valley"
 *               social:
 *                 - name: "LinkedIn"
 *                   link: "https://linkedin.com/in/johndoe"
 *               websites:
 *                 - name: "Portfolio"
 *                   link: "https://johndoe.com"
 *               awards:
 *                 - image: "https://example.com/award.jpg"
 *                   name: "Best Developer"
 *                   authority: "Tech Awards"
 *               videos:
 *                 - name: "Tech Talk"
 *                   link: "https://youtube.com/watch?v=example"
 *               certificates:
 *                 - name: "Certified Developer"
 *                   link: "https://example.com/certificate"
 *     responses:
 *       200:
 *         description: User updated successfullyy
 *       400:
 *         description: Bad Request - Invalid input or ID not provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/admin/list:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieves a paginated list of users with optional filtering by status.
 *     tags:
 *       - User
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
 *         description: Filter users by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of users per page (defaults to 10)
 *     responses:
 *       200:
 *         description: successfullyy retrieved the list of users
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a user
 *     description: Retrieves a user's details
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User found successfullyy
 *       400:
 *         description: User ID is missing
 *       403:
 *         description: Forbidden, user lacks permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login or register a user
 *     description: Authenticates a user using a Firebase client token. If the user does not exist, a new user is created and logged in.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientToken:
 *                 type: string
 *                 description: The Firebase client token for user authentication
 *                 example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlZjQ3..."
 *               fcm:
 *                 type: string
 *                 description: The FCM token for push notifications
 *                 example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlZjQ3..."
 *     responses:
 *       200:
 *         description: User logged in successfullyy
 *       400:
 *         description: Client Token is required
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /user/single/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a user's details based on the provided user ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *           example: "6123abc456def7890ghi1234"
 *     responses:
 *       200:
 *         description: User found successfullyy
 *       400:
 *         description: User ID is missing
 *       403:
 *         description: Forbidden, user lacks permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /user/approval/{id}:
 *   put:
 *     summary: Approve or update a user's status
 *     description: Approves or updates the status of a user based on the provided user ID. The user must have the permission to perform this action.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to approve or update
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the user (e.g., "awaiting-payment", "rejected", etc.)
 *                 example: "awaiting-payment"
 *     responses:
 *       200:
 *         description: User status updated successfullyy
 *       400:
 *         description: User ID is required or User update failed
 *       403:
 *         description: Access denied due to insufficient permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Get a list of active users
 *     description: Retrieve a paginated list of users with "active" status, including populated college and course details.
 *     tags:
 *       - User
 *     parameters:
 *       - name: pageNo
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination (default is 1)
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of users per page (default is 10)
 *     responses:
 *       200:
 *         description: successfullyy retrieved the list of active users
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a paginated list of users. Optionally filter by status.
 *     tags:
 *       - User
 *     parameters:
 *       - name: pageNo
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users to retrieve per page.
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter users by status.
 *     responses:
 *       200:
 *         description: Users found successfullyy
 *       400:
 *         description: Bad Request - Invalid parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/get/{id}:
 *   get:
 *     summary: Get User by ID
 *     description: Retrieve a single user by their ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User found successfullyy
 *       400:
 *         description: User ID is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */



