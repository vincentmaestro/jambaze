import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-slate-800 py-7 flex justify-center items-center gap-x-[8%] laptop_m:gap-x-[4%] tablet:gap-x-[3%] tablet_s:flex-col tablet:gap-y-[16px] tablet_s:items-stretch">
        <Link to="/" className="text-2xl text-slate-200 tablet:text-lg tablet_s:text-3xl tablet_s:ml-[4%] mobile:ml-[6%]"><h1>Jambaze🔥</h1></Link>
        <div className="w-[40%] flex justify-center items-center gap-x-[4%] laptop_s:gap-x-[2%] tablet_s:w-full tablet_s:gap-x-[6%] tablet_s:mb-3 mobile:gap-x-[4%] mobile_m:flex-col mobile_m:items-center mobile_m:gap-y-[14px]">
            <h1 className="text-[24px] text-slate-200 tablet:text-[18px] tablet_s:text-[24px] mobile:text-[22px] mobile_m:text-[28px]">Powered by:</h1>
            <div className="flex items-center gap-x-[14%] laptop_s:w-[50%] laptop_s:gap-x-[16%] mobile:gap-x-[8%] mobile_m:w-[80%] mobile_m:gap-x-[12%]">
                <a href="https://developer.spotify.com" target="blank"><img src="/Spotify_White.png" className="w-[120px] mobile:w-[140px]" alt="spotify" /></a>
                <a href="https://developer.themoviedb.org" target="blank"><img src="/tmdb.svg" className="w-[100px]" alt="TMDB" /></a>
            </div>
        </div>
        <div className="tablet_s:ml-[5%] mobile:ml-[7%]">
            <div className="mb-4 flex justify-center gap-x-[8%] tablet_s:justify-normal">
                <a href="mailto:maestroobika@gmail.com" className='text-white'><i className="fa-solid fa-envelope text-2xl tablet_s:text-3xl" /></a>
                <a href="https://x.com/Soundtrickz" target='blank' className='text-white'><i className="fa-brands fa-twitter text-2xl tablet_s:text-3xl" /></a>
                <a href="https://facebook.com/soundtrickz" target='blank' className='text-white'><i className="fa-brands fa-facebook text-2xl tablet_s:text-3xl" /></a>
            </div>
            <span className="text-slate-300 tablet:text-sm tablet_s:text-lg mobile_m:text-base">&copy; Jambaze {new Date().getFullYear()}. All rights reserved</span>
        </div>
      </footer>  
    )
}

export default Footer