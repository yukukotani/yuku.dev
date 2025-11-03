import { FunctionalComponent, h } from 'preact';
import styles from './About.module.scss';

export const About: FunctionalComponent = () => {
  return (
    <article>
      <div>
        <h1 className={styles.title}>About me</h1>
      </div>
      <div className={styles.icons}>
        <picture>
          <source type="image/webp" srcset="/icon.webp" />
          <img src="/icon.png" class="icon" alt="yuku's icon" />
        </picture>
        <picture>
          <source type="image/webp" srcset="/yuku.webp" />
          <img src="/yuku.png" class="icon" alt="yuku's icon" />
        </picture>
      </div>
      <div className={styles['markdown-body']}>
        <h4>名前</h4>
        <span>小谷 優空 / Yuku Kotani</span>
        <h4>連絡先</h4>
        <ul>
          <li>
            Twitter:{' '}
            <a href="https://twitter.com/yukukotani" target="_blank" rel="noopener">
              @yukukotani
            </a>
          </li>
          <li>
            GitHub:{' '}
            <a href="https://github.com/yukukotani" target="_blank" rel="noopener">
              @yukukotani
            </a>
          </li>
          <li>Email: yukukotani[at]gmail.com</li>
        </ul>
        <h4>仕事・所属</h4>
        <ul>
          <li>
            <span>CTO at Ubie, Inc.</span>
            <ul>
              <li>
                <a href="https://ubie.app" target="_blank" rel="noopener">
                  症状検索エンジン「ユビー」
                </a>
              </li>
              <li>
                <a href="https://ubiehealth.com" target="_blank" rel="noopener">
                  Ubie AI Symptom Checker
                </a>
              </li>
            </ul>
          </li>
          <li>Technical Adviser at SALESCORE, Inc.</li>
        </ul>
      </div>
    </article>
  );
};
2;
