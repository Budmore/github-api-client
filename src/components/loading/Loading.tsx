import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/variables';
import { RotateKeyframes } from '../../styles/animations';

export const Loading: React.FunctionComponent = () => (
    <Wrapper>
        <Spinner />
    </Wrapper>
);

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 0;
`;

const Spinner = styled.div`
    border: 3px solid ${colors.primary.complement};
    width: 2rem;
    height: 2rem;
    padding: 0;
    border-radius: 50%;
    border-left-color: ${colors.primary.accent};
    background-color: #fff;
    animation: ${RotateKeyframes} 1s linear infinite;
`;
