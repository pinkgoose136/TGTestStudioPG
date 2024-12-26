import React, { useState } from 'react';
import QuestionBlock from './QuestionBlock';
import '../styles/styles1.css';
import { FaTrashAlt } from 'react-icons/fa';

const TestCreationForm = ({ goToPreviousStep, testData, setTestData, goToNextStep }) => {
    const type = testData.type;
    const [errors, setErrors] = useState({});

    const handleAddQuestion = () => {
        const newQuestionId = testData.questions.length + 1;

        const newQuestion = {
            id: newQuestionId,
            questionText: '',
            useRadio: testData.type === 'simple',
            answers: [
                {
                    id: `ans:${newQuestionId}.1`,
                    text: '',
                    changes: { change_1: { scaleId: 0, scaleValue: 1 } }
                },
                {
                    id: `ans:${newQuestionId}.2`,
                    text: '',
                    changes: { change_1: { scaleId: 0, scaleValue: testData.type === 'simple' ? 0 : 1 } }
                }
            ]
        };

        setTestData({
            ...testData,
            questions: [...testData.questions, newQuestion]
        });
    };

    const validateFields = () => {
        const newErrors = {};
        testData.questions.forEach((question, qIndex) => {
            if (!question.questionText.trim()) {
                newErrors[`question-${qIndex}`] = true;
            }
            question.answers.forEach((answer, aIndex) => {
                if (!answer.text.trim()) {
                    newErrors[`answer-${qIndex}-${aIndex}`] = true;
                }
            });
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Если ошибок нет, возвращаем true
    };

    const handleNextStep = () => {
        if (validateFields()) {
            goToNextStep();
        }
    };

    return (
        <div className="test-form">
            <h2>Adding Questions</h2>

            {type === 'multiscale' && (
                <div className="scale-creation-block">
                    <h3>Create Scales</h3>
                    {testData.scales.map((scale, index) => (
                        <div key={scale.id} className="scale-input">
                            <input
                                className='scale-color-input'
                                type="color"
                                value={scale.color}
                                onChange={(e) => handleScaleChange(index, 'color', e.target.value)}
                            />
                            <input
                                className='scale-name-input'
                                type="text"
                                maxLength="24"
                                placeholder="Scale Name"
                                value={scale.name}
                                onChange={(e) => handleScaleChange(index, 'name', e.target.value)}
                            />
                            <FaTrashAlt
                                className="trash-icon"
                                onClick={() => handleDeleteScale(index)}
                            />
                        </div>
                    ))}
                    <button className='add-scale-btn' onClick={handleAddScale}>Add Scale</button>
                </div>
            )}

            {testData.questions.map((q, index) => (
                <QuestionBlock
                    key={q.id}
                    question={q}
                    questions={testData.questions}
                    setQuestions={(newQuestions) =>
                        setTestData({ ...testData, questions: newQuestions })
                    }
                    scales={testData.scales}
                    type={testData.type}
                    index={index}
                    errors={errors}
                />
            ))}

            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={goToPreviousStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
        </div>
    );
};

export default TestCreationForm;
