import {h, Fragment} from 'preact';

interface Props {
  name: string;
  weight?: string;
  spin?: boolean;
}

export default function Icon({name, weight = 'regular', spin}: Props) {
    return (
        <i class={`fa-${weight} fa-${name} ${spin ? 'fa-spin' : ''}`} />
    )
};