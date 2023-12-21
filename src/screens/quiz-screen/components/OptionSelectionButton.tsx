import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import constants from "../../../constants/Constants";

interface Props {
    optionName: string;
    optionValue: string;
    index: number;
    selectedOption: any;
    pressedOption: string;
}

const OptionSelectionButton: React.FC<Props> = (props) => {
    return (
        <TouchableOpacity
            style={[
                styles.optionContainer,
                { backgroundColor: props.optionName === props.pressedOption ? constants.color.blue : constants.color.lightGray }
            ]}
            onPress={() => { props.selectedOption(props.optionName) }}>
            <View style={[
                styles.optionCircle,
                { backgroundColor: props.optionName === props.pressedOption ? constants.color.blue : constants.color.lightGray }
            ]}>
                <Text style={styles.optionLabel}>{props.optionName}</Text>
            </View>
            <Text style={styles.optionText}>{props.optionValue}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    questionText: {
        marginTop: '10%',
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    optionContainer: {
        flexDirection: 'row',
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
export default OptionSelectionButton;