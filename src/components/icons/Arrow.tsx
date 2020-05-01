import React from 'react';
import styled from 'styled-components';
import { animation } from '../../styles/variables';

interface ArrowProps {
    isUp?: boolean;
}

export const Arrow: React.FunctionComponent<ArrowProps> = props => (
    <Wrapper isUp={props.isUp}>
        <svg width='13' height='15' viewBox='0 0 26 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0 12.5534L2.53754 15.0506L11.1235 6.71541L11.1235 30H14.7386L14.7386 6.71541L23.3245 15.0506L25.8621 12.5534L12.931 0L0 12.5534Z'
                fill='currentColor'
            />
        </svg>
    </Wrapper>
);

const Wrapper = styled.div<{ isUp?: boolean }>`
    display: flex;
    transition: transform 300ms ${animation.cubicBezier};
    transform: ${props => (props.isUp ? 'rotate(0)' : 'rotate(180deg)')};
`;
