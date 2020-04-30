import { keyframes } from 'styled-components';

export const FadeInKeyframes = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const SlideInKeyframes = keyframes`
    from {
        opacity: 0;
        transform: translateY(-1rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const RotateKeyframes = keyframes`
    to {
        transform: rotate(360deg);
    }
`;
