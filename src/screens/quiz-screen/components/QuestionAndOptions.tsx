import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import constants from "../../../constants/Constants";
import OptionSelectionButton from "./OptionSelectionButton";

interface Props {
    question: string;
    correctAnswer: string;
    id: number;
    options: Array<any>;
    questionNumber: number;
    selectedOption: any;
    currentSelectedOption: string;
}

const QuestionAndOptions: React.FC<Props> = (props) => {
    return (
        <View style={styles.questionTextContainer}>
            <Text style={styles.questionText}>{props?.question}</Text>
            {props.options && props?.options.map((data, index) => (
                <OptionSelectionButton
                    key={index}
                    optionName={data.name}
                    optionValue={data.value}
                    selectedOption={props.selectedOption}
                    index={index}
                    pressedOption={props.currentSelectedOption}
                />
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    questionTextContainer: {
        flex: 1,
        paddingHorizontal: '3%'
    },
    questionText: {
        marginTop: '7%',
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    optionContainer: {
        flexDirection: 'row',
        backgroundColor: constants.color.lightGray,
        alignItems: 'center',
        paddingRight: 20,
        height: 38,
        borderRadius: 18,
        marginTop: 30
    },
    optionCircle: {
        height: 42,
        width: 42,
        borderRadius: 21,
        backgroundColor: constants.color.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    optionLabel: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600'
    },
    optionText: {
        marginLeft: 10,
        color: 'black',
        fontSize: 16
    }
})
export default QuestionAndOptions;