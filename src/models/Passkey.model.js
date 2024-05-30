import mongoose, { Schema } from "mongoose";

const PasskeySchema = new  Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  webAuthnUserID: { type: String, required: true },

  id: { type: String, required: true, unique: true },

  publicKey: { type: Buffer, required: true },


  counter: { type: Number, required: true },

  deviceType: { type: String, required: true },

  backedUp: { type: Boolean, required: true },

  transports: { type: [String], required: true },
  
});

export const Passkey = mongoose.model('Passkey', PasskeySchema);


