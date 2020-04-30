import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { colors, animation } from '../../common/styles/variables';
import { SlideInKeyframes } from '../../common/styles/animations';
import { UserProfileFragmentFragment } from '../../generated/graphql';

export const UserProfileFragment = gql`
    fragment UserProfileFragment on User {
        login
        name
        avatarUrl(size: 600)
        websiteUrl
    }
`;

export const UserProfile = ({ login, name, avatarUrl, websiteUrl }: UserProfileFragmentFragment) => (
    <Wrapper>
        <Avatar avatarUrl={avatarUrl} />
        <div>
            <Name>{name}</Name>
            <Login>{login}</Login>
            <Link href={websiteUrl}>{websiteUrl}</Link>
        </div>
    </Wrapper>
);

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    animation: ${SlideInKeyframes} 500ms ${animation.cubicBezier} forwards;
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
