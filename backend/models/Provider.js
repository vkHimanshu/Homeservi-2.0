const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  businessPhone: {
    type: String,
    required: true,
    trim: true
  },
  services: [{
    type: String,
    enum: ['plumbing', 'electrical', 'cleaning', 'carpentry', 'appliance-repair']
  }],
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  certifications: [{
    name: String,
    issuer: String,
    date: Date
  }],
  documents: [{
    type: String, // URLs to uploaded documents
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  availability: {
    type: Boolean,
    default: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    address: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for geospatial queries
providerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Provider', providerSchema);
