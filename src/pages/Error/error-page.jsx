import { useRouteError } from "react-router-dom";
import Error404 from '../../assets/404error.avif';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page" className="flex flex-col items-center h-screen justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">404 Not Found</h1>
      <p className="text-lg text-gray-700">Sorry, the page you're looking for does not exist.</p>
      <img src={Error404} alt="Error Image" className="mt-8 w-1/2 max-w-md" />
      <Link to="/" className="mt-8 text-blue-500 hover:underline">Go back to home</Link>
      {error && (
        <p className="mt-4 text-sm text-gray-500">
          <i>{error.statusText || error.message}</i>
        </p>
      )}
    </div>
  );
}
