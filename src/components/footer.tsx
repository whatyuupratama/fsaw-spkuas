const Footer = () => {
  return (
    <footer className='footer flex items-center justify-center py-8 sm:py-8 bg-base-300 text-base-content px-4 sm:px-8 bg-[#4d0026]'>
      <aside className='text-center'>
        <p className='text-white'>
          Copyright © {new Date().getFullYear()} - by FuzzySAW Lab
        </p>
      </aside>
    </footer>
  );
};
export default Footer;
