function Header({children}) {
  return (
    <div className="flex md:flex-row flex-col md:gap-7 gap-3 md:items-center mb-10 xl:px-0 md:px-6  px-5">
      <h2 className="text-black sm:text-4xl text-2xl font-bold">
        {children}
      </h2>
      <div className="h-[2px] md:w-6/12 w-11/12 bg-black"></div>
    </div>
  );
}

export default Header
