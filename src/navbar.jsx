const Navbar = () => {

    function openNav() {
        document.querySelector('.open-nav').style.display = 'none';
        document.querySelector('.navlinks').classList.add('nav-open');
        document.querySelector('.close-nav').style.display = 'block';
    }

    function closeNav() {
        document.querySelector('.open-nav').style.display = 'block';
        document.querySelector('.navlinks').classList.remove('nav-open');
        document.querySelector('.close-nav').style.display = 'none';
    }

    function darkMode() {
        document.querySelector(':root').style.colorScheme = 'dark'
        document.querySelector('.open-nav').style.display = 'block';
        document.querySelector('.navlinks').classList.remove('nav-open');
        document.querySelector('.close-nav').style.display = 'none';
        document.querySelector('.light-mode').style.display = 'block';
        document.querySelector('.dark-mode').style.display = 'none';
    }

    function lightMode() {
        document.querySelector(':root').style.colorScheme = 'light'
        document.querySelector('.open-nav').style.display = 'block';
        document.querySelector('.navlinks').classList.remove('nav-open');
        document.querySelector('.close-nav').style.display = 'none';
        document.querySelector('.light-mode').style.display = 'none';
        document.querySelector('.dark-mode').style.display = 'block';
    }

    return (
        <nav className="flex items-center justify-center py-5 tablet:gap-x-[3%] tablet_s:justify-between tablet_s:px-[5%] tablet_s:py-3 tablet_s:sticky tablet_s:top-0 z-10 tablet_s:bg-stone-600">
            <a href="/" className="text-xl tablet_s:text-2xl tablet_s:text-slate-100"><h1>Jambaze🔥</h1></a>
            <ul className="navlinks w-[65%] flex justify-center gap-x-[4%] tablet:w-[55%] tablet_s:bg-stone-600 tablet_s:block tablet_s:fixed tablet_s:w-[44%] tablet_s:text-center tablet_s:py-4 tablet_s:rounded-xl tablet_s:top-[2%] tablet_s:right-[-100%] transition-all duration-300 mobile:w-[54%] mobile_m:w-[70%]">
                <li className="cursor-pointer tablet_s:mb-2 text-xl tablet:text-lg tablet_s:text-white hover:text-yellow-300" onClick={closeNav}>About us</li>
                <li className="cursor-pointer tablet_s:mb-2 text-xl tablet:text-lg tablet_s:text-white hover:text-yellow-300" onClick={closeNav}>Blog</li>
                <li className="cursor-pointer tablet_s:mb-2 text-xl tablet:text-lg tablet_s:text-white hover:text-yellow-300" onClick={closeNav}>Community</li>
                <li className="cursor-pointer tablet_s:mb-2 text-xl tablet:text-lg tablet_s:text-white hover:text-yellow-300" onClick={closeNav}>Contact us</li>
                <li className="cursor-pointer rounded-[8px] text-2xl text-white hidden tablet_s:block dark-mode" onClick={darkMode}><i className="fa-solid fa-moon" /> Dark mode</li>
                <li className="cursor-pointer rounded-[8px] text-2xl text-white hidden light-mode" onClick={lightMode}><i className="fa-regular fa-sun" /> Light mode</li>
            </ul>
            <button className="rounded-[8px] bg-orange-500 text-white px-[8px] py-[5px] hover:bg-slate-800 transition-colors duration-200 tablet_s:hidden" onClick={darkMode}><i className="fa-solid fa-moon" /> Dark mode</button>
            <button className="rounded-[8px] bg-orange-500 text-white px-[8px] py-[5px] hover:bg-slate-800 transition-colors duration-200 tablet_s:hidden" onClick={lightMode}><i className="fa-solid fa-sun" /> Light mode</button>
            <div className="hidden tablet_s:block">
                <svg className="open-nav cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="40" width="50" viewBox="0 0 448 512" onClick={openNav}><path fill="#fd8d3e" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                <svg className="close-nav hidden cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="40" width="50" viewBox="0 0 384 512" onClick={closeNav}><path fill="#ccc" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </div>
        </nav>
    );
}
 
export default Navbar;