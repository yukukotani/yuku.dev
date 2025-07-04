import { FunctionalComponent, h } from 'preact';
import type { JSX } from 'preact';

export const SpeakerDeckIcon: FunctionalComponent<JSX.SVGAttributes> = (props) => {
  return (
    <svg {...props} fill="#009287" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" alt="Speaker Deck icon">
      <title>Speaker Deck</title>
      <path d="M213.9 296H100a100 100 0 0 1 0-200h132.8a40 40 0 0 1 0 80H98c-26.5 0-26.5 40 0 40h113.8a100 100 0 0 1 0 200H40a40 40 0 0 1 0-80h173.9c26.5 0 26.5-40 0-40zM298 416a120.2 120.2 0 0 0 51.1-80h64.6a19.8 19.8 0 0 0 19.7-20V196a19.8 19.8 0 0 0 -19.7-20H296.4a60.8 60.8 0 0 0 0-80h136.9c43.4 0 78.7 35.8 78.7 80v160c0 44.2-35.2 80-78.7 80z"/>
    </svg>
  );
};