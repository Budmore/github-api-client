import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, animation } from '../../common/styles/variables';

interface UserProfileProps {
    login: string;
    name?: string;
    avatarUrl?: string;
    websiteUrl?: string;
}

export const UserProfile: React.FunctionComponent<UserProfileProps> = ({ login, name, avatarUrl, websiteUrl }) => (
    <Wrapper>
        <Avatar avatarUrl={avatarUrl} />
        <Name>{name}</Name>
        <Login>{login}</Login>
        <Link href={websiteUrl}>{websiteUrl}</Link>
    </Wrapper>
);

const FadeIn = keyframes`
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
    animation: ${FadeIn} 500ms ${animation.cubicBezier} forwards;
`;

const Avatar = styled.img<{ avatarUrl: string }>`
    width: 300px;
    height: 300px;
    background-image: ${props => `url(${props.avatarUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${colors.secondary.greyLvl2};
    border-radius: 0.25rem;
`;

const Name = styled.h3``;

const Login = styled.h4``;

const Link = styled.a`
    color: ${colors.primary.link};
`;
