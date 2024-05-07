import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Footer from './Footer'

function Playlist ({ spotifyConfig }) {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);
    const [showAlbum, setShowAlbum] = useState(false);
    const songs = useRef();
    const player = useRef();

    async function getPlaylist() {
        const requestToken = await fetch('https://accounts.spotify.com/api/token', spotifyConfig);
        const token = (await requestToken.json()).access_token;

        const requestPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${id}?fields=description%2Cfollowers%2Cexternal_urls%2Cimages%2Cname%2Ctracks`, {headers: {'Authorization': `Bearer ${token}`}});
        const requestedPlaylist = await requestPlaylist.json();

        return requestedPlaylist;
    }

    useEffect(() => {
        getPlaylist()
        .then(playlist => {
            // console.log(playlist);
            setLoading(false);
            setPlaylist(playlist);
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
            <Helmet>
                {playlist && <title>Jambaze | {playlist.name}</title>}
            </Helmet>
            {loading && <div className="spinner"></div>}
            {playlist && 
                <div style={{background: `linear-gradient(rgba(17,24,39,0.75), rgba(17,24,39,0.75)), url(${playlist.images[0].url})`}} className="h-screen overflow-y-auto relative mobile:pt-4">
                    <h1 className="text-center text-4xl text-gray-100 pt-2 mb-2 mobile_m:text-2xl mobile:mt-10">{playlist.name}</h1>
                    <p className="text-gray-200 text-center mobile_m:text-sm mobile:px-[2%]">...{playlist.description}</p>
                    <a href={playlist.external_urls.spotify} target="blank" className="absolute w-[100px] top-[2%] right-[4%]">
                        <img src="/Spotify_Green.png" alt="spotify_logo" />
                    </a>
                    <div>
                        <i className="fa-regular fa-circle-xmark hidden text-white fixed left-[90%] text-3xl cursor-pointer transition-colors duration-300 hover:text-red-500 z-10 mobile:left-[4%] mobile_m:text-2xl" id="close-player" />
                        <h1 className="text-center text-gray-100 text-4xl my-2">Tracks</h1>
                        <div ref={songs}>
                            {playlist.tracks.items.map((track, index) => (
                                <div key={index} id={track.track.uri} className="relative w-[80%] mx-auto bg-[rgba(75,85,99,0.6)] flex items-center gap-x-[2%] rounded-lg mb-3 hover:bg-gray-600 duration-200 transition-colors px-[1%] tablet:w-[85%] mobile:w-[90%] mobile:gap-x-[3%]">
                                    <span className="text-white">{index + 1}</span>
                                    <img src={track.track.album.images[2].url} alt={`${track.track.name} cover`} />
                                    <div className="flex gap-x-4 items-center mobile:gap-x-2">
                                        {track.track.explicit ? <span className="bg-gray-300 px-2 rounded-md font-semibold mobile_m:text-sm">E</span> : ''}
                                        <div>
                                            <h1 className="text-white text-2xl tablet:text-xl tablet_s:mb-1 mobile_s:text-sm">{track.track.name}</h1>
                                            {track.track.artists.map((artist, index) => (
                                                <Link to={`/artist/${artist.id}`} key={index} className="text-white mobile_s:text-sm">{artist.name}{index + 1 !== track.track.artists.length ? ', ' : ''}</Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute right-[2%] w-[4%] flex items-center justify-between laptop_m:w-[6%] tablet:w-[8%] mobile:w-[10%] mobile_m:w-[12%]">
                                        {!showAlbum && <i id="menu" className="fa-solid fa-ellipsis-vertical text-gray-100 cursor-pointer" />}
                                        <i id="play" className="fa-solid fa-play text-gray-100 cursor-pointer" />
                                    </div>
                                    {showAlbum && <Link to={`/album/${track.track.album.id}`} className="text-white bg-[rgba(75,85,99,0.6)] absolute right-[5%] px-2 rounded-md">Show album</Link>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div ref={player}></div>
                </div>
            }
            {playlist && <Footer />}
            {error && <p className="text-center text-xl py-5 text-gray-800">{error}</p>}
        </>
    );
}
 
export default Playlist;