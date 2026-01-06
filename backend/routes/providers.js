const express = require('express');
const Provider = require('../models/Provider');

const router = express.Router();

// Get all providers
router.get('/', async (req, res) => {
  try {
    const { service, city } = req.query;
    let query = { isVerified: true, availability: true };

    if (service) {
      query.services = service;
    }

    if (city) {
      query['location.address'] = new RegExp(city, 'i');
    }

    const providers = await Provider.find(query)
      .populate('user', 'firstName lastName email phone')
      .select('-documents'); // Exclude sensitive documents

    res.json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profileImage');

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get provider profile by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const provider = await Provider.findOne({ user: req.params.userId })
      .populate('user', 'firstName lastName email phone profileImage');

    if (!provider) {
      return res.status(404).json({ message: 'Provider profile not found' });
    }

    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update provider profile
router.put('/:id', async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'firstName lastName email phone');

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update provider availability
router.put('/:id/availability', async (req, res) => {
  try {
    const { availability } = req.body;

    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { availability },
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json({ message: 'Availability updated successfully', availability: provider.availability });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get providers near location (geospatial query)
router.get('/near/:lng/:lat/:maxDistance?', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 50000 } = req.params; // maxDistance in meters (default 50km)

    const providers = await Provider.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      },
      isVerified: true,
      availability: true
    }).populate('user', 'firstName lastName email phone');

    res.json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get provider statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Get booking statistics
    const Booking = require('../models/Booking');
    const totalBookings = await Booking.countDocuments({
      provider: req.params.id,
      status: { $in: ['completed', 'in-progress'] }
    });

    const completedBookings = await Booking.countDocuments({
      provider: req.params.id,
      status: 'completed'
    });

    const totalEarnings = await Booking.aggregate([
      { $match: { provider: provider._id, status: 'completed', paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalBookings,
      completedBookings,
      totalEarnings: totalEarnings[0]?.total || 0,
      rating: provider.rating,
      totalReviews: provider.totalReviews
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
