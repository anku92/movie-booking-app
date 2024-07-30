import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaRegClock } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import Navbar from '../../components/Navbar';
import Endpoints from '../../api/Endpoints';
import './MovieDetailPage.css';

const MovieDetailPage = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before making a new request
        const response = await axios.get(Endpoints.MOVIES_FILTER);

        if (response.status === 200) {
          const filteredMovie = response.data.movies.find((m) => m.id === parseInt(id, 10));

          if (filteredMovie) {
            setMovie(filteredMovie);
          } else {
            console.error('Movie not found.');
            setError('Movie not found.');
          }
        } else {
          console.error('Failed to fetch movies:', response.statusText);
          setError('Failed to fetch movies: ' + response.statusText);
        }
      } catch (error) {
        if (error.response) {
          console.error('API responded with an error:', error.response.status, error.response.data);
          setError('API error: ' + error.response.statusText);
        } else if (error.request) {
          console.error('No response received:', error.request);
          setError('Network error: Unable to reach the server.');
        } else {
          console.error('Error during API request setup:', error.message);
          setError('Error: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookTickets = () => {
    nav(`/${id}/cinema-list`, { state: { movie } });
  };

  if (loading) {
    return (
      <div className='spinner'>
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="error-message">
          <div>{error}</div>
          <span className='text-light pb-0'>back to </span>
          <Link to="/" className="btn-link">Home page</Link>
        </div>
      </>
    );
  }

  const { title, language, genre, release_date, duration, poster } = movie;

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="movie-wrapper">
          <div className="row">
            <div className="col-md-3">
              <img src={poster} alt="" className='movie-poster' />
            </div>
            <div className="col-md-9">
              <div className="movie-detail-wrapper">
                <h2>{title}</h2>
                <div className="movie-meta">
                  <p>{language}</p>
                  <h6>{genre}</h6>
                  <div className="movie-duration">
                    <div className='time-detail'>
                      <BsCalendar2Date />
                      <span>{release_date}</span>
                    </div>
                    <div className="mx-2"></div>
                    <div className='time-detail'>
                      <FaRegClock />
                      <span>{duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='stripe-bg'>
        <div className="container">
          <div className="row justify-content-end align-items-center h-100">
            <button onClick={handleBookTickets} className="proceed-btn join-btn">BOOK TICKETS</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailPage;
