const Joi = require("joi");

exports.createAdminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string(),
  status: Joi.boolean(),
});

exports.editAdminSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  role: Joi.string(),
  password: Joi.string(),
  status: Joi.boolean(),
});

exports.createUserSchema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  client_company: Joi.string(),
  points: Joi.string(),
  tier: Joi.string(),
});

exports.editUserSchema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  client_company: Joi.string(),
  points: Joi.string(),
  tier: Joi.string(),
});

exports.updateUserSchema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  client_company: Joi.string(),
  points: Joi.string(),
  tier: Joi.string(),
});

exports.createBrandSchema = Joi.object({
  title: Joi.string().required(),
  logo: Joi.string().required(),
});

exports.editBrandSchema = Joi.object({
  title: Joi.string(),
  logo: Joi.string(),
});

exports.createCategorySchema = Joi.object({
  title: Joi.string(),
});

exports.editCategorySchema = Joi.object({
  title: Joi.string(),
});

exports.createCouponSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  brand: Joi.string(),
  image: Joi.string().required(),
  OTP: Joi.number(),
  points_required: Joi.number().required(),
  coin_cost: Joi.number(),
  starts_from: Joi.string(),
  expiry: Joi.string().required(),
  no_of_cards: Joi.number(),
  availability_criteria: Joi.string(),
  category: Joi.string(),
  status: Joi.string(),
});

exports.editCouponSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  brand: Joi.string(),
  image: Joi.string().required(),
  OTP: Joi.number(),
  points_required: Joi.number().required(),
  coin_cost: Joi.number(),
  starts_from: Joi.string(),
  expiry: Joi.string().required(),
  no_of_cards: Joi.number(),
  availability_criteria: Joi.string(),
  category: Joi.string(),
  status: Joi.string(),
});

 exports.createDiscountSchema = Joi.object({
  title: Joi.string().required(),
  discount_code: Joi.string().required(),
  description: Joi.string().required(),
  percentage: Joi.number().required(),
  image: Joi.string(),
  tier_required: Joi.array(),
  valid_from: Joi.date().required(),
  valid_to: Joi.date().required(),
  status: Joi.string(),
});

exports.editDiscountSchema = Joi.object({
  title: Joi.string(),
  discount_code: Joi.string(),
  description: Joi.string(),
  percentage: Joi.number(),
  image: Joi.string(),
  tier_required: Joi.array(),
  valid_from: Joi.date(),
  valid_to: Joi.date(),
  status: Joi.string(),
});

exports.createReferralSchema = Joi.object({
  title: Joi.string().required(),
  points: Joi.number().required(),
  icon: Joi.string(),
  description: Joi.string().required(),
  conditions: Joi.object({
    limit: Joi.number(),
  }).optional(),
});

exports.editPointSchema = Joi.object({
  title: Joi.string().required(),
  points: Joi.number().required(),
  icon: Joi.string(),
  description: Joi.string(),
  conditions: Joi.object({
    limit: Joi.number(),
  }).optional(),
});

exports.createReferralSchema = Joi.object({
  referral_id: Joi.string().required(),
  referrer_id: Joi.string().required(),
  referred_id: Joi.string().required(),
  points_awarded: Joi.number().required(),
  action: Joi.string().required(),
  isActionCompleted: Joi.boolean().required(),
  conditions: Joi.object({
    limit: Joi.number()
  }).optional()
});

exports.editReferralSchema = Joi.object({
  referral_id: Joi.string().required(),
  referrer_id: Joi.string().required(),
  referred_id: Joi.string().required(),
  points_awarded: Joi.number().required(),
  action: Joi.string().required(),
  isActionCompleted: Joi.boolean().required(),
  conditions: Joi.object({
    limit: Joi.number()
  }).optional()
});

exports.createTierSchema = Joi.object({
  tier_name: Joi.string().optional(),
  point_level: Joi.number().optional(),
  icon: Joi.string().required(),
  description: Joi.string().required(),
  conditions: Joi.string().required(),
});

exports.createTransactionSchema = Joi.object({
  transactionId: Joi.string(),
  coupon_id: Joi.string(),
  discount_id: Joi.string(),
  point_criteria: Joi.string(),
  userId: Joi.string().required(),
  ClientId: Joi.object(),
  note: Joi.object(),
  status: Joi.string(),
  points_redeemed: Joi.number(),
  transaction_type: Joi.string().required(),
});

exports.editReferralSchema = Joi.object({
  transactionId: Joi.string(),
  coupon_id: Joi.string(),
  discount_id: Joi.string(),
  point_criteria: Joi.string(),
  userId: Joi.string().required(),
  ClientId: Joi.object(),
  note: Joi.object(),
  status: Joi.string(),
  points_redeemed: Joi.number(),
  transaction_type: Joi.string().required(),
});
