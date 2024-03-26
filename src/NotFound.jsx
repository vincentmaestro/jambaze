const NotFound = () => {
    return (  
        <>
            <h1 className="text-center text-2xl mb-4 tablet_s:mt-4">Oops...</h1>
            <div className="flex items-center justify-center gap-x-[1%] mb-2">
                <i className="fa-solid fa-circle-exclamation text-5xl text-red-400 mobile:text-4xl" />
                <h1 className="text-5xl mobile:text-4xl">404 <span className="text-2xl">Page not found</span></h1>
            </div>
            <p className="text-xl text-center">Looks like you've entered an incorrect link. Check the link and try again</p>
        </>
    );
}
 
export default NotFound;