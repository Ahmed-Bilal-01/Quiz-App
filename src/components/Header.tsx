import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import constants from "../constants/Constants";
import { useNavigation, NavigationProp } from '@react-navigation/native';


interface HeaderProps {
    label: string;
    timeFinished: any;
};

const Header: React.FC<HeaderProps> = (props) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [timeRemaining, setTimeRemaining] = useState(300);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    props.timeFinished(true)
                    clearInterval(countdownInterval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('QuizCategoryScreen')}>
                <constants.svg.BackArrow height={24} width={24} />
            </TouchableOpacity>
            <Text style={styles.heading}>{props.label} Quiz</Text>
            <TouchableOpacity style={styles.timeContainer}>
                <constants.svg.CountDown height={20} width={20} />
                <Text style={styles.timeText}> {formatTime(timeRemaining)}</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    mainContainer: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
    },
    backButton: {
        backgroundColor: 'white',
        height: 36,
        borderRadius: 16,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600'
    },
    timeContainer: {
        backgroundColor: 'white',
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        borderRadius: 15
    },
    timeText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'red'
    }
})
export default Header;