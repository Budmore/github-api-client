import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loading } from '../../components/loading/Loading';
import { AccountPreview, AccountPreviewProps } from '../account/AccountPreview';
import { colors, animation } from '../../styles/variables';

interface AutocompleteProps {
    loading: boolean;
    users?: AccountPreviewProps[];
    onBackdropClick: () => void;
}

export const Autocomplete: React.FunctionComponent<AutocompleteProps> = ({ loading, users, onBackdropClick }) => (
    <>
        <Backdrop onClick={onBackdropClick} />
        <Background>
            {loading && <Loading />}

            {!loading && users && (
                <List>
                    {users.map((user, index) => (
                        <Item key={index}>
                            <AccountPreview login={user.login} avatarUrl={user.avatarUrl} name={user.name} />
                        </Item>
                    ))}
                </List>
            )}
        </Background>
    </>
);

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.2;
    z-index: 5;
    height: 100%;
    width: 100%;
`;

const Background = styled.div`
    position: absolute;
    bottom: 0;
    border-radius: 0.25rem;
    border: 1px solid ${colors.secondary.greyLvl2};
    background-color: #fff;
    padding: 1rem 0;
    width: 100%;
    transform: translateY(100%);
    box-sizing: border-box;
    z-index: 10;
`;

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

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    animation: ${SlideIn} 500ms ${animation.cubicBezier} forwards;
`;

const Item = styled.li`
    display: flex;
    margin: 0 0.5rem 0.5rem;

    align-items: center;
`;
