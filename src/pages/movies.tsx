import { GetServerSideProps } from 'next';
import clientPromise from '../lib/mongodb';
import { MongoClient } from 'mongodb';
import Navbar from '@/components/Navbar';
import "../app/globals.css";

interface Movie {
  _id: {
    $oid: string;
  };
  plot: string;
  genres: string[];
  runtime: {
    $numberInt: string;
  };
  cast: string[];
  num_mflix_comments: {
    $numberInt: string;
  };
  title: string;
  fullplot: string;
  languages: string[];
  released: {
    $date: {
      $numberLong: string;
    };
  };
  directors: string[];
  rated: string;
  awards: {
    wins: {
      $numberInt: string;
    };
    nominations: {
      $numberInt: string;
    };
    text: string;
  };
  lastupdated: string;
  year: {
    $numberInt: string;
  };
  imdb: {
    rating: {
      $numberDouble: string;
    };
    votes: {
      $numberInt: string;
    };
    id: {
      $numberInt: string;
    };
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: {
        $numberDouble: string;
      };
      numReviews: {
        $numberInt: string;
      };
      meter: {
        $numberInt: string;
      };
    };
    lastUpdated: {
      $date: {
        $numberLong: string;
      };
    };
  };
}

interface MoviesProps {
  movies: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ movies }) => {
  return (
    <div>
    <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center mt-8">
        <div className="bg-black bg-opacity-20 p-8 rounded-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Top 20 Movies of All Time</h1>
          <p className="text-xl mb-8">
            <small>(According to Metacritic)</small>
          </p>
          <ul className="space-y-6">
            {movies.map((movie) => (
              <li key={movie._id.$oid} className="bg-gray-300 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-lg">{movie.plot}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Movies;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('sample_mflix');
    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    // console.log('Fetched movies:', movies); // Log the fetched movies

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { movies: [] } };
  }
};

