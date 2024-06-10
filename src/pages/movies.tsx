// src/pages/movies.tsx
import { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import { fetchUpcomingMovies } from '../lib/tmdb';
import "../app/globals.css"
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
}

interface MoviesProps {
  movies: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ movies }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center mt-8">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Upcoming Movies</h1>
          <h3>Provided by <Link href="https://www.themoviedb.org">TMDB (link)</Link></h3>
          <ul className="space-y-6">
            {movies.map((movie) => (
              <li key={movie.id} className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-lg">{movie.overview}</p>
                <p className="text-sm text-gray-400">Release Date: {movie.release_date}</p>
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
  const region = 'US'; // Replace with your desired region code
  const startDate = new Date().toISOString().split('T')[0]; // Current date
  const accessToken = 'your_access_token'; // Replace with your actual access token

  const movies = await fetchUpcomingMovies(region, startDate, accessToken);
  return {
    props: { movies },
  };
};
