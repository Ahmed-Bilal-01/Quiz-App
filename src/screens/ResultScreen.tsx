import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import constants from "../constants/Constants";
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Share from 'react-native-share';
import ViewShot from "react-native-view-shot";

const ResultScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const viewShotRef = useRef<any>();
    const { selectedOptions, correctAnswers, timeTaken } = route.params;
    console.log(timeTaken)
    const calculatePoints = (selectedOptions : string, correctAnswers: string) => {
        let points = 0;
        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i] === correctAnswers[i]) {
                points += 1;
            }
        }
        return points;
    };
    const totalPoints = calculatePoints(selectedOptions, correctAnswers);

    return (
        <View style={styles.mainContainer}>
            <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }} style={styles.pointsCard}>
                <View style={styles.pointsCard}> 
                    {totalPoints >= 5 &&
                        <LottieView
                            source={require('../assets/animations/CelebrationAnimation.json')}
                            autoPlay={true}
                            loop={true}
                            style={{ width: 250, height: 200 }}
                        />}
                    {totalPoints < 5 &&
                        <LottieView
                            source={require('../assets/animations/LostAnimation.json')}
                            autoPlay={true}
                            loop={true}
                            style={{ width: 200, height: 200 }}
                        />}
                    <View style={styles.dottedLine} />
                    {totalPoints >= 5 ?
                        <Text style={styles.congratsText}>Congrats !</Text>
                        :
                        <Text style={styles.failText}>Better Luck Next Time !</Text>}
                    <View style={styles.numberContainer}>
                        <Text style={styles.numberText}>{totalPoints}/10</Text>
                    </View>
                </View>
            </ViewShot>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuizCategoryScreen')}>
                    <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        try {
                            const uri = await viewShotRef.current.capture();
                            const shareOptions = {
                                title: "Share via",
                                message: "Check out my quiz result!",
                                url: uri,
                            };
                            await Share.open(shareOptions);
                        } catch (error) {
                            console.error("Error capturing or sharing:", error);
                        }
                    }}
                >                    
                <Text style={styles.buttonText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: constants.color.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pointsCard: {
        backgroundColor: 'white',
        height: 400,
        width: '85%',
        borderRadius: 30,
        alignItems: 'center'
    },
    congratsText: {
        color: constants.color.blue,
        fontWeight: '600',
        fontSize: 22,
        marginTop: 20
    },
    dottedLine: {
        borderWidth: 3,
        borderColor: constants.color.background,
        width: '100%',
        borderStyle: 'dotted'
    },
    numberContainer: {
        backgroundColor: constants.color.background,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 100,
        marginTop: 20,
        borderRadius: 20
    },
    numberText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 28,
    },
    failText: {
        color: 'red',
        fontWeight: '600',
        fontSize: 22,
        marginTop: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: 40
    },
    button: {
        width: 120,
        backgroundColor: constants.color.blue,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    }

});

export default ResultScreen;
