import React from 'react';
import styled from 'styled-components';

interface ReposiotryProps {
    title: string;
}

export const Reposiotry: React.FunctionComponent<ReposiotryProps> = props => {
    const {} = props;
    return <Wrapper>Hello</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
`;
