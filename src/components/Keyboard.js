import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Letter from './Letter';
import FlexContainer from './FlexContainer';

const Container = styled(FlexContainer)`
    max-width: 30rem;
`;

const propTypes = {
    onType: PropTypes.func,
    onDelete: PropTypes.func,
    setFocus: PropTypes.func,
    hasFocusedChild: PropTypes.bool,
    initialFocus: PropTypes.string,
};

function Keyboard({ onType, onDelete, setFocus, hasFocusedChild, initialFocus }) {
    const [keyMode, setKeyMode] = useState('alpha');
    const [selectedButton, setSelectedButton] = useState('ACTION-NEXT');
    const toggleKeys = () => {
        setKeyMode(keyMode === 'alpha' ? 'special' : 'alpha');
    };

    useEffect(() => {
        // Set initial focus inorder to jumpstart spacial navigation
        if (!hasFocusedChild) setFocus('LETTER-A');
    }, [hasFocusedChild, setFocus]);

    return (
        <Container flexDirection='row' flexWrap='wrap' rowGap='1rem' columnGap='1rem'>
            {keyMode === 'alpha' ? (
                <>
                    <Letter
                        key='letterA'
                        label='A'
                        onClick={onType}
                        focusKey='LETTER-A'
                        onEnterPress={() => {
                            onType('A');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-A');
                        }}
                        selected={selectedButton === 'LETTER-A'}
                    />
                    <Letter
                        key='letterB'
                        label='B'
                        onClick={onType}
                        focusKey='LETTER-B'
                        onEnterPress={() => {
                            onType('B');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-B');
                        }}
                        selected={selectedButton === 'LETTER-B'}
                    />
                    <Letter
                        key='letterC'
                        label='C'
                        onClick={onType}
                        focusKey='LETTER-C'
                        onEnterPress={() => {
                            onType('C');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-C');
                        }}
                        selected={selectedButton === 'LETTER-C'}
                    />
                    <Letter
                        key='letterD'
                        label='D'
                        onClick={onType}
                        focusKey='LETTER-D'
                        onEnterPress={() => {
                            onType('D');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-D');
                        }}
                        selected={selectedButton === 'LETTER-D'}
                    />
                    <Letter
                        key='letterE'
                        label='E'
                        onClick={onType}
                        focusKey='LETTER-E'
                        onEnterPress={() => {
                            onType('E');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-E');
                        }}
                        selected={selectedButton === 'LETTER-E'}
                    />
                    <Letter
                        key='letterF'
                        label='F'
                        onClick={onType}
                        focusKey='LETTER-F'
                        onEnterPress={() => {
                            onType('F');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-F');
                        }}
                        selected={selectedButton === 'LETTER-F'}
                    />

                    <Letter
                        key='letterG'
                        label='G'
                        onClick={onType}
                        focusKey='LETTER-G'
                        onEnterPress={() => {
                            onType('G');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-G');
                        }}
                        selected={selectedButton === 'LETTER-G'}
                    />
                    <Letter
                        key='letterH'
                        label='H'
                        onClick={onType}
                        focusKey='LETTER-H'
                        onEnterPress={() => {
                            onType('H');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-H');
                        }}
                        selected={selectedButton === 'LETTER-H'}
                    />
                    <Letter
                        key='letterI'
                        label='I'
                        onClick={onType}
                        focusKey='LETTER-I'
                        onEnterPress={() => {
                            onType('I');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-I');
                        }}
                        selected={selectedButton === 'LETTER-I'}
                    />
                    <Letter
                        key='letterJ'
                        label='J'
                        onClick={onType}
                        focusKey='LETTER-J'
                        onEnterPress={() => {
                            onType('J');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-J');
                        }}
                        selected={selectedButton === 'LETTER-J'}
                    />
                    <Letter
                        key='letterK'
                        label='K'
                        onClick={onType}
                        focusKey='LETTER-K'
                        onEnterPress={() => {
                            onType('K');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-K');
                        }}
                        selected={selectedButton === 'LETTER-K'}
                    />
                    <Letter
                        key='letterL'
                        label='L'
                        onClick={onType}
                        focusKey='LETTER-L'
                        onEnterPress={() => {
                            onType('L');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-L');
                        }}
                        selected={selectedButton === 'LETTER-L'}
                    />

                    <Letter
                        key='letterM'
                        label='M'
                        onClick={onType}
                        focusKey='LETTER-M'
                        onEnterPress={() => {
                            onType('M');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-M');
                        }}
                        selected={selectedButton === 'LETTER-M'}
                    />
                    <Letter
                        key='letterN'
                        label='N'
                        onClick={onType}
                        focusKey='LETTER-N'
                        onEnterPress={() => {
                            onType('N');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-N');
                        }}
                        selected={selectedButton === 'LETTER-N'}
                    />
                    <Letter
                        key='letterO'
                        label='O'
                        onClick={onType}
                        focusKey='LETTER-O'
                        onEnterPress={() => {
                            onType('O');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-O');
                        }}
                        selected={selectedButton === 'LETTER-O'}
                    />
                    <Letter
                        key='letterP'
                        label='P'
                        onClick={onType}
                        focusKey='LETTER-P'
                        onEnterPress={() => {
                            onType('P');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-P');
                        }}
                        selected={selectedButton === 'LETTER-P'}
                    />
                    <Letter
                        key='letterQ'
                        label='Q'
                        onClick={onType}
                        focusKey='LETTER-Q'
                        onEnterPress={() => {
                            onType('Q');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-Q');
                        }}
                        selected={selectedButton === 'LETTER-Q'}
                    />
                    <Letter
                        key='letterR'
                        label='R'
                        onClick={onType}
                        focusKey='LETTER-R'
                        onEnterPress={() => {
                            onType('R');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-R');
                        }}
                        selected={selectedButton === 'LETTER-R'}
                    />

                    <Letter
                        key='letterS'
                        label='S'
                        onClick={onType}
                        focusKey='LETTER-S'
                        onEnterPress={() => {
                            onType('S');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-S');
                        }}
                        selected={selectedButton === 'LETTER-S'}
                    />
                    <Letter
                        key='letterT'
                        label='T'
                        onClick={onType}
                        focusKey='LETTER-T'
                        onEnterPress={() => {
                            onType('T');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-T');
                        }}
                        selected={selectedButton === 'LETTER-T'}
                    />
                    <Letter
                        key='letterU'
                        label='U'
                        onClick={onType}
                        focusKey='LETTER-U'
                        onEnterPress={() => {
                            onType('U');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-U');
                        }}
                        selected={selectedButton === 'LETTER-U'}
                    />
                    <Letter
                        key='letterV'
                        label='V'
                        onClick={onType}
                        focusKey='LETTER-V'
                        onEnterPress={() => {
                            onType('V');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-V');
                        }}
                        selected={selectedButton === 'LETTER-V'}
                    />
                    <Letter
                        key='letterW'
                        label='W'
                        onClick={onType}
                        focusKey='LETTER-W'
                        onEnterPress={() => {
                            onType('W');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-W');
                        }}
                        selected={selectedButton === 'LETTER-W'}
                    />
                    <Letter
                        key='letterX'
                        label='X'
                        onClick={onType}
                        focusKey='LETTER-X'
                        onEnterPress={() => {
                            onType('X');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-X');
                        }}
                        selected={selectedButton === 'LETTER-X'}
                    />

                    <Letter
                        key='letterY'
                        label='Y'
                        onClick={onType}
                        focusKey='LETTER-Y'
                        onEnterPress={() => {
                            onType('Y');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-Y');
                        }}
                        selected={selectedButton === 'LETTER-Y'}
                    />
                    <Letter
                        key='letterZ'
                        label='Z'
                        onClick={onType}
                        focusKey='LETTER-Z'
                        onEnterPress={() => {
                            onType('Z');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-Z');
                        }}
                        selected={selectedButton === 'LETTER-Z'}
                    />
                    <Letter
                        key='letter1'
                        label='1'
                        onClick={onType}
                        focusKey='LETTER-1'
                        onEnterPress={() => {
                            onType('1');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-1');
                        }}
                        selected={selectedButton === 'LETTER-1'}
                    />
                    <Letter
                        key='letter2'
                        label='2'
                        onClick={onType}
                        focusKey='LETTER-2'
                        onEnterPress={() => {
                            onType('2');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-2');
                        }}
                        selected={selectedButton === 'LETTER-2'}
                    />
                    <Letter
                        key='letter3'
                        label='3'
                        onClick={onType}
                        focusKey='LETTER-3'
                        onEnterPress={() => {
                            onType('3');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-3');
                        }}
                        selected={selectedButton === 'LETTER-3'}
                    />
                    <Letter
                        key='letter4'
                        label='4'
                        onClick={onType}
                        focusKey='LETTER-4'
                        onEnterPress={() => {
                            onType('4');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-4');
                        }}
                        selected={selectedButton === 'LETTER-4'}
                    />

                    <Letter
                        key='letter5'
                        label='5'
                        onClick={onType}
                        focusKey='LETTER-5'
                        onEnterPress={() => {
                            onType('5');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-5');
                        }}
                        selected={selectedButton === 'LETTER-5'}
                    />
                    <Letter
                        key='letter6'
                        label='6'
                        onClick={onType}
                        focusKey='LETTER-6'
                        onEnterPress={() => {
                            onType('6');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-6');
                        }}
                        selected={selectedButton === 'LETTER-6'}
                    />
                    <Letter
                        key='letter7'
                        label='7'
                        onClick={onType}
                        focusKey='LETTER-7'
                        onEnterPress={() => {
                            onType('7');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-7');
                        }}
                        selected={selectedButton === 'LETTER-7'}
                    />
                    <Letter
                        key='letter8'
                        label='8'
                        onClick={onType}
                        focusKey='LETTER-8'
                        onEnterPress={() => {
                            onType('8');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-8');
                        }}
                        selected={selectedButton === 'LETTER-8'}
                    />
                    <Letter
                        key='letter9'
                        label='9'
                        onClick={onType}
                        focusKey='LETTER-9'
                        onEnterPress={() => {
                            onType('9');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-9');
                        }}
                        selected={selectedButton === 'LETTER-9'}
                    />
                    <Letter
                        key='letter0'
                        label='0'
                        onClick={onType}
                        focusKey='LETTER-0'
                        onEnterPress={() => {
                            onType('0');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-0');
                        }}
                        selected={selectedButton === 'LETTER-0'}
                    />

                    <Letter
                        key='letterToggle'
                        label='&!?'
                        onClick={toggleKeys}
                        focusKey='LETTER-TOGGLE'
                        onEnterPress={toggleKeys}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-TOGGLE');
                        }}
                        selected={selectedButton === 'LETTER-TOGGLE'}
                    />
                    <Letter
                        key='letterSpace'
                        label='___________'
                        value=' '
                        onClick={onType}
                        focusKey='LETTER-SPACE'
                        onEnterPress={() => {
                            onType(' ');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-SPACE');
                        }}
                        selected={selectedButton === 'LETTER-SPACE'}
                    />
                    <Letter
                        key='letterDelete'
                        label='<X'
                        onClick={onDelete}
                        focusKey='LETTER-DELETE'
                        onEnterPress={onDelete}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-DELETE');
                        }}
                        selected={selectedButton === 'LETTER-DELETE'}
                    />
                </>
            ) : (
                <>
                    <Letter
                        key='letterColon'
                        label=':'
                        onClick={onType}
                        focusKey='LETTER-COLON'
                        onEnterPress={() => {
                            onType(':');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-COLON');
                        }}
                        selected={selectedButton === 'LETTER-COLON'}
                    />
                    <Letter
                        key='letterQuote'
                        label="'"
                        onClick={onType}
                        focusKey='LETTER-QUOTE'
                        onEnterPress={() => {
                            onType("'");
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-QUOTE');
                        }}
                        selected={selectedButton === 'LETTER-QUOTE'}
                    />
                    <Letter
                        key='letterHyphen'
                        label='-'
                        onClick={onType}
                        focusKey='LETTER-HYPHEN'
                        onEnterPress={() => {
                            onType('-');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-HYPHEN');
                        }}
                        selected={selectedButton === 'LETTER-HYPHEN'}
                    />
                    <Letter
                        key='letterPeriod'
                        label='.'
                        onClick={onType}
                        focusKey='LETTER-PERIOD'
                        onEnterPress={() => {
                            onType('.');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-PERIOD');
                        }}
                        selected={selectedButton === 'LETTER-PERIOD'}
                    />
                    <Letter
                        key='letterLParen'
                        label='('
                        onClick={onType}
                        focusKey='LETTER-LPAREN'
                        onEnterPress={() => {
                            onType('(');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-LPAREN');
                        }}
                        selected={selectedButton === 'LETTER-LPAREN'}
                    />
                    <Letter
                        key='letterRParen'
                        label=')'
                        onClick={onType}
                        focusKey='LETTER-RPAREN'
                        onEnterPress={() => {
                            onType(')');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-RPAREN');
                        }}
                        selected={selectedButton === 'LETTER-RPAREN'}
                    />

                    <Letter
                        key='letterExclamation'
                        label='!'
                        onClick={onType}
                        focusKey='LETTER-EXCLAMATION'
                        onEnterPress={() => {
                            onType('!');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-EXCLAMATION');
                        }}
                        selected={selectedButton === 'LETTER-EXCLAMATION'}
                    />
                    <Letter
                        key='letterAmpersand'
                        label='&'
                        onClick={onType}
                        focusKey='LETTER-AMPERSAND'
                        onEnterPress={() => {
                            onType('&');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-AMPERSAND');
                        }}
                        selected={selectedButton === 'LETTER-AMPERSAND'}
                    />
                    <Letter
                        key='letterComma'
                        label=','
                        onClick={onType}
                        focusKey='LETTER-COMMA'
                        onEnterPress={() => {
                            onType(',');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-COMMA');
                        }}
                        selected={selectedButton === 'LETTER-COMMA'}
                    />
                    <Letter
                        key='letterAsterisk'
                        label='*'
                        onClick={onType}
                        focusKey='LETTER-ASTERISK'
                        onEnterPress={() => {
                            onType('*');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-ASTERISK');
                        }}
                        selected={selectedButton === 'LETTER-ASTERISK'}
                    />
                    <Letter
                        key='letterQuestion'
                        label='?'
                        onClick={onType}
                        focusKey='LETTER-QUESTION'
                        onEnterPress={() => {
                            onType('?');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-QUESTION');
                        }}
                        selected={selectedButton === 'LETTER-QUESTION'}
                    />
                    <Letter
                        key='letterSlash'
                        label='/'
                        onClick={onType}
                        focusKey='LETTER-SLASH'
                        onEnterPress={() => {
                            onType('/');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-SLASH');
                        }}
                        selected={selectedButton === 'LETTER-SLASH'}
                    />

                    <Letter
                        key='letterToggle'
                        label='ABC'
                        onClick={toggleKeys}
                        focusKey='LETTER-TOGGLE'
                        onEnterPress={toggleKeys}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-TOGGLE');
                        }}
                        selected={selectedButton === 'LETTER-TOGGLE'}
                    />
                    <Letter
                        key='letterSpace'
                        label='__________'
                        value=' '
                        onClick={onType}
                        focusKey='LETTER-SPACE'
                        onEnterPress={() => {
                            onType(' ');
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-SPACE');
                        }}
                        selected={selectedButton === 'LETTER-SPACE'}
                    />
                    <Letter
                        key='letterDelete'
                        label='<X'
                        onClick={onDelete}
                        focusKey='LETTER-DELETE'
                        onEnterPress={onDelete}
                        onBecameFocused={() => {
                            setSelectedButton('LETTER-DELETE');
                        }}
                        selected={selectedButton === 'LETTER-DELETE'}
                    />
                </>
            )}
        </Container>
    );
}

Keyboard.propTypes = propTypes;
export default withFocusable({
    trackChildren: true,
})(Keyboard);
