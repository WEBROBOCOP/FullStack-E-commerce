import { Schema, model} from "mongoose";

const OrderSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    items: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, required: true, default: 1 },
        },
      ],

    address: {
        type: String, 
        required: true
    },

    phone: {
        type: String
    },
});

export default model("Order", OrderSchema);