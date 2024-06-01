import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movies = [
  {
    title: 'The Shawshank Redemption',
    metacritic: 80,
    plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  },
  {
    title: 'The Godfather',
    metacritic: 100,
    plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  },
  // Add more sample movies as needed
];

async function seedDatabase() {
  try {
    await client.connect();
    const db = client.db('sample_mflix');
    const collection = db.collection('movies');

    await collection.deleteMany({}); // Clear existing data
    await collection.insertMany(movies);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
