import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from "./Footer";

function Movie () {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjM2MWI2NGM5MWQ2YTZhMjAwYzdhNjQ3MGUxMjQ2NCIsInN1YiI6IjY1ZDg2NzE4OTkyNTljMDE3Yjk0NDY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Djb77USzroEbbAlm3i69tOUw28fosVouUNMfwO3j8KE'
        }
    };

    async function fetchData() {
        const requestMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const movie = await requestMovie.json();

        const requestCredits = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
        const credits = await requestCredits.json();

        const requestVideos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
        const videos = (await requestVideos.json()).results.filter(video => video.type === 'Trailer');

        const requestSimilarMovies = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options);
        const similarMovies = (await requestSimilarMovies.json()).results;

        return {movie, credits, videos, similarMovies};
    }

    useEffect(() => {
        fetchData()
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            setError('An error occured, please try again');
        });
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-500 to-gray-200">
            <Helmet>
                {data && <title>Jambaze | {data.movie.title}</title>}
            </Helmet>
            { loading && <div className="spinner"></div> }
            { data && 
                <section className='bg-gradient-to-r from-gray-500 to-zinc-900 pb-[2%]'>
                    <div className="flex gap-x-[4%] px-[2%] mobile:flex-col">
                        <div>
                            <h1 className='text-white text-4xl py-[10px] tablet_s:text-3xl'>{data.movie.title}</h1>
                            <img src={`https://image.tmdb.org/t/p/w780/${data.movie.backdrop_path}`} alt={data.movie.title} />
                            <p className='text-gray-300 text-sm italic my-3'>...{data.movie.tagline}</p>
                            <div className='flex gap-x-4 gap-y-3 my-4 flex-wrap'>
                                {data.movie.genres.map((genre, index) => (<p key={index} className='bg-red-600 text-gray-300 rounded-lg px-3 py-1'>{genre.name}</p>))}
                            </div>
                            <p className='text-gray-300 mb-1 text-xl'>Rated: <span className='text-red-500 font-semibold'>{data.movie.adult ? '18+' : 'PG-13'}</span></p>
                            <p className='text-gray-300 mb-1 text-xl mobile:hidden'>Runtime: {(data.movie.runtime/60).toFixed(2)} {data.movie.runtime/60 > 1 ? 'hours' : 'hour'}</p>
                            <p className='text-gray-300 mb-1 text-xl mobile:hidden'><i className="fa-solid fa-star text-amber-400"></i> Average: {data.movie.vote_average}</p>
                        </div>
                        <div className="w-[60%] mt-[4%] laptop:w-[50%] mobile:w-full">
                            <p className='text-gray-400 mb-3 text-lg mobile:text-xl mobile:text-gray-300'>{data.movie.overview}</p>
                            <div className="flex flex-wrap items-center gap-2 my-2 mobile:text-xl">
                                <p className='text-gray-400 text-xl mobile:text-gray-200'>Languages: </p>
                                {data.movie.spoken_languages.map((language, index) => (<p key={index} className='bg-gray-300 text-gray-800 rounded-lg px-2 py-1'>{language.name}</p>))}
                            </div>
                            <p className='text-gray-400 mb-1 text-xl mobile:text-xl mobile:text-gray-200'>Release date: {new Date(data.movie.release_date).toDateString()}</p>
                            <div>
                                <h1 className="text-center text-3xl text-gray-200 my-2 mobile:my-4">Trailers</h1>
                                <div className="flex gap-x-[4%] overflow-auto">
                                    {
                                        data.videos.map((trailer, index) => (
                                            <div key={index} className="bg-gray-300" allow="picture-in-picture">
                                                <iframe height="200" width="220" allowFullScreen src={`https://www.youtube.com/embed/${trailer.key}?controls=1`}></iframe>
                                                <p className="pl-[5px]">{trailer.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='hidden text-gray-300 mt-4 mb-1 text-xl pl-[2%] mobile:block'>Runtime: {(data.movie.runtime/60).toFixed(2)} {data.movie.runtime/60 > 1 ? 'hours' : 'hour'}</p>
                    <p className='hidden text-gray-300 mb-1 text-xl pl-[2%] mobile:block'><i className="fa-solid fa-star text-amber-400"></i> Average: {data.movie.vote_average}</p>
                </section>
            }
            { data &&
                <section className="credits">
                    <div>
                        <h1 className="text-center text-4xl my-[20px] text-red-500">Cast</h1>
                        <div className="cast px-[2%] grid grid-flow-col auto-cols-[22%] overflow-x-auto gap-x-[20px] laptop_s:auto-cols-[28%] tablet_s:auto-cols-[35%] mobile:auto-cols-[55%] mobile_m:auto-cols-[70%] mobile:px-[3%]">
                            {
                                data.credits.cast.map((cast, index) => (
                                    <div key={index} className="bg-gray-400">
                                        <img className="h-[250px] object-cover aspect-video" src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`} alt={cast.name} />
                                        <p className="px-[2%]">{cast.name} as <span className="text-red-500 text-[18px]">{cast.character}</span></p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-[40px]">
                        <h1 className="text-center text-4xl my-[20px] text-gray-600">Crew</h1>
                        <div className="crew px-[2%] grid grid-flow-col auto-cols-[22%] overflow-x-auto gap-x-[20px] laptop_s:auto-cols-[28%] tablet_s:auto-cols-[35%] mobile:auto-cols-[55%] mobile_m:auto-cols-[70%] mobile:px-[3%]">
                            {
                                data.credits.crew.map((crew, index) => (
                                    <div key={index} className="bg-red-400">
                                        <img className="h-[250px] object-cover aspect-video" src={`https://image.tmdb.org/t/p/w300/${crew.profile_path}`} alt={crew.name} />
                                        <p className="px-[2%]">{crew.name} - <span className="text-gray-200 text-[18px]">{crew.job}</span></p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            }
            {data &&
                <section>
                    <h1 className="text-center text-4xl my-[20px] text-red-500">Similar</h1>
                    <div className="similar px-[2%] grid grid-flow-col auto-cols-[22%] overflow-x-auto gap-x-[20px] laptop_s:auto-cols-[28%] tablet_s:auto-cols-[35%] mobile:auto-cols-[55%] mobile_m:auto-cols-[70%] mobile:px-[3%]">
                        {
                            data.similarMovies.map((Similar, index) => (
                                <a href={`/movie/${Similar.id}`} key={index} className="bg-gray-400">
                                    <img className="h-[250px] object-cover aspect-video" src={`https://image.tmdb.org/t/p/w300/${Similar.backdrop_path}`} alt={Similar.title} />
                                    <p className="px-[2%]">{Similar.title}</p>
                                </a>
                            ))
                        }
                    </div>
                </section>
            }
            {data && <Footer />}
            {error && <p className="text-center text-xl py-5 text-gray-800">{error}</p>}
        </div>
    );
}
 
export default Movie;