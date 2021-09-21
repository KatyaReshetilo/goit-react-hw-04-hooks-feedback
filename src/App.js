import React, { useState, useEffect } from 'react';
import Feedback from './components/feedback/feedback';
import Statistics from './components/statistics/statistics';
import Section from './components/section/section';
import Notification from './components/notification/notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countPositiveFeedbackPercentage = () =>
    Math.round((good * 100) / totalFeedback);

  const clickOnButton = e => {
    switch (e.target.id) {
      case 'good':
        setGood(s => s + 1);
        break;
      case 'neutral':
        setNeutral(s => s + 1);
        break;
      case 'bad':
        setBad(s => s + 1);
        break;
      default:
        return;
    }
  };
  const countTotal = () => good + neutral + bad;
  const ucFirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const totalFeedback = countTotal();
  const percentage = countPositiveFeedbackPercentage();
  return (
    <>
      <Section title="Please leave feedback">
        <Feedback
          options={{ good, neutral, bad }}
          onLeaveFeedback={clickOnButton}
          ucFirst={ucFirst}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={percentage > 0 ? percentage : '0'}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
}
