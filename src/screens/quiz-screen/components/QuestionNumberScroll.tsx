import React, {useRef} from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import constants from "../../../constants/Constants";

interface Props {
    label: number;
    activeIndex: number;
    index: number;
}

const QuestionNumberScroll: React.FC<Props> = (props) => {
    return (
        <View style={styles.numberAndLineContainer}>
            <View
                style={[
                    styles.numberCircle,
                    { backgroundColor: props.index === props.activeIndex ? constants.color.blue : constants.color.lightGray }
                ]}>
                <Text style={styles.numberText}>{props.label}</Text>
            </View>
            <View style={[
                styles.bottomLine,
                { backgroundColor: props.index === props.activeIndex ? constants.color.blue : constants.color.lightGray }
            ]} />
        </View>
    )
};
const styles = StyleSheet.create({
    numberAndLineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    numberCircle: {
        height: 35,
        width: 35,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    bottomLine: {
        height: 3,
        width: 50,
        backgroundColor: constants.color.lightGray,
        marginTop: 12
    },
})
export default QuestionNumberScroll;