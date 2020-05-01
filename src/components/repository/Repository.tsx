import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';

import { colors } from '../../common/styles/variables';

export const RepositoryFragment = gql`
    fragment RepositoryFragment on Repository {
        name
        url
        description
        primaryLanguage {
            name
            color
        }
    }
`;

export interface RepositoryProps {
    name: string;
    url: string;
    description?: string;
    primaryLanguage?: {
        name: string;
        color: string;
    };
}

export const Repository: React.FunctionComponent<RepositoryProps> = ({ url, name, description, primaryLanguage }) => (
    <Wrapper>
        <TitleLink href={url} title='Link to the repository'>
            {name}
        </TitleLink>
        <Description>{description}</Description>
        {primaryLanguage && (
            <Summary>
                <Dot bgColor={primaryLanguage.color} />
                <ProgramingLanguage>{primaryLanguage.name}</ProgramingLanguage>
            </Summary>
        )}
    </Wrapper>
);

const Wrapper = styled.li`
    margin-bottom: 1rem;
    border: 1px solid ${colors.secondary.greyLvl1};
    padding: 1rem;
    border-radius: 0.25rem;
`;

const TitleLink = styled.a`
    display: block;
    color: ${colors.primary.accent};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Description = styled.p``;

const Dot = styled.div<{ bgColor?: string | null }>`
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    margin-right: 0.5rem;
    background-color: ${props => (props.bgColor ? props.bgColor : colors.secondary.greyLvl1)};
`;

const Summary = styled.div`
    display: flex;
    align-items: center;
`;

const ProgramingLanguage = styled.div`
    color: ${colors.primary};
    font-size: 0.8rem;
`;
