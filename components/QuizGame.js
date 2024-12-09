"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import quizData from '../data/quizData';

export default function QuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizComplete, setQuizComplete] = useState(false);
  
    const handleRestart = () => {
      setCurrentQuestion(0);
      setScore(0);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setQuizComplete(false);
    };
  
  const handleAnswer = (answerIndex) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    if (answerIndex === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const getButtonColor = (index) => {
    if (!showAnswer) return 'bg-blue-500 hover:bg-blue-600';
    if (index === quizData[currentQuestion].correctAnswer) {
      return 'bg-green-500';
    }
    if (index === selectedAnswer && index !== quizData[currentQuestion].correctAnswer) {
      return 'bg-red-500';
    }
    return 'bg-blue-500 opacity-50';
  };

  if (quizComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-6">
        <Card className="w-full max-w-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-2xl mb-4">Your Score: {score} out of {quizData.length}</p>
          <p className="text-xl mb-6">
            Percentage: {((score / quizData.length) * 100).toFixed(1)}%
          </p>
          <Button 
            onClick={handleRestart}
            className="mx-auto flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Quiz
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-6">
      <Card className="w-full max-w-3xl p-8">
        <div className="flex justify-between mb-6">
          <span className="text-lg font-semibold">
            Question {currentQuestion + 1}/{quizData.length}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">
              Score: {score}
            </span>
            <Button 
              onClick={handleRestart}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </Button>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-8 min-h-[60px]">
          {quizData[currentQuestion].question}
        </h2>

        <div className="flex flex-col space-y-4">
          {quizData[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showAnswer}
              className={`${getButtonColor(index)} text-white p-6 min-h-[60px] text-left relative flex items-center`}
            >
              <span className="text-lg pr-8 leading-relaxed">{option}</span>
              {showAnswer && index === quizData[currentQuestion].correctAnswer && (
                <CheckCircle className="absolute right-4 text-white" size={24} />
              )}
              {showAnswer && index === selectedAnswer && 
               index !== quizData[currentQuestion].correctAnswer && (
                <XCircle className="absolute right-4 text-white" size={24} />
              )}
            </Button>
          ))}
        </div>

        <div className="mt-6 text-right">
          <p className="text-sm text-gray-500">
            Progress: {((currentQuestion + 1) / quizData.length * 100).toFixed(0)}%
          </p>
        </div>
      </Card>
    </div>
  );
}