import React, { useRef, useState } from 'react';
import '../styles/styles1.css';

const TestSetup = ({ testData, setTestData, goToNextStep }) => {
    const textareaRef = useRef(null);
    const [errors, setErrors] = useState({ title: false, description: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestData({
            ...testData,
            [name]: value
        });
        setErrors({ ...errors, [name]: !value.trim() }); // Проверяем, заполнено ли поле
    };

    const handleTextareaInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Сбрасываем высоту перед расчетом
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем новую высоту
        }
    };

    const validateAndProceed = () => {
        const newErrors = {
            title: !testData.title.trim(),
            description: !testData.description.trim(),
        };
        setErrors(newErrors);

        // Если ошибок нет, переходим к следующему шагу
        if (!newErrors.title && !newErrors.description) {
            goToNextStep();
        }
    };

    return (
        <div className="test-form">
            <h2>Test Setup</h2>
            <div className="input-block">
                <label>Title</label>
                <input
                    className={`inp ${errors.title ? 'error' : ''}`}
                    type="text"
                    name="title"
                    value={testData.title}
                    onChange={handleChange}
                    maxLength="64"
                />
                {errors.title && <span className="error-message">Title is required.</span>}
            </div>
            <div className="input-block">
                <label>Description</label>
                <textarea
                    className={errors.description ? 'error' : ''}
                    name="description"
                    value={testData.description}
                    onChange={handleChange}
                    onInput={handleTextareaInput}
                    ref={textareaRef}
                    maxLength="512"
                />
                {errors.description && <span className="error-message">Description is required.</span>}
            </div>

            <div className="type-switch">
                <button
                    className={testData.type === 'simple' ? 'active' : ''}
                    onClick={() => {
                        setTestData({ ...testData, type: 'simple', useRadio: true });
                    }}
                >
                    Simple
                </button>
                <button
                    className={testData.type === 'multiscale' ? 'active' : ''}
                    onClick={() => {
                        setTestData({ ...testData, type: 'multiscale', useRadio: false });
                    }}
                >
                    Multi-scale
                </button>
            </div>

            {testData.type === 'simple' ? (
                <p>Simple: One scale, answers are correct/incorrect.</p>
            ) : (
                <p>Multi-scale: Create multiple scales, assign them to answers.</p>
            )}

            <button onClick={validateAndProceed}>Next</button>
        </div>
    );
};

export default TestSetup;
