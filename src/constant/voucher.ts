import Joi from "joi";

const Voucher = {
  getVouchers: {
    tags: ["Vouchers"],
    description: "Lấy danh sách voucher",
    auth: true,
    responses: {
      default: { description: "Successful operation" },
    },
  },

  getVouchersByUser: {
    tags: ["Vouchers"],
    description: "Lấy voucher theo ID người dùng",
    auth: true,
    validate: {
      params: Joi.object({
        idUser: Joi.string().required()
      })
    },
    responses: {
      default: { description: "Successful operation" },
    },
  },

  createVoucher: {
    tags: ["Vouchers"],
    description: "Tạo mới voucher",
    auth: true,
    validate: {
      payload: Joi.object({
        code: Joi.string().required(),
        idUser: Joi.string().required(),
        discount: Joi.number().required(),
        expirationDate: Joi.string().isoDate().required(),
        isActive: Joi.boolean().optional(),
        quantity: Joi.number().optional(),
        usedQuantity: Joi.number().optional()
      })
    },
    responses: {
      default: { description: "Successful operation" },
    },
  },

  updateVoucher: {
    tags: ["Vouchers"],
    description: "Cập nhật voucher",
    auth: true,
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        code: Joi.string().optional(),
        idUser: Joi.string().optional(),
        discount: Joi.number().optional(),
        expirationDate: Joi.string().isoDate().optional(),
        quantity: Joi.number().optional(),
        usedQuantity: Joi.number().optional()
      })
    },
    responses: {
      default: { description: "Successful operation" },
    },
  }
}
export default Voucher;