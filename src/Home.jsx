import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import Footer from "./Footer";

const Home = () => {
    const spotifyConfig = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=b14bea6109a141b8b15e857c903a7ef5&client_secret=1ff3731d1226404e8d4aed9d07bc4b87'
    };
    const tmdbConfig = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjM2MWI2NGM5MWQ2YTZhMjAwYzdhNjQ3MGUxMjQ2NCIsInN1YiI6IjY1ZDg2NzE4OTkyNTljMDE3Yjk0NDY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Djb77USzroEbbAlm3i69tOUw28fosVouUNMfwO3j8KE'
        }
    };
    const navigate = useNavigate();

    const [albumCover, setAlbumCover] =  useState('./TIMELESS.jfif');
    const covers = ['./Boy Alone.jpg', './TIMELESS.jfif', './Playboy.jpeg', './MIL.jpeg', './MMWTV.jpeg', './TAT(level up).jpg'];
    
    let albums = [
        {album: 'Playboy', artist: 'Fireboy', link: '1pUJnA3OSbvVr5afqxNARZ'},
        {album: 'Boy alone', artist: 'Omah lay', link: '47FGKv6DgcDj9YwvoQuTMN'},
        {album: 'Twice as tall', artist: 'Burna boy', link: '2pANu4qucnliJuRR94eZSV'},
        {album: 'Made in lagos', artist: 'Wizkid', link: '6HpMdN52TfJAwVbmkrFeBN'},
        {album: 'Timeless', artist: 'Davido', link: '6lI21W76LD0S3vC55GrfSS'},
        {album: 'Mr money with the vibe', artist: 'Asake', link: '0lzPMIAYhhUSD2BPT0VQWI'},
        {album: 'Signs', artist: 'Runtown', link: '6BK6S6VtshawDNE1MGT3eK'},
        {album: 'Unruly', artist: 'Olamide', link: '51mowf1u3WaEYvqalsbP7M'}
    ];
    const playlistProps = [
        {
            id: '37i9dQZEVXbKY7jLzlJ11V',
            cover: 'https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ng_large.jpg'
        },
        {
            id: '37i9dQZF1DWZhHP4V8F4YE',
            cover: 'https://i.scdn.co/image/ab67706f0000000333533b1fff2951d487029ab5'
        },
        {
            id: '37i9dQZEVXbMDoHDwVN2tF',
            cover: 'https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_large.jpg'
        },
        {
            id: '37i9dQZF1DX0XUsuxWHRQd',
            cover: 'https://i.scdn.co/image/ab67706f000000036be5de2571827dbd9c823d6c'
        },
        {
            id: '37i9dQZF1DX6PKX5dyBKeq',
            cover: 'https://i.scdn.co/image/ab67706f000000037b3bab5a76cba1f2e619692c'
        },
        {
            id: '37i9dQZF1DWYs83FtTMQFw',
            cover: 'https://i.scdn.co/image/ab67706f0000000339767035917d66876fb08035'
        }
    ];

    const [playlists, setPlaylists] = useState(null);
    const [searchedMusical, setSearchedMusical] = useState('');
    const [searchedMusicalResult, setSearchedMusicalResult] = useState(null);
    const [musicalNotFound, setMusicalNotFound] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [searchedMovie, setSearchedMovie] = useState('');
    const [movieType, setMovieType] = useState('movie');
    const [searchedMovieResult, setSearchedMovieResult] = useState(null);
    const [movieNotFound, setMovieNotFound] = useState(false);
    const songs = useRef();
    const player = useRef();

    async function getPlaylists() {
        const requestToken = await fetch('https://accounts.spotify.com/api/token', spotifyConfig);
        const token = (await requestToken.json()).access_token;

        const requestNaijaTop50 = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbKY7jLzlJ11V?fields=name%2Cdescription%2Cfollowers', {headers: {'Authorization': `Bearer ${token}`}});
        const naijaTop50 = await requestNaijaTop50.json();

        const requestViralAfrica = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DWZhHP4V8F4YE?fields=name%2Cdescription%2Cfollowers', {headers: {'Authorization': `Bearer ${token}`}});
        const viralAfrica = await requestViralAfrica.json();

        const requestGlobalTop50 = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?fields=name%2Cdescription%2Cfollowers', {headers: {'Authorization': `Bearer ${token}`}});
        const globalTop50 = await requestGlobalTop50.json();

        const requestRap = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd?fields=name%2Cdescription%2Cfollowers', {headers: {'Authorization': `Bearer ${token}`}});
        const rap = await requestRap.json();

        const requestUKRap = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX6PKX5dyBKeq?fields=name%2Cdescription%2Cfollowers', {headers: {'Authorization': `Bearer ${token}`}});
        const UKRap = await requestUKRap.json();

        const requestHotRhythmic = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DWYs83FtTMQFw?fields=name%2Cdescription%2Cfollowers', {headers: {'Authorization': `Bearer ${token}`}});
        const hotRhythmic = await requestHotRhythmic.json();

        return [naijaTop50, viralAfrica, globalTop50, rap, UKRap, hotRhythmic];
    }

    async function fetchTrendingMovies() {
        const requestTrendingMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, tmdbConfig);
        const trendingMovies = await requestTrendingMovies.json();

        return trendingMovies;
    }
    
    useEffect(() => {
        const timer = setInterval(() => {
            setAlbumCover(covers[Math.round(Math.random() * 5)])
        }, 10000);

        getPlaylists()
        .then(playlists => setPlaylists(playlists))
        // .catch(err => console.error(err));

        fetchTrendingMovies()
        .then(trendingMovies => {
            setTrendingMovies(trendingMovies);
            $(function(){
                $('.owl-carousel').owlCarousel({
                  loop: true,
                  items: 1,
                  autoplay: true,
                  nav: true,
                  autoplayHoverPause: true,
                  lazyLoad: true,
                  navSpeed: 5000,
                  animateIn: true,
                  animateOut: true
                });
            });
        })
        // .catch(err => console.error(err));

        return () => clearInterval(timer);
    }, []);

    async function searchMusical(e) {
        e.preventDefault();
        const requestToken = await fetch('https://accounts.spotify.com/api/token', spotifyConfig);
        const token = (await requestToken.json()).access_token;
        fetch(`https://api.spotify.com/v1/search?q=${searchedMusical}&type=album%2Cartist%2Ctrack&limit=10&offset=0`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => response.json())
        .then(response => {
            response.error ? (setMusicalNotFound(true), setSearchedMusicalResult(null)) : (setMusicalNotFound(false), setSearchedMusicalResult(response), 
            window.onSpotifyIframeApiReady = (IFrameAPI) => {
                const element = player.current;
                let options = {};
                const callback = (EmbedController) => {
                    songs.current.addEventListener('click', e => {
                        if(e.target.getAttribute('id') === 'play') {
                            EmbedController.loadUri(e.target.parentElement.getAttribute('id'));
                            EmbedController.play();
                            document.querySelector('iframe').classList.add('player');
                            document.querySelector('iframe').style.display = 'block';
                        }
                    });
                    EmbedController.addListener('ready', () => {
                        document.getElementById('close-player').style.display = 'inline';
                    });
                    document.getElementById('close-player').addEventListener('click', () => {
                        EmbedController.pause();
                        document.querySelector('iframe').style.display = 'none';
                        document.getElementById('close-player').style.display = 'none';
                    });
                };
                IFrameAPI.createController(element, options, callback);
            });
        })
        // .catch(err => console.error(err));
    }

    function searchMovie(e) {
        e.preventDefault();
        if(movieType === 'movie') {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=true&language=en-US&page=1`, tmdbConfig)
            .then(response => response.json())
            .then(response => {
                response.results.length ? (setSearchedMovieResult(response.results), setMovieNotFound(false)) : (setMovieNotFound(true), setSearchedMovieResult(null));
            })
            // .catch(err => {
            //     console.error(err);
            // });
        }
        else if(movieType === 'series') {
            fetch(`https://api.themoviedb.org/3/search/tv?query=${searchedMovie}&include_adult=true&language=en-US&page=1`, tmdbConfig)
            .then(response => response.json())
            .then(response => {
                response.results.length ? (setSearchedMovieResult(response.results), setMovieNotFound(false)) : (setMovieNotFound(true), setSearchedMovieResult(null));
            })
            // .catch(err => {
            //     console.error(err);
            // });
        }
    }

    return (
        <>
            <section className="music mt-8 mb-12">
                <h1 className="text-center text-3xl mobile_m:text-2xl mobile_s:text-xl">My favourite Afrobeats albums</h1>
                <div className="flex items-center justify-center mx-auto gap-x-[8%] py-6 tablet:gap-x-[6%] mobile:flex-col mobile:gap-y-5">
                    <div className=" laptop_s:w-[40%] mobile:w-[55%] mobile_m:w-[65%]">
                        <img src={albumCover} alt="album cover" className="w-[350px] h-[300px] tablet:h-[250px] tablet_s:h-[220px] mobile_m:h-[200px]"/>
                    </div>
                    <ul className="albums w-[34%] border-2 pl-3 pt-3 border-[rgba(245,159,11,0.43)] rounded-[10px] laptop_m:w-[42%] tablet:w-[46%] tablet_s:pt-0 mobile:w-[80%] mobile_m:w-[85%]">
                        {albums.map((album, index) => (
                            <li key={index} className="text-2xl mb-1 cursor-pointer tablet:text-xl tablet:mb-0 tablet_s:text-lg mobile:text-xl mobile:mb-[3px]" onClick={() => {searchedMusicalResult ? open(`album/${album.link}`, 'rel = noopener noreferrer') : navigate(`album/${album.link}`)}}>
                                {album.album}💽 - {album.artist}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-gray-300 mb-5 py-2">
                    <i className="fa-regular fa-circle-xmark hidden sticky top-6 left-[95%] text-3xl cursor-pointer transition-all duration-300 hover:text-red-500 z-10 mobile_m:text-2xl" id="close-player" />
                    <h1 className="text-center text-3xl">Search</h1>
                    <form className="flex justify-center items-center gap-x-[1%] py-5 mobile:gap-x-[4%]" onSubmit={searchMusical}>
                        <input type="text" placeholder="song, artist, album" className="rounded-md outline-none px-4 py-[2px] mobile:px-2 mobile:w-[60%]" onChange={e => {searchedMusical.length == 0 ? setMusicalNotFound(false) : null, setSearchedMusical(e.target.value)}} />
                        <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    {searchedMusicalResult &&
                        <div className="w-[90%] mx-auto h-[500px] overflow-y-auto">
                            <ul ref={songs} className="mb-6">
                                <h1 className="text-center text-4xl mobile:text-3xl mb-4">Songs</h1>
                                {searchedMusicalResult.tracks.items.map((track, index) => (
                                    <li key={index} id={track.uri} className="relative flex items-center gap-x-[2%] bg-[rgba(75,85,99,0.5)] px-[1%] mb-3 rounded-xl hover:bg-slate-600 hover:text-white transition-colors duration-300 ease-in mobile:gap-x-[4%] mobile:px-[2%]">
                                        <span className="text-white">{index + 1}</span>
                                        {track.explicit ? <span className="bg-gray-300 px-2 rounded-md font-semibold mobile_m:text-sm">E</span> : ''}
                                        <img src={track.album.images[2].url} alt={`${track.name} cover`} />
                                        <div>
                                            <h1 className="text-2xl tablet_s:mb-1 mobile_m:text-xl">{track.name}</h1>
                                            {track.artists.map((artist, index) => (
                                                <span key={index} className="text-xl cursor-pointer" onClick={() => open(`/artist/${artist.id}`, 'rel = noopener noreferrer')}>{artist.name}{index + 1 !== track.artists.length ? ', ' : ''}</span>
                                            ))}
                                        </div>
                                        <i id="play" className="fa-solid fa-play absolute right-[2%] text-gray-100 cursor-pointer" />
                                    </li>
                                ))}
                            </ul>
                            <div className="mb-6">
                                <h1 className="text-center text-4xl mobile:text-3xl mb-4">Albums</h1>
                                <ul className="grid grid-flow-col auto-cols-[20%] gap-x-[2%] overflow-x-auto laptop:auto-cols-[22%] laptop_s:auto-cols-[28%] tablet:auto-cols-[36%] tablet:gap-x-[4%] mobile:auto-cols-[52%] mobile:gap-x-[8%] mobile_m:auto-cols-[65%] mobile_s:auto-cols-[80%]">
                                    {searchedMusicalResult.albums.items.map((album, index) => (
                                        <li key={index} className="cursor-pointer bg-[rgba(75,85,99,0.5)] rounded-xl overflow-hidden hover:bg-slate-600 hover:text-white transition-colors duration-300 ease-in" onClick={() => open(`/album/${album.id}`, 'rel = noopener noreferrer')}>
                                            <img src={album.images[1].url} alt={album.name} />
                                            <div className="pl-[4%]">
                                                <h1 className="text-xl mobile_m:text-lg">{album.name}</h1>
                                                <p className="text-lg">({album.artists[0].name})</p>
                                                <span className="text-white">{album.release_date.slice(0, 4)}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h1 className="text-center text-4xl mobile:text-3xl mb-4">Artists</h1>
                                <ul className="grid grid-flow-col auto-cols-[20%] gap-x-[4%] overflow-x-auto laptop_s:auto-cols-[28%] tablet:auto-cols-[34%] tablet_s:auto-cols-[40%] mobile:auto-cols-[54%] mobile:gap-x-[6%] mobile_m:auto-cols-[64%] mobile_s:auto-cols-[72%]">
                                    {searchedMusicalResult.artists.items.map((artist, index) => (
                                        <li key={index} className="cursor-pointer overflow-hidden flex items-center gap-x-[2%] bg-[rgba(75,85,99,0.5)] mb-3 rounded-xl hover:bg-slate-600 hover:text-white transition-colors duration-300 ease-in laptop_m:gap-x-[4%]" onClick={() => open(`/artist/${artist.id}`, 'rel = noopener noreferrer')}>
                                            <img src={artist.images[2]?.url} alt={artist.name} className="h-[80px]" />
                                            <h1 className="text-2xl laptop_m:text-xl tablet:text-lg">{artist.name}</h1>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }
                    {musicalNotFound && 
                        <div className="mobile:px-[2%]">
                            <h1 className="text-center text-2xl text-red-500">Could not complete search</h1>
                            <p className="text-center">You have failed to enter a valid search query or the search was completed with no results found</p>
                        </div>
                    }
                </div>
                <div className="flex flex-wrap gap-x-[4%] gap-y-6 px-[4%] py-8 bg-stone-700 laptop_s:px-[2%] laptop_s:gap-x-[2%] tablet:px-[2%] tablet:justify-center tablet:gap-x-[6%] mobile:flex-col mobile:items-center mobile:gap-y-4">
                    {playlists && playlists.map((playlist, index) => (
                        <div key={index} className="flex items-center gap-x-[4%] w-[30%] pl-[1%] rounded-2xl bg-stone-600 cursor-pointer transition-colors duration-200 hover:bg-stone-400 laptop_s:w-[32%] tablet:w-[45%] mobile:w-[90%] mobile:pl-[2%] mobile:gap-x-[6%]" onClick={() => {searchedMusicalResult ? open(`playlist/${playlistProps[index].id}`, 'rel = noopener noreferrer') : navigate(`playlist/${playlistProps[index].id}`)}}>
                            <div className="w-[18%] tablet:w-[20%]">
                                <img src={playlistProps[index].cover} alt={playlist.name} />
                            </div>
                            <div className="w-[78%] tablet:w-[76%] mobile:w-[73%]">
                                <h1 className="text-gray-300 text-xl tablet:text-2xl tablet:mb-[2px] mobile:text-3xl mobile:mb-0 mobile_m:text-2xl">{playlist.name}</h1>
                                <p className="tablet:text-lg mobile:text-xl mobile_m:text-lg">{playlist.description}</p>
                                <small className="tablet:text-[16px]">{playlist.followers.total.toLocaleString()} followers</small>
                            </div>
                        </div>
                    ))}
                </div>
                {!playlists && <div className="loading-playlists h-[240px] bg-stone-700"></div>}
            </section>

            <section className="movies">
                <h1 className="text-center text-3xl text-red-400 mb-4">Trending Movies🔥</h1>
                <div className="owl-carousel owl-theme my-2 tablet:my-0">
                    {trendingMovies && trendingMovies.results.map(movie => (
                        <div key={movie.id} style={{backgroundImage: `linear-gradient(rgba(17,24,39,0.55), rgba(17,24,39,0.55)), url(https://image.tmdb.org/t/p/${window.innerWidth < 580 ? 'w780' : 'w1280'}/${movie.backdrop_path})`, backgroundSize: 'cover'}} className="h-[768px] flex flex-col justify-center">
                            <div className="px-[3%] mobile:pl-[4%]">
                                <h1 className="text-white text-[4rem] w-[78%] tablet:w-[85%] mobile:text-[54px] mobile_m:text-[2.5rem]">{movie.title}</h1>
                                <p className="text-white text-[20px] w-[60%] mb-3 laptop_s:w-[75%] tablet_s:w-[94%] tablet_s:text-[22px] mobile:w-full mobile:text-[20px] mobile_m:text-[18px]">{movie.overview}</p>
                                <p className="text-white mb-3 text-2xl"><i className="fa-solid fa-star"></i> Average: {movie.vote_average}</p>
                                <div className="flex gap-4">
                                    <span className="bg-white px-[10px] py-[4px] rounded-[5px] text-[20px] font-semibold"><i className="fa-solid fa-play"></i> Play trailer</span>
                                    <button className="bg-gray-700 text-gray-200 tracking-wider px-[10px] py-[4px] rounded-[5px] text-[20px] font-semibold" onClick={() => {searchedMusicalResult ? open(`movie/${movie.id}`, 'rel = noopener noreferrer') : navigate(`movie/${movie.id}`)}}><i className="fa-solid fa-circle-info"></i> Info</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-300 mb-5 py-4">
                    <h1 className="text-center text-3xl">Search Movies</h1>
                    <form className="flex justify-center items-center gap-x-[1%] py-5 laptop_s:gap-x-[2%] mobile:gap-x-[3%]" onSubmit={searchMovie}>
                        <select defaultValue={movieType} className="outline-none mobile:w-[25%] mobile_s:w-[30%]" onChange={e => setMovieType(e.target.value)}>
                            <option value="movie">Movie</option>
                            <option value="series">TV series</option>
                        </select>
                        <input type="text" placeholder="keywords" className="rounded-md outline-none px-4 py-[2px] mobile:w-[50%]" onChange={e => {searchedMovie.length == 0 ? setMovieNotFound(false) : null, setSearchedMovie(e.target.value)}} />
                        <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <ul className={searchedMovieResult ? 'h-[500px] overflow-y-auto' : null}>
                        {searchedMovieResult && searchedMovieResult.map((result, index) => (
                            <li key={index} className="flex items-center gap-x-[4%] my-[1rem] bg-gray-300 py-3 px-[4%] transition-colors duration-200 hover:bg-gray-600 hover:text-gray-300 cursor-pointer" onClick={() => {searchedMusicalResult ? (movieType === 'movie' ? open(`movie/${result.id}`, 'rel = noopener noreferrer') : open(`series/${result.id}`, 'rel = noopener noreferrer')) : (movieType === 'movie' ? navigate(`movie/${result.id}`) : navigate(`series/${result.id}`))}}>
                                <div className="w-[12%] mobile:w-[18%]">
                                    <img src={`https://image.tmdb.org/t/p/w300/${result.backdrop_path}`} alt={result.title} />
                                </div>
                                <div className="w-[84%] flex flex-col justify-center gap-y-1 mobile:w-[78%]">
                                    <h1 className="text-red-500 text-2xl truncate">{result.title || result.name}</h1>
                                    <p className="line-clamp-2 laptop_s:text-lg">{result.overview}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {movieNotFound && <p className="text-center pb-3">Search completed with no results found</p>}
                </div>
            </section>

            <div className="flex justify-center gap-x-[3%] gap-y-5 mb-[20px] px-[1%] tablet:px-0 tablet:gap-x-[2%] tablet_s:flex-col tablet_s:items-center">
                <div className="w-[30%] min-h-[130px] bg-[rgb(192,169,126)] rounded-2xl tablet:w-[31%] tablet_s:w-[75%] mobile:w-[85%]">
                    <h1 className="text-center text-2xl text-white">Bronze member</h1>
                    <p className="w-[96%] mx-auto my-[3%] laptop:my-[4%] laptop:w-[98%] laptop_s:w-full laptop_s:text-center tablet_s:my-[3%]">Enjoy daily streams without limits/restrictions plus ads.</p>
                    <small className="bg-gray-300 w-[60%] text-center block mx-auto cursor-pointer text-sm px-2 py-[2px] rounded-md transition-colors duration-200 hover:bg-gray-600 hover:text-white laptop:w-[70%] laptop_m:w-[80%] tablet:w-[85%] tablet:px-0 tablet:text-[13px] tablet_s:w-[50%] mobile:w-[60%] mobile_m:w-[70%] mobile_s:w-[85%]">Subscribe for $3 per month</small>
                </div>
                <div className="w-[30%] min-h-[130px] bg-slate-500 rounded-2xl tablet:w-[31%] tablet_s:w-[75%] mobile:w-[85%]">
                    <h1 className="text-center text-2xl text-white">Silver member</h1>
                    <p className="w-[90%] mx-auto my-[3%] laptop:w-[98%] laptop_s:w-full laptop_s:text-center">Daily streams without limits/restrictions plus no ads.</p>
                    <small className="bg-gray-300 w-[60%] text-center block mx-auto cursor-pointer text-sm px-2 py-[2px] rounded-md transition-colors duration-200 hover:bg-gray-600 hover:text-white laptop:w-[70%] laptop_m:w-[80%] tablet:w-[85%] tablet:px-0 tablet:text-[13px] tablet_s:w-[50%] mobile:w-[60%] mobile_m:w-[70%] mobile_s:w-[85%]">Subscribe for $5 per month</small>
                </div>
                <div className="w-[30%] min-h-[130px] bg-[rgb(179,151,60)] rounded-2xl tablet:w-[31%] tablet_s:w-[75%] mobile:w-[85%]">
                    <h1 className="text-center text-2xl text-white">Gold member</h1>
                    <p className="w-[94%] mx-auto my-[1%] text-[15.5px] laptop_s:w-full laptop_s:text-center">Daily streams without limits/restrictions plus no ads, plus customised daily contents, podcasts and playlists.</p>
                    <small className="bg-gray-300 w-[60%] text-center block mx-auto cursor-pointer text-sm px-2 py-[2px] mb-[1%] rounded-md transition-colors duration-200 hover:bg-gray-600 hover:text-white laptop:w-[70%] laptop_m:w-[80%] tablet:w-[85%] tablet:px-0 tablet:text-[13px] tablet_s:w-[50%] mobile:w-[60%] mobile_m:w-[70%] mobile_s:w-[85%]">Subscribe for $10 per month</small>
                </div>
            </div>
            <div ref={player}></div>
            <Footer />
        </>
    );
}

export default Home;