import { h, Fragment } from 'preact';

export type MessageType = 'success' | 'warning' | 'error';

interface Props {
    content: string;
    type: MessageType;
}

export default function Message({ content, type }: Props) {
    return (
        <div class={`message message--${type}`}>
            {content}
        </div>
    );
};