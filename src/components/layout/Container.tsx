import React from 'react';
import styled from 'styled-components';
import { device } from '../../common/styles/mediaQueries';

interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FunctionComponent<ContainerProps> = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media ${device.hasMediumDevice} {
        padding: 0 4rem;
    }
`;
