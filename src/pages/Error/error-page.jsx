import { useRouteError } from "react-router-dom";
import Error404 from '../../assets/404error.avif';
import {Link} from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="flex flex-col items-center left-1/2 top-1/4 h-screen justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-700">Sorry, the page you're looking for does not exist.</p>
        <img src={Error404} alt="Error Image" className="mt-50  w-full  -z-10" />
        <Link href="/" className="mt-8 text-blue-500 hover:underline">Go back to home</Link>
      </div>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}