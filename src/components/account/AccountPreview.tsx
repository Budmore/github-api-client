import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';
import { colors, animation } from '../../common/styles/variables';

export interface AccountPreviewProps {
    login: string;
    avatarUrl: string;
    name?: string;
}

export const AccountPreviewFragment = gql`
    fragment AccountPreviewFragment on User {
        login
        name
        avatarUrl(size: 60)
    }
`;

export const AccountPreview: React.FunctionComponent<AccountPreviewProps> = ({ login, avatarUrl, name }) => (
    <NavLinkCustom to={`/${login}`}>
        <AvatarMini src={avatarUrl} alt={`Avatar of ${name}`} />
        {login} {name && `- ${name}`}
    </NavLinkCustom>
);

const AvatarMini = styled.img`
    width: 2rem;
    height: 2rem;
    background-color: ${colors.secondary.greyLvl2};
    border-radius: 0.25rem;
    margin-right: 1rem;
`;

const NavLinkCustom = styled(NavLink)`
    color: ${colors.primary.accent};
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 1rem;
    transition: background-color 300ms ${animation.cubicBezier};

    &:hover {
        background-color: ${colors.secondary.greyLvl2};
    }

    &.active {
        font-weight: bold;
    }
`;
