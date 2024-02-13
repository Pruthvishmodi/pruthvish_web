import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.module.css';
import useFooter from '../../hooks/useFooter';

const Footer = () => {
  const { data, error } = useFooter();

  if (error) return <div>failed to load</div>;
  return (
    <footer className="footer">
      <div className="container">
        <h1>{data?.footer.note}</h1>
        <div className="footer-logo">
          <span>
            Pruthvish <span />
          </span>
        </div>

        <If condition={!!data?.footer.socialLinks}>
          <ul className="social-icons">
            <For each="item" of={data.footer.socialLinks}>
              <li>
                <a href={item.link} target="_blank" rel="noreferrer nooper" aria-label={item.label}>
                  <FontAwesomeIcon icon={item.iconName?.split('_')} />
                </a>
              </li>
            </For>
          </ul>
        </If>
        <p className="copyright">{data?.footer.copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
