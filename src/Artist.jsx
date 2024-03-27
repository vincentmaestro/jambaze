import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";

function Artist() {
    const {id} = useParams();
    const spotifyConfig = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=b14bea6109a141b8b15e857c903a7ef5&client_secret=1ff3731d1226404e8d4aed9d07bc4b87'
    };
    const [loading, setLoading] = useState(true);
    const [artist, setArtist] = useState();
    const [error, setError] = useState(false);
    const [showAlbum, setShowAlbum] = useState(false);
    const songs = useRef();
    const player = useRef();
    

    async function getArtist() {
        const requestToken = await fetch('https://accounts.spotify.com/api/token', spotifyConfig);
        const token = (await requestToken.json()).access_token;

        const requestArtist = await fetch(`https://api.spotify.com/v1/artists/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
        const about = await requestArtist.json();

        const requestAlbums = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`, {headers: {'Authorization': `Bearer ${token}`}});
        const albums = await requestAlbums.json();

        const requestTopTracks = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {headers: {'Authorization': `Bearer ${token}`}});
        const topTracks = await requestTopTracks.json();

        return {about, albums, topTracks};
    }

    useEffect(() => {
        getArtist()
        .then(artist => {
            setLoading(false);
            setArtist(artist);
            window.onSpotifyIframeApiReady = (IFrameAPI) => {
                const element = player.current;
                let options = {};
                const callback = (EmbedController) => {
                    songs.current.addEventListener('click', e => {
                        if(e.target.getAttribute('id') === 'play') {
                            EmbedController.loadUri(e.target.parentElement.parentElement.getAttribute('id'));
                            EmbedController.play();
                            document.querySelector('iframe').classList.add('player');
                        }
                        else if (e.target.getAttribute('id') === 'menu') setShowAlbum(true);
                        else setShowAlbum(false);
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
            };
        })
        .catch(err => {
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <>
            {loading && <div className="spinner"></div>}
            {artist &&
                <div className="mt-4">
                    <div className="w-[80%] mx-auto mb-10 py-6 rounded-2xl flex items-center justify-center gap-x-[10%] bg-gradient-to-r from-gray-300 to-gray-600 relative tablet:bg-gradient-to-b tablet:w-[85%] tablet:flex-col tablet:py-8 tablet:mb-6 mobile:w-[90%]">
                        <div className="w-[20%] laptop_m:w-[25%] laptop_s:w-[30%] tablet:w-[45%] mobile:w-[55%] mobile_m:w-[65%] mobile_s:w-[80%] mobile_m:mt-3">
                            <img className="h-[200px] object-cover aspect-video rounded-lg mobile:aspect-square" src={artist.about.images[1].url} alt={artist.about.name} />
                        </div>
                        <div className="w-[40%] laptop_s:w-[50%] tablet:mt-6 tablet:w-[70%] tablet:relative tablet:left-[12%] mobile:left-[8%] mobile_m:w-[80%]">
                            <h1 className="text-3xl mobile:text-2xl">Artist</h1>
                            <h1 className="text-6xl my-2 tablet:my-1 tablet_s:text-5xl mobile:text-3xl">{artist.about.name}</h1>
                            <div className="flex gap-x-1">
                                <h1 className="text-xl tablet:text-gray-200">Genres: </h1>
                                <div className="flex flex-wrap gap-x-1 mb-3 w-full tablet:text-xl tablet:text-gray-200">
                                    {artist.about.genres?.map((genre, index) => (
                                        <p key={index} className="text-lg tablet:text-xl tablet:text-gray-200">{genre}{index + 1 !== artist.about.genres.length ? ', ' : ''}</p>
                                    ))}
                                </div>
                            </div>
                            <p className="font-semibold tablet:text-gray-200">{artist.about.followers.total.toLocaleString()} <span className="font-normal">followers</span></p>
                        </div>
                        <a href={artist.about.external_urls.spotify} target="blank" className="absolute w-[100px] top-[8%] right-[2%] tablet:top-[4%] mobile:top-[2%]">
                            <img src="/Spotify_Green.png" alt="spotify_logo" />
                        </a>
                    </div>
                    <i className="fa-regular fa-circle-xmark hidden sticky top-6 left-[94%] text-3xl cursor-pointer transition-colors duration-300 hover:text-red-500 z-10 mobile:left-[4%] mobile:bg-blue-500 mobile:p-1 mobile:text-white mobile_m:text-2xl" id="close-player" />
                    <ul className="w-[80%] mx-auto bg-[rgba(71,85,105,0.5)] rounded-[15px] mb-10 tablet:mb-6 tablet:w-[85%] mobile:w-[90%]">
                        <h1 className="text-center text-5xl mb-3 mobile:text-4xl mobile_m:text-3xl">Albums</h1>
                        {artist.albums?.items.map((album, index) => (
                            <li key={index}>
                                <Link to={`/album/${album.id}`} className="relative flex items-center gap-x-[2%] mb-3 bg-[rgba(75,85,99,0.5)] px-[1%] rounded-xl hover:bg-slate-600 hover:text-white transition-colors duration-300 ease-in mobile:gap-x-[4%] mobile:px-[2%]">
                                    <span className="text-white">{index + 1}</span>
                                    <img src={album.images[2].url} alt={album.name} />
                                    <h1 className="text-2xl mobile_m:text-lg">{album.name}</h1>
                                    <span className="absolute right-[3%] text-white text-xl">{album.release_date.slice(0, 4)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="w-[80%] mx-auto bg-[rgba(71,85,105,0.5)] rounded-[15px] tablet:w-[85%] mobile:w-[90%]">
                        <h1 className="text-center text-5xl mb-3 mobile:text-4xl mobile_m:text-3xl">Top tracks</h1>
                        <ul ref={songs}>
                            {artist.topTracks.tracks.map((track, index) => (
                                <li key={index} id={track.uri} className="relative flex items-center gap-x-[2%] mb-3 bg-[rgba(75,85,99,0.5)] px-[1%] rounded-xl hover:bg-slate-600 hover:text-white transition-colors duration-300 ease-in mobile:gap-x-[4%] mobile:px-[2%]">
                                    <span className="text-white">{index + 1}</span>
                                    {track.explicit ? <span className="bg-gray-300 px-2 rounded-md font-semibold mobile_m:text-sm">E</span> : ''}
                                    <img src={track.album.images[2].url} alt={track.name} />
                                    <div>
                                        <h1 className="text-3xl tablet_s:mb-1 mobile_m:text-2xl mobile:mb-0">{track.name}</h1>
                                        {track.artists.map((artist, index) => (
                                            <Link key={index} to={`/artist/${artist.id}`} className="text-xl mobile_m:text-base">{artist.name}{index + 1 !== track.artists.length ? ', ' : ''}</Link>
                                        ))}
                                    </div>
                                    <div className="absolute right-[2%] w-[4%] flex items-center justify-between laptop_m:w-[6%] tablet:w-[8%] mobile:w-[10%] mobile_m:w-[12%]">
                                        {!showAlbum && <i id="menu" className="fa-solid fa-ellipsis-vertical text-gray-100 cursor-pointer" />}
                                        <i id="play" className="fa-solid fa-play text-gray-100 cursor-pointer" />
                                    </div>
                                    {showAlbum && <Link to={`/album/${track.album.id}`} className="text-white bg-[rgba(75,85,99,0.6)] absolute right-[5%] px-2 rounded-md">Show album</Link>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div ref={player}></div>
                </div>
            }
            {artist && <Footer />}
            {error && <p className="text-center text-xl py-5 text-gray-800">{error}</p>}
        </>
    );
}
 
export default Artist;