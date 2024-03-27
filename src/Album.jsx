import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";

const Album = () => {
    const {id} = useParams();
    const spotifyConfig = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=b14bea6109a141b8b15e857c903a7ef5&client_secret=1ff3731d1226404e8d4aed9d07bc4b87'
    };
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState(null);
    const [error, setError] = useState(false);
    const songs = useRef();
    const player = useRef();

    async function getAlbum () {
        const requestToken = await fetch('https://accounts.spotify.com/api/token', spotifyConfig)
        const token = (await requestToken.json()).access_token;

        const requestAlbum = await fetch(`https://api.spotify.com/v1/albums/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
        const album = await requestAlbum.json();

        return album;
    }

    useEffect(() => {
        getAlbum()
        .then(album => {
            setLoading(false);
            setAlbum(album);
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
            };
        })
        .catch(() => {
            setLoading(false);
            setError('An error occured, please try again');
        });

        return () => {
            if (document.querySelector('iframe')) document.querySelector('iframe').classList.remove('player');
        }
    }, []);

    return (
        <>
            {loading && <div className="spinner"></div>}
            {album && 
                <div className="w-[60%] mt-4 mx-auto relative laptop:w-[70%] tablet:w-[85%] mobile:w-[90%]">
                    <div className="flex items-center justify-center gap-x-[8%] bg-gradient-to-r from-gray-300 to-gray-600 rounded-2xl mb-3 py-3 mobile:bg-gradient-to-b mobile:from-gray-600 mobile:to-gray-300 mobile:flex-col mobile:py-6">
                        <div className="w-[20%] laptop_m:w-[25%] tablet:w-[30%] mobile:w-[45%] mobile_m:w-[55%] mobile_m:mt-8 mobile_s:w-[70%]">
                            <img src={album.images[1].url} alt={album.name} className="h-[150px] rounded-[7px] mobile:aspect-video mobile:object-cover" />
                        </div>
                        <div className="w-[60%] laptop_m:w-[65%] tablet:w-[55%] mobile:w-[72%] mobile:relative mobile:left-[13%] mobile_m:w-[75%] mobile_m:left-[10%]">
                            <p className="text-2xl">Album</p>
                            <h1 className="mt-1 text-6xl tracking-wider overflow-ellipsis tablet:text-5xl tablet:tracking-wide mobile:text-4xl mobile:tracking-normal">{album.name}</h1>
                            <div className="flex gap-x-3 mt-4 tablet:flex-col mobile:mt-2">
                                <Link to={`/artist/${album.artists[0].id}`} className="tablet:text-2xl">{album.artists[0].name}</Link>
                                <p>{album.tracks.items.length} songs</p>
                                <p>&copy;{album.label} {album.release_date.slice(0, 4)}</p>
                            </div>
                        </div>
                        <a href={album.external_urls.spotify} target="blank" className="absolute w-[100px] top-[1%] right-[2%] mobile_m:top-[.5%]">
                            <img src="/Spotify_Green.png" alt="spotify_logo" />
                        </a>
                    </div>
                    <i className="fa-regular fa-circle-xmark hidden sticky top-6 left-[94%] text-3xl cursor-pointer transition-colors duration-300 hover:text-red-500 z-10" id="close-player" />
                    <div className="bg-[rgba(71,85,105,0.5)] rounded-[15px]">
                        <h1 className="text-center text-4xl mb-2">Tracklist</h1>
                        <ul ref={songs}>
                            {album.tracks.items.map((track, index) => (
                                <li key={index} id={track.uri} className="relative flex items-center gap-x-[2%] bg-[rgba(75,85,99,0.5)] px-[1%] mb-3 rounded-xl hover:bg-slate-600 hover:text-white transition-colors duration-300 ease-in mobile:gap-x-[4%] mobile:px-[2%]">
                                    <span className="text-white">{index + 1}</span>
                                    {track.explicit ? <span className="bg-gray-300 px-2 rounded-md font-semibold mobile_m:text-sm">E</span> : ''}
                                    <div>
                                        <h1 className="text-2xl tablet_s:mb-1 mobile_m:text-xl">{track.name}</h1>
                                        {track.artists.map((artist, index) => (
                                            <Link key={index} to={`/artist/${artist.id}`} className="text-xl">{artist.name}{index + 1 !== track.artists.length ? ', ' : ''}</Link>
                                        ))}
                                    </div>
                                    <i id="play" className="fa-solid fa-play absolute right-[4%] text-gray-100 cursor-pointer" />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div ref={player}></div>
                </div>
            }
            {album && <Footer />}
            {error && <p className="text-center text-xl py-5 text-gray-800">{error}</p>}
        </>

    );
}
 
export default Album;