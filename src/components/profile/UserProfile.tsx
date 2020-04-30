import React from 'react';
import styled from 'styled-components';
import { colors, animation } from '../../common/styles/variables';
import { SlideInKeyframes } from '../../common/styles/animations';

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

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    animation: ${SlideInKeyframes} 500ms ${animation.cubicBezier} forwards;
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
    color: ${colors.primary.accent};
`;
