import { FunctionalComponent, h } from 'preact';
import type { JSX } from 'preact';

export const NoteIcon: FunctionalComponent<JSX.SVGAttributes> = (props) => {
  return (
    <svg {...props} viewBox="0 0 493 493" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M139.2 141.7C180.4 141.7 236.8 139.6 277.3 140.7C331.6 142.1 352.1 165.8 352.8 224.2C353.5 257.3 352.8 351.9 352.8 351.9H294C294 269.1 294.3 255.4 294 229.3C293.3 206.3 286.8 195.4 269.1 193.3C250.4 191.2 198 193 198 193V352H139.2V141.7Z"
        fill="#040000"
      />
    </svg>
  );
};
