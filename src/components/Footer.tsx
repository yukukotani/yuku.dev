import { FunctionalComponent, h } from 'preact';
import styles from './Footer.module.scss';

type Props = {
  hideProfile?: boolean;
};

export const Footer: FunctionalComponent<Props> = ({ hideProfile = false }) => {
  return (
    <footer className={styles.footer}>
      {!hideProfile && (
        <div className={styles.profile}>
          <picture>
            <source type="image/webp" srcset="/icon.webp" />
            <img src="/icon.png" className={styles.icon} alt="yuku's icon" />
          </picture>
          <div>
            <div className={styles.name}>
              <a href="/about">Yuku Kotani</a>
            </div>
            <div className={styles.description}>
              VP of Technology @ Ubie, Inc.
              <br />
              Student (B4) @ Univ. of Tsukuba
            </div>
          </div>
        </div>
      )}
      <div className={styles.links}>
        <a href="https://github.com/yukukotani" target="_blank" rel="noopener">
          GitHub
        </a>
        <a href="https://twitter.com/yukukotani" target="_blank" rel="noopener">
          Twitter
        </a>
        <a href="/feed.xml" target="_blank" rel="noopener">
          RSS
        </a>
      </div>
      <div className={styles.note}>&copy; Yuku Kotani | This site uses Google Analytics.</div>
    </footer>
  );
};
