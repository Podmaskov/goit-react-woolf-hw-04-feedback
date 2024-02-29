import React, { useState } from 'react';

import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import styles from './styles.module.css';

const OPTIONS = ['Good', 'Neutral', 'Bad'];

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handelFeedback = value => {
    const SET_VALUE_MAP = {
      Good: setGood,
      Neutral: setNeutral,
      Bad: setBad,
    };

    SET_VALUE_MAP[value](prev => ++prev);
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const total = good + neutral + bad;
    return Math.round((good * 100) / total) || 0;
  };

  return (
    <div className={styles.container}>
      <Section title="Please live feedback">
        <FeedbackOptions options={OPTIONS} onLeaveFeedback={handelFeedback} />
      </Section>

      <Section title="Statistics">
        {!!countTotalFeedback() && (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}

        {!countTotalFeedback() && (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
