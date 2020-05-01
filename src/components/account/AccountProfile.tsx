import React from 'react';
import styled, { keyframes } from 'styled-components';
import gql from 'graphql-tag';
import { colors, animation } from '../../styles/variables';

const IMAGE_SIZE_BIG = 600;

export const AccountProfileFragment = gql`
    fragment AccountProfileFragment on User {
        login
        name
        avatarUrl(size: ${IMAGE_SIZE_BIG})
        websiteUrl
    }
`;

export interface AccountProfileProps {
    login: string;
    name?: string;
    avatarUrl: string;
    websiteUrl?: string;
}

export const AccountProfile: React.FunctionComponent<AccountProfileProps> = ({
    login,
    name,
    avatarUrl,
    websiteUrl,
}) => (
    <Wrapper>
        <Avatar avatarUrl={avatarUrl} />
        <div>
            <Name>{name}</Name>
            <Login>{login}</Login>
            <Link href={websiteUrl}>{websiteUrl}</Link>
        </div>
    </Wrapper>
);

export const SlideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-1rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    animation: ${SlideIn} 500ms ${animation.cubicBezier} forwards;
`;

const Avatar = styled.img<{ avatarUrl?: string }>`
    max-width: 300px;
    height: 300px;
    background-image: ${props => `url(${props.avatarUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${colors.secondary.greyLvl2};
    border-radius: 0.25rem;
    margin-bottom: 1rem;
`;

const Name = styled.h3`
    margin: 0;
`;

const Login = styled.h4`
    margin: 0;
    opacity: 0.5;
`;

const Link = styled.a`
    color: ${colors.primary.accent};
`;
