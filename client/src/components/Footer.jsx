import junex from '../assets/imgs/junex.svg';
const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__span">Powered by</p>
      <img src={junex} alt="logo" className="footer__image" />
    </footer>
  );
};

export default Footer;
