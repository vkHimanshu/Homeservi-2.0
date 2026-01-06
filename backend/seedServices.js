require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const sampleServices = [
    // Plumbing Services
    {
        name: 'Pipe Repair & Replacement',
        category: 'plumbing',
        description: 'Professional repair and replacement of broken or leaking pipes. Includes inspection, material sourcing, and installation.',
        price: 7000,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop'
    },
    {
        name: 'Drain Cleaning & Unclogging',
        category: 'plumbing',
        description: 'Complete drain cleaning service using professional equipment. Handles kitchen sinks, bathroom drains, and main line clogs.',
        price: 5500,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=600&fit=crop'
    },
    {
        name: 'Toilet Installation & Repair',
        category: 'plumbing',
        description: 'Expert toilet installation, repair, and replacement services. Includes fixing leaks, running toilets, and complete replacements.',
        price: 8000,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop'
    },

    // Electrical Services
    {
        name: 'Light Fixture Installation',
        category: 'electrical',
        description: 'Professional installation of ceiling lights, chandeliers, wall sconces, and outdoor lighting fixtures.',
        price: 6200,
        duration: 60,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop'
    },
    {
        name: 'Electrical Outlet Installation',
        category: 'electrical',
        description: 'Safe installation of new electrical outlets and switches. Includes GFCI outlets for bathrooms and kitchens.',
        price: 4500,
        duration: 45,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop'
    },
    {
        name: 'Circuit Breaker Repair',
        category: 'electrical',
        description: 'Diagnosis and repair of circuit breaker issues. Includes panel inspection and breaker replacement if needed.',
        price: 10000,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    },

    // Cleaning Services
    {
        name: 'Deep House Cleaning',
        category: 'cleaning',
        description: 'Comprehensive deep cleaning service including all rooms, kitchen appliances, bathrooms, and hard-to-reach areas.',
        price: 12500,
        duration: 180,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop'
    },
    {
        name: 'Standard House Cleaning',
        category: 'cleaning',
        description: 'Regular house cleaning service covering dusting, vacuuming, mopping, and basic bathroom and kitchen cleaning.',
        price: 6500,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=600&fit=crop'
    },
    {
        name: 'Move-In/Move-Out Cleaning',
        category: 'cleaning',
        description: 'Thorough cleaning service for empty properties. Perfect for preparing homes for new occupants or final cleanup.',
        price: 16500,
        duration: 240,
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=600&fit=crop'
    },

    // Carpentry Services
    {
        name: 'Furniture Assembly',
        category: 'carpentry',
        description: 'Professional assembly of flat-pack furniture, shelving units, desks, beds, and cabinets.',
        price: 5000,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop'
    },
    {
        name: 'Door Installation & Repair',
        category: 'carpentry',
        description: 'Installation and repair of interior and exterior doors, including hardware, hinges, and locks.',
        price: 9000,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    },
    {
        name: 'Custom Shelving Installation',
        category: 'carpentry',
        description: 'Design and installation of custom shelving solutions for closets, garages, and living spaces.',
        price: 11500,
        duration: 150,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop'
    },

    // Appliance Repair Services
    {
        name: 'Refrigerator Repair',
        category: 'appliance-repair',
        description: 'Diagnostic and repair service for all refrigerator issues including cooling problems, ice makers, and water dispensers.',
        price: 8000,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=600&fit=crop'
    },
    {
        name: 'Washing Machine Repair',
        category: 'appliance-repair',
        description: 'Complete washing machine repair service covering drainage issues, spin cycles, and electronic controls.',
        price: 7000,
        duration: 75,
        image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=600&fit=crop'
    },
    {
        name: 'Dishwasher Installation & Repair',
        category: 'appliance-repair',
        description: 'Professional dishwasher installation and repair including water connection, drainage, and electrical hookup.',
        price: 8500,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop'
    }
];

const seedServices = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Clear existing services (optional - remove if you want to keep existing ones)
        await Service.deleteMany({});
        console.log('Cleared existing services');

        // Insert sample services
        const result = await Service.insertMany(sampleServices);
        console.log(`✅ Successfully created ${result.length} sample services!`);

        console.log('\n📋 Services by category:');
        const categories = ['plumbing', 'electrical', 'cleaning', 'carpentry', 'appliance-repair'];
        for (const category of categories) {
            const count = result.filter(s => s.category === category).length;
            console.log(`   ${category}: ${count} services`);
        }

        console.log('\n💰 All prices are now in Indian Rupees (₹)');
        console.log('🖼️  All services now have images!');
        console.log('\n🎉 Ready to use! Go to http://localhost:5173/services to see them.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();
