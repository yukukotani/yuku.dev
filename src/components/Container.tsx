import { FunctionalComponent, h } from 'preact';
import styles from './Container.module.scss';

const Container: FunctionalComponent = ({ children }) => {
  return <main class={styles.container}>{children}</main>;
};

export default Container;
