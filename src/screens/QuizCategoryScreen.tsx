import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import constants from "../constants/Constants";
import { useNavigation } from '@react-navigation/native';

const QuizCategoryScreen = ({navigation}: any) => {
    const logoRef = React.createRef<any>();
    const mathButtonRef = React.createRef<any>();
    const scienceButtonRef = React.createRef<any>();
    useEffect(() => {
        logoRef.current.slideInDown(2000);
        mathButtonRef.current.slideInUp(1800).then(() => {
            mathButtonRef.current.pulse(1800);
        });
        scienceButtonRef.current.slideInUp(2000).then(() => {
            scienceButtonRef.current.pulse(1800);
        });
    }, []);

    return (
        <View style={styles.mainContainer}>
            <Animatable.View ref={logoRef} style={styles.logoContainer}>
                <constants.svg.QuizLogo height={150} width={150} style={styles.logo} />
            </Animatable.View>

            <View style={styles.buttonContainer}>
                <Animatable.View ref={mathButtonRef} style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('QuizScreen', {subject: 'Maths' }) }}>
                        <Text style={styles.text}>Maths</Text>
                    </TouchableOpacity>
                </Animatable.View>


                <Animatable.View ref={scienceButtonRef} style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('QuizScreen',{subject:'Science'})}}>
                        <Text style={styles.text}>Science</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: constants.color.background,
        flex: 1,
    },
    logoContainer: {
        marginTop: '10%',
        alignSelf: 'center',
    },
    logo: {
        height: 150,
        width: 150,
    },
    buttonContainer: {
        justifyContent: 'center',
        flex: 1
    },
    buttonWrapper: {
        marginBottom: '15%',
    },
    button: {
        height: 80,
        width: 200,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.color.blue,
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600'
    }
});

export default QuizCategoryScreen;
