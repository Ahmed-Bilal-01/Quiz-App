import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import constants from "../../constants/Constants";
import Header from "../../components/Header";
import QuestionNumberScroll from "./components/QuestionNumberScroll";
import QuestionAndOptions from "./components/QuestionAndOptions";
import { useRoute, RouteProp } from '@react-navigation/native';
import MathsData from "../../constants/MathsData";
import ScienceData from "../../constants/ScienceData";
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    QuizScreen: { subject: string }; 
  };
  interface Question {
    id: number;
    questionNumber: number;
    question: string;
    options: { name: string; value: string }[];
    correctAnswer: string;
}
  
const QuizScreen = ({ navigation }: any) => {
    const route = useRoute<RouteProp<RootStackParamList, 'QuizScreen'>>();
    const [data, setData] = useState<Question[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<Array<string>>([]);
    const [timeFinished, setTimeFinished] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
    const subject = route?.params?.subject;
    const isNextButtonDisabled = !selectedOptions[activeIndex];
    const [timeTaken, setTimeTaken] = useState<Array<number>>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    let intervalId: any;

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: activeIndex * 50,
                animated: true,
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        const startTime = new Date().getTime();
        intervalId = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            setTimeTaken((prevTimeTaken) => {
                const updatedTimeTaken = [...prevTimeTaken];
                updatedTimeTaken[activeIndex] = elapsedTime;
                return updatedTimeTaken;
            });
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [activeIndex, timeFinished]);

    const handleSelectedOption = (option: string) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[activeIndex] = option;
        setSelectedOptions(updatedOptions);
    };
    const handleTime = (option: boolean) => {
        setTimeFinished(option);
    };
    useEffect(() => {
        if (timeFinished) {
            handleSubmit();
        }
    }, [timeFinished]);
    useEffect(() => {
        if (subject === 'Maths') {
            setData(MathsData?.data);
            setCorrectAnswers(MathsData?.correctAnswers)
        } else {
            setData(ScienceData?.data);
            setCorrectAnswers(ScienceData?.correctAnswers)
        }
    }, [subject]);

    const handleNext = () => {
        setActiveIndex(prevIndex => Math.min(prevIndex + 1, data.length - 1));
    };

    const handlePrevious = () => {
        setActiveIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };
    const handleSubmit = () => {
        navigation.navigate('ResultScreen', { selectedOptions, correctAnswers, timeTaken });
    };
    return (
        <View style={styles.mainContainer}>
            <Header label={subject} timeFinished={handleTime} />
            <View style={styles.questionContainer}>
                <View style={styles.questionScrollBox}>
                    <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                        {data && data.map((item, id) => (
                            <QuestionNumberScroll
                                key={id}
                                label={item.questionNumber}
                                activeIndex={activeIndex}
                                index={item.id} />
                        ))}
                    </ScrollView>
                </View>
                <QuestionAndOptions
                    correctAnswer={data[activeIndex]?.correctAnswer}
                    id={data[activeIndex]?.id}
                    options={data[activeIndex]?.options}
                    question={data[activeIndex]?.question}
                    questionNumber={data[activeIndex]?.questionNumber}
                    selectedOption={handleSelectedOption}
                    currentSelectedOption={selectedOptions[activeIndex]}
                />
                <View style={styles.navigationButtonsContainer}>
                    {activeIndex !== 0 ? (
                        <TouchableOpacity style={styles.navigationButton} onPress={handlePrevious}>
                            <Text style={styles.navigationButtonText}>Previous</Text>
                        </TouchableOpacity>
                    ) :
                        <View style={styles.disableNavigationButton}>
                            <Text style={styles.navigationButtonText}>Previous</Text>
                        </View>}

                    {!isNextButtonDisabled && activeIndex !== data.length - 1 ? (
                        <TouchableOpacity style={styles.navigationButton} onPress={handleNext}>
                            <Text style={styles.navigationButtonText}>Next</Text>
                        </TouchableOpacity>
                    ) : (
                        !isNextButtonDisabled && activeIndex === data.length - 1 ? (
                            <TouchableOpacity style={styles.navigationButton} onPress={handleSubmit}>
                                <Text style={styles.navigationButtonText}>Submit</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.disableNavigationButton}>
                                <Text style={styles.navigationButtonText}>Next</Text>
                            </View>
                        )
                    )}
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: constants.color.background,
        flex: 1,
    },
    questionContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        overflow: 'hidden',
    },
    questionScrollBox: {
        height: 70,
        justifyContent: 'center',
        marginTop: 10,
    },
    scrollView: {
        alignItems: 'center',
        paddingHorizontal: '3%',
    },
    navigationButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        marginBottom: 20
    },
    navigationButton: {
        backgroundColor: constants.color.blue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    disableNavigationButton: {
        backgroundColor: constants.color.lightGray,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    navigationButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default QuizScreen;
